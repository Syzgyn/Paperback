<?php

namespace App\Libraries\Download;

use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadState;
use App\Libraries\History\IssueHistory;
use App\Libraries\History\IssueHistoryEventType;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class FailedDownloadService
{
    public function markHistoryAsFailed(int $historyId): void
    {
        $history = IssueHistory::find($historyId);
        $downloadId = $history->download_id;

        if (empty($downloadId)) {
            $this->publishDownloadFailedEvent([$history], "Manually marked as failed");
        } else {
            $this->markDownloadAsFailed($downloadId);
        }
    }

    public function markDownloadAsFailed(string $downloadId): void
    {
        /** @var Collection<IssueHistory> */
        $grabbedHistory = IssueHistory::whereDownloadId($downloadId)->whereEventType(IssueHistoryEventType::GRABBED)->get();

        if ($grabbedHistory->count() > 0) {
            $this->publishDownloadFailedEvent($grabbedHistory->all(), "Manually marked as failed");
        }
    }

    public function check(TrackedDownload $trackedDownload): void
    {
        // Only process tracked downloads that are still downloading
        if ($trackedDownload->state != TrackedDownloadState::DOWNLOADING) {
            return;
        }

        assert($trackedDownload->downloadItem != null);

        if ($trackedDownload->downloadItem->isEncrypted || 
            $trackedDownload->downloadItem->status == DownloadItemStatus::FAILED)
        {
            /** @var Collection<IssueHistory> */
            $grabbedHistory = IssueHistory::whereDownloadId($trackedDownload->downloadItem->downloadId)->whereEventType(IssueHistoryEventType::GRABBED)->get();

            if ($grabbedHistory->count() == 0) {
                $trackedDownload->warn("Download wasn't grabbed by sonarr, skipping");
                return;
            }

            $trackedDownload->state = TrackedDownloadState::FAILED_PENDING;
        }
    }

    public function processFailed(TrackedDownload $trackedDownload): void
    {
        if ($trackedDownload->state != TrackedDownloadState::FAILED_PENDING) {
            return;
        }

        assert($trackedDownload->downloadItem != null);

        /** @var Collection<IssueHistory> */
        $grabbedHistory = IssueHistory::whereDownloadId($trackedDownload->downloadItem->downloadId)->whereEventType(IssueHistoryEventType::GRABBED)->get();

        if ($grabbedHistory->count() == 0) {
            return;
        }

        $failure = "Failed download detected";

        if ($trackedDownload->downloadItem->isEncrypted) {
            $failure = "Encrypted download detected";
        } elseif ($trackedDownload->downloadItem->status == DownloadItemStatus::FAILED && 
            !empty($trackedDownload->downloadItem->message))
        {
            $failure = $trackedDownload->downloadItem->message;
        }

        $trackedDownload->state = TrackedDownloadState::FAILED;
        $this->publishDownloadFailedEvent($grabbedHistory->all(), $failure, $trackedDownload);
    }

    /** @param IssueHistory[] $historyItems */
    protected function publishDownloadFailedEvent(array $historyItems, string $message, TrackedDownload $trackedDownload = null): void
    {
        $historyItem = reset($historyItems);

        if ($historyItem === false) {
            throw new Exception("Missing history item");
        }

        $event = new DownloadFailedEvent(
            $historyItem->comic_id,
            array_map(fn(IssueHistory $i) => $i->issue_id, $historyItems),
            $historyItem->source_title,
            $historyItem->data[IssueHistory::DOWNLOAD_CLIENT] ?? "",
            $historyItem->download_id,
            $message,
            $historyItem->data,
            $trackedDownload
        );

        event($event);
    }
}