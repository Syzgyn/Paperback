<?php

namespace App\Libraries\Download\History;

use App\Libraries\Download\DownloadFailedEvent;
use App\Libraries\Download\DownloadIgnoredEvent;
use App\Libraries\Download\DownloadProtocol;
use App\Libraries\Download\IssueGrabbedEvent;
use App\Models\DownloadHistory;
use Exception;
use Illuminate\Events\Dispatcher;

class DownloadHistoryService
{
    public function downloadAlreadyImported(string $downloadId): bool
    {
        /** @var DownloadHistory[] */
        $events = DownloadHistory::findByDownloadId($downloadId);

        // Events are ordered by date descending, if a grabbed event comes before an imported event then it was never imported
        // or grabbed again after importing and should be reprocessed.
        foreach ($events as $event) {
            if ($event->event_type == DownloadHistoryEventType::DOWNLOAD_GRABBED) {
                return false;
            }

            if ($event->event_type == DownloadHistoryEventType::DOWNLOAD_IMPORTED) {
                return true;
            }
        }

        return false;
    }

    public function getLatestDownloadHistoryItem(string $downloadId): ?DownloadHistory
    {
        /** @var DownloadHistory[] */
        $events = DownloadHistory::findByDownloadId($downloadId);

        foreach ($events as $event) {
            if (in_array($event->event_type, [
                DownloadHistoryEventType::DOWNLOAD_IGNORED,
                DownloadHistoryEventType::DOWNLOAD_GRABBED,
                DownloadHistoryEventType::DOWNLOAD_IMPORTED,
                DownloadHistoryEventType::DOWNLOAD_FAILED,
            ])) {
                return $event;
            }
        }

        return null;
    }

    public function getLatestGrab(string $downloadId): ?DownloadHistory
    {
        /** @var DownloadHistory|null */
        return DownloadHistory::whereDownloadClientId($downloadId)
            ->where('event_type', DownloadHistoryEventType::DOWNLOAD_GRABBED)
            ->orderByDesc('date')->first();
    }

    public function handleIssueGrabbedEvent(IssueGrabbedEvent $event): void
    {
        if (
            empty($event->downloadId) ||
            empty($event->issue->comic) ||
            empty($event->issue->release) ||
            empty($event->issue->release->downloadProtocol)
        ) {
            return;
        }

        try {
            DownloadHistory::create([
                'event_type' => DownloadHistoryEventType::DOWNLOAD_GRABBED,
                'comic_id' => $event->issue->comic->cvid,
                'download_id' => $event->downloadId,
                'source_title' => $event->issue->release->title,
                'date' => date(DATE_ATOM),
                'protocol' => DownloadProtocol::fromStr($event->issue->release->downloadProtocol),
                'indexer_id' => $event->issue->release->indexerId,
                'download_client_id' => $event->downloadClientId,
                'release' => $event->issue->release,
                'data' => [
                    'indexer' => $event->issue->release->indexer,
                    'downloadClient' => $event->downloadClient,
                    'downloadClientName' => $event->downloadClientName,
                ],
            ]);
        } catch (Exception $e) {
        }
    }

    public function handleDownloadFailedEvent(DownloadFailedEvent $event): void
    {
        if ($event->trackedDownload == null) {
            return;
        }

        DownloadHistory::create([
            'event_type' => DownloadHistoryEventType::DOWNLOAD_FAILED,
            'comic_id' => $event->comicId,
            'download_id' => $event->downloadId,
            'source_title' => $event->sourceTitle,
            'date' => date(DATE_ATOM),
            'protocol' => $event->trackedDownload->protocol,
            'downlod_client_id' => $event->trackedDownload->downloadClient,
            'data' => [
                'downloadClient' => $event->trackedDownload->downloadItem?->downloadClientInfo?->type,
                'downloadClientName' => $event->trackedDownload->downloadItem?->downloadClientInfo?->name,
            ],
        ]);
    }

    public function handleDownloadIgnoredEvent(DownloadIgnoredEvent $event): void
    {
        DownloadHistory::create([
            'event_type' => DownloadHistoryEventType::DOWNLOAD_FAILED,
            'comic_id' => $event->comicId,
            'download_id' => $event->downloadId,
            'source_title' => $event->sourceTitle,
            'date' => date(DATE_ATOM),
            'protocol' => $event->downloadClientInfo?->protocol,
            'downlod_client_id' => $event->downloadClientInfo?->id,
            'data' => [
                'downloadClient' => $event->downloadClientInfo?->type,
                'downloadClientName' => $event->downloadClientInfo?->name,
            ],
        ]);
    }
    
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueGrabbedEvent::class,
            [$this, 'handleIssueGrabbedEvent']
        );

        $events->listen(
            DownloadFailedEvent::class,
            [$this, 'handleDownloadFailedEvent']
        );

        $events->listen(
            DownloadIgnoredEvent::class,
            [$this, 'handleDownloadIgnoredEvent']
        );
    }
}
