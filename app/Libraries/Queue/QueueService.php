<?php

namespace App\Libraries\Queue;

use App\Libraries\Download\DownloadProtocol;
use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Models\Issue;
use Illuminate\Support\Facades\Cache;
use Exception;
use Generator;
use DateTime;
use Illuminate\Events\Dispatcher;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadRefreshedEvent;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadState;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadStatus;
use App\Libraries\EventSource\ModelAction;
use Illuminate\Http\Request;

class QueueService
{
    /** @var Queue[] */
    protected static array $queue;

    public function __construct()
    {
        /** @var Queue[] */
        self::$queue = Cache::get("queue", []);
    }

    public function getQueue(): array
    {
        return self::$queue;
    }

    public function getPagedQueue(Request $request): array
    {
        $page = (int) $request->input("page", 1);
        $pageSize = (int) $request->input("pageSize", 20);
        $sortDirection = (string) $request->input("sortDirection", "ascending");
        $sortKey = (string) $request->input("sortKey", "timeleft");
        $includeUnknownComicItems = (bool) $request->input("includeUnknownComicItems", false);

        $orderByFunc = $this->getOrderByFunc($sortKey);

        // Do this because we don't want to modify the actual queue
        $queue = array_map(fn($q) => clone $q, self::$queue);
        $filteredQueue = $includeUnknownComicItems ? $queue : array_filter($queue, fn(Queue $q) => $q->comic != null);

        // Filter by the orderByFunc, then percentage
        $filter = function(Queue $a, Queue $b) use ($orderByFunc):int {
            if ($orderByFunc($a) == $orderByFunc($b)) {
                $aSize = $a->size == 0 || $a->size == null ? 0 : 100 - ($a->sizeLeft ?? 0) / $a->size * 100;
                $bSize = $b->size == 0 || $b->size == null ? 0 : 100 - ($b->sizeLeft ?? 0) / $b->size * 100;
                return $aSize <=> $bSize;
            }

            return $orderByFunc($a) <=> $orderByFunc($b);
        };

        if ($sortDirection == "ascending") {
            usort($filteredQueue, $filter);
        } else {
            usort($filteredQueue, fn(Queue $a, Queue $b) => $filter($b, $a));   
        }

        $records = array_slice($filteredQueue, ($page - 1) * $pageSize, $pageSize);
        
        return [
            "page" => $page,
            "pageSize" => $pageSize,
            "sortKey" => $sortKey,
            "sortDirection" => $sortDirection,
            "totalRecords" => count($filteredQueue),
            "records" => $records,
        ];
    }

    protected function getOrderByFunc(string $sortKey): callable
    {
        switch ($sortKey) {
            case "status":
                return fn(Queue $q) => $q->status;
            case "comic.title":
                return fn(Queue $q) => $q->comic?->title ?? "";
            case "title":
                return fn(Queue $q) => $q->title;
            case "issue":
                return fn(Queue $q) => $q->issue?->issue_num;
            case "issue.cover_date":
                return fn(Queue $q) => $q->issue?->cover_date;
            case "issue.store_date":
                return fn(Queue $q) => $q->issue?->store_date;
            case "issue.title":
                return fn(Queue $q) => $q->issue?->title ?? "";
            case "progress":
                return fn(Queue $q) => 100 - ($q->sizeLeft ?? 0) / max($q->size ?? 0 * 100, 1);
            case "estimatedCompletionTime":
                return fn(Queue $q) => $q->estimatedCompletionTime;
            case "protocol":
                return fn(Queue $q) => $q->protocol;
            case "indexer":
                return fn(Queue $q) => $q->indexer;
            case "downloadClient":
                return fn(Queue $q) => $q->downloadClient;
            default:
                return fn(Queue $q) => $q->timeLeft;
        }
    }

    public function find(int $id): ?Queue
    {
        foreach (self::$queue as $item) {
            if ($item->id == $id) {
                return $item;
            }
        }

        return null;
    }

    public function remove(int $id): void
    {
        foreach (self::$queue as $key => $item) {
            if ($item->id == $id) {
                unset(self::$queue[$key]);
                Cache::put("queue", self::$queue);
                return;
            }
        }
    }

    protected function mapQueue(TrackedDownload $trackedDownload): Generator
    {
        if ($trackedDownload->remoteIssue?->issues != null && !empty($trackedDownload->remoteIssue->issues)) {
            foreach ($trackedDownload->remoteIssue->issues as $issue) {
                yield $this->mapQueueItem($trackedDownload, $issue);
            }
        } else {
            yield $this->mapQueueItem($trackedDownload);
        }
    }

    protected function mapQueueItem(TrackedDownload $trackedDownload, ?Issue $issue = null): Queue
    {
        if ($trackedDownload->downloadItem == null || $trackedDownload->downloadItem->downloadId == null) {
            throw new Exception("Unable to queue tracked download with missing download info");
        }
        
        $queue = new Queue(
            comicId: $trackedDownload->remoteIssue?->comic?->cvid,
            issueId: $issue?->cvid,
            comic: $trackedDownload->remoteIssue?->comic,
            issue: $issue,
            size: $trackedDownload->downloadItem->totalSize ?? 0,
            title: $trackedDownload->downloadItem->title,
            sizeLeft: $trackedDownload->downloadItem->remainingSize ?? 0,
            timeLeft: $trackedDownload->downloadItem->remainingTime,
            status: TrackedDownloadStatus::toString($trackedDownload->downloadItem->status),
            trackedDownloadStatus: TrackedDownloadStatus::toString($trackedDownload->status),
            trackedDownloadState: TrackedDownloadState::toString($trackedDownload->state),
            statusMessages: $trackedDownload->statusMessages,
            errorMessage: $trackedDownload->downloadItem->message,
            remoteIssue: $trackedDownload->remoteIssue,
            downloadId: $trackedDownload->downloadItem->downloadId,
            protocol: DownloadProtocol::toString($trackedDownload->protocol),
            downloadClient: $trackedDownload->downloadItem->downloadClientInfo?->name,
            indexer: $trackedDownload->indexer,
            outputPath: (string) $trackedDownload->downloadItem->outputPath,
        );

        if ($issue != null) {
            $queue->id = crc32(sprintf("trackedDownload-%s-issue%s", $trackedDownload->downloadItem->downloadId, $issue->cvid));
        } else {
            $queue->id = crc32(sprintf("trackedDownload-%s", $trackedDownload->downloadItem->downloadId));
        }

        if (!empty($trackedDownload->downloadItem->remainingTime)) {
            $queue->estimatedCompletionTime = new DateTime("@" . ((int)(now()->timestamp) + $trackedDownload->downloadItem->remainingTime));
        }

        return $queue;
    }

    public function getQueueStatus(): QueueStatus
    {
        $queue = self::$queue;
        //TODO: Add pending count

        $status = new QueueStatus();
        $status->totalCount = count($queue);
        $status->count = count(array_filter($queue, fn(Queue $q) => $q->comic != null));
        $status->unknownCount = count(array_filter($queue, fn(Queue $q) => $q->comic == null));
        $status->errors = count(array_filter($queue, fn(Queue $q) => $q->comic != null && $q->trackedDownloadStatus == TrackedDownloadStatus::ERROR)) > 0;
        $status->warnings = count(array_filter($queue, fn(Queue $q) => $q->comic != null && $q->trackedDownloadStatus == TrackedDownloadStatus::WARNING)) > 0;
        $status->unknownErrors = count(array_filter($queue, fn(Queue $q) => $q->comic == null && $q->trackedDownloadStatus == TrackedDownloadStatus::ERROR)) > 0;
        $status->unknownWarnings = count(array_filter($queue, fn(Queue $q) => $q->comic == null && $q->trackedDownloadStatus == TrackedDownloadStatus::WARNING)) > 0;

        return $status;
    }

    public function handleTrackedDownloadRefreshedEvent(TrackedDownloadRefreshedEvent $event): void
    {
        usort($event->trackedDownloads, function(TrackedDownload $a, TrackedDownload $b) {
            return $a->downloadItem?->remainingTime > $b->downloadItem?->remainingTime ? 1 : -1;
        });
        
        $queue = [];
        foreach ($event->trackedDownloads as $trackedDownload) {
            $queue += iterator_to_array($this->mapQueue($trackedDownload));
        }

        /** @var Queue[] */
        self::$queue = $queue;
        Cache::put("queue", $queue);

        $this->onQueueUpdate();
    }

    protected function onQueueUpdate(): void
    {
        $eventsource = resolve("EventSourceService");

        $eventsource->broadcast(ModelAction::SYNC, 'queue');
        $eventsource->broadcast(ModelAction::SYNC, 'queue/details');
        $eventsource->broadcast(ModelAction::UPDATED, 'queue/status', $this->getQueueStatus());
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            TrackedDownloadRefreshedEvent::class,
            [$this, 'handleTrackedDownloadRefreshedEvent']
        );
    }
}