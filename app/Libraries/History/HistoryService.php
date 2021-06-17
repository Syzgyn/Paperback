<?php

namespace App\Libraries\History;

use App\Libraries\Download\DownloadFailedEvent;
use App\Libraries\Download\DownloadIgnoredEvent;
use Illuminate\Events\Dispatcher;
use App\Libraries\Download\IssueGrabbedEvent;
use App\Libraries\MediaFiles\Events\IssueImportedEvent;
use App\Models\Issue;
use DateTimeInterface;
use Exception;
use Illuminate\Support\Facades\Log;

class HistoryService
{
    public function findDownloadId(IssueImportedEvent $event): ?string
    {
        Log::debug(sprintf("Trying to find downloadId for %s from history", $event->issueFile->path));

        $issueIds = array_map(fn(Issue $i) => $i->cvid, $event->localIssue->issues);
        $allHistory = IssueHistory::findDownloadHistory($event->localIssue->comic->cvid);

        $issueHistory = $allHistory->whereIn('issue_id', $issueIds);

        $processedDownloadId = $issueHistory
            ->where('event_type', '!=', IssueHistoryEventType::GRABBED)
            ->whereNotNull('download_id')
            ->get('download_id');

        $stillDownloading = $issueHistory
            ->where('event_type', IssueHistoryEventType::GRABBED)
            ->whereNotIn('download_id', $processedDownloadId);

        $downloadId = null;

        if (!empty($stillDownloading)) {
            /** @var array<IssueHistory[]> */
            $matchingIssues = array_map(fn(Issue $i) => array_filter($stillDownloading->all(), fn(IssueHistory $h) => $h->issue_id == $i->cvid),
                $event->localIssue->issues);
            
            foreach ($matchingIssues as $matchingHistory) {
                if (count($matchingHistory) != 1) {
                    return null;
                }

                $newDownloadId = array_shift($matchingHistory)->download_id;

                if ($newDownloadId == null || $newDownloadId == $downloadId) {
                    $downloadId = $newDownloadId;
                } else {
                    return null;
                }
            }
        }

        return $downloadId;
    }

    public function handleIssueGrabbedEvent(IssueGrabbedEvent $event): void
    {
        if ($event->issue->release == null) {
            throw new Exception("Attempting to handle download with no release");
        }

        foreach ($event->issue->issues as $issue) {
            $history = new IssueHistory([
                'event_type' => IssueHistoryEventType::GRABBED,
                'date' => now(),
                'source_title' => $event->issue->release->title,
                'comic_id' => $issue->comic_id,
                'issue_id' => $issue->cvid,
                'download_id' => $event->downloadId,
            ]);

            $history->data = [
                'Indexer' => $event->issue->release->indexer,
                'NzbInfoUrl' => $event->issue->release->infoUrl,
                'Age' => (string) $event->issue->release->getAge(),
                'AgeHours' => (string) $event->issue->release->getAgeHours(),
                'AgeMinutes' => (string) $event->issue->release->getAgeMinutes(),
                'PublishedDate' => $event->issue->release->publishDate?->format(DateTimeInterface::ATOM),
                'DownloadClient' => $event->downloadClient,
                'DownloadClientName' => $event->downloadClientName,
                'Size' => (string) $event->issue->release->size,
                'DownloadUrl' => $event->issue->release->downloadUrl,
                'Guid' => $event->issue->release->guid,
            ];
            
            $history->save();
        }
    }

    public function handleDownloadFailedEvent(DownloadFailedEvent $event): void
    {
        /** @var int $issueId */
        foreach ($event->issueIds as $issueId) {
            IssueHistory::create([
                'event_type' => IssueHistoryEventType::DOWNLOAD_FAILED,
                'date' => date(DATE_ATOM),
                'source_title' => $event->sourceTitle,
                'comic_id' => $event->comicId,
                'issue_id' => $issueId,
                'download_id' => $event->downloadId,
                'data' => [
                    'DownloadClient' => $event->downloadClient,
                    'DownloadClientName' => $event->trackedDownload?->downloadItem?->downloadClientInfo?->name,
                    'Message' => $event->message,
                ]
            ]);
        }
    }

    public function handleDownloadIgnoredEvent(DownloadIgnoredEvent $event): void
    {
        /** @var int $issueId */
        foreach ($event->issueIds as $issueId) {
            IssueHistory::create([
                'event_type' => IssueHistoryEventType::DOWNLOAD_IGNORED,
                'date' => date(DATE_ATOM),
                'source_title' => $event->sourceTitle,
                'comic_id' => $event->comicId,
                'issue_id' => $issueId,
                'download_id' => $event->downloadId,
                'data' => [
                    'DownloadClient' => $event->downloadClientInfo?->type,
                    'DownloadClientName' => $event->downloadClientInfo?->name,
                    'Message' => $event->message,
                ]
            ]);
        }
    }

    public function handleIssueImportedEvent(IssueImportedEvent $event): void
    {
        if (!$event->newDownload) {
            return;
        }

        $downloadId = $event->downloadId;

        if (empty($downloadId)) {
            $downloadId = $this->findDownloadId($event);
        }

        foreach ($event->localIssue->issues as $issue) {
            $history = new IssueHistory([
                'event_type' => IssueHistoryEventType::DOWNLOAD_FOLDER_IMPORTED,
                'date' => date(DATE_ATOM),
                'source_title' => pathinfo($event->localIssue->path, PATHINFO_FILENAME),
                'comic_id' => $event->issueFile->comic_id,
                'issue_id' => $issue->cvid,
                'download_id' => $downloadId,
                'data' => [
                    'FileId' => $event->issueFile->id,
                    'DroppedPath' => $event->localIssue->path,
                    'ImportedPath' => $event->localIssue->comic->path . DIRECTORY_SEPARATOR . $event->issueFile->relative_path,
                    'DownloadClient' => $event->downloadClientInfo->type,
                    'DownloadClientName' => $event->downloadClientInfo->name,
                ]
            ]);

            $history->save();
        }
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueGrabbedEvent::class,
            [$this::class, 'handleIssueGrabbedEvent']
        );

        $events->listen(
            DownloadFailedEvent::class,
            [$this, 'handleDownloadFailedEvent']
        );

        $events->listen(
            DownloadIgnoredEvent::class,
            [$this, 'handleDownloadIgnoredEvent']
        );

        $events->listen(
            IssueImportedEvent::class,
            [$this, 'handleIssueImportedEvent']
        );
    }
}