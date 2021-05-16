<?php

namespace App\Libraries\Download\History;

use App\Libraries\Download\DownloadProtocol;
use App\Libraries\Download\IssueGrabbedEvent;
use App\Models\DownloadHistory;
use Exception;
use Illuminate\Events\Dispatcher;

class DownloadHistoryService
{
    public function downloadAlreadyImported(string $downloadId): bool
    {
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

    public function getLatestDownloadHistoryItem(string $downloadId): DownloadHistory
    {
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

    public function getLatestGrab(string $downloadId): DownloadHistory
    {
        return DownloadHistory::whereDownloadClientId($downloadId)
            ->where('event_type', DownloadHistoryEventType::DOWNLOAD_GRABBED)
            ->orderByDesc('date')->first();
    }

    public function handleIssueGrabbedEvent(IssueGrabbedEvent $event): void
    {
        if (empty($event->downloadId)) {
            return;
        }

        try {
        $result = DownloadHistory::create([
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
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueGrabbedEvent::class,
            [$this::class, 'handleIssueGrabbedEvent']
        );
    }
}
