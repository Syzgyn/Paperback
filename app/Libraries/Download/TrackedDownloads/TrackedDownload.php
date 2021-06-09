<?php

namespace App\Libraries\Download\TrackedDownloads;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Download\DownloadClientModelBase;
use App\Libraries\Download\DownloadProtocol;
use App\Libraries\History\IssueHistory;
use App\Libraries\History\IssueHistoryEventType;
use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Parser\Parser;
use App\Models\DownloadHistory;
use App\Models\Issue;
use Exception;
use App\Libraries\Download\History\DownloadHistoryEventType;
use Illuminate\Support\Facades\Log;

class TrackedDownload
{
    public ?int $downloadClient = null;
    public ?DownloadClientItem $downloadItem = null;
    public ?DownloadClientItem $importItem = null;
    /** @var TrackedDownloadState::* */
    public ?int $state = null;
    /** @var TrackedDownloadStatus::* */
    public ?int $status = null;
    public ?RemoteIssue $remoteIssue = null;
    /** @var TrackedDownloadStatusMessage[] */
    public array $statusMessages = [];
    /** @var DownloadProtocol::* */
    public ?int $protocol = null;
    public ?string $indexer = null;
    public ?bool $isTrackable = null;

    /** @param string|TrackedDownloadStatusMessage[] $message */
    public function warn(string|array $message): void
    {
        $this->status = TrackedDownloadStatus::WARNING;
        if (is_string($message)) {
            $message = [new TrackedDownloadStatusMessage($this->downloadItem?->title ?? "Unknown Title", $message)];
        }
        $this->statusMessages = $message;
    }

    /** @param IssueHistory[] $historyItems */
    public function isImported(array $historyItems): bool
    {
        Log::debug(sprintf("Checking if all issues for '%s' have been imported", $this->downloadItem->title ?? "Unknown Title"));

        if (empty($historyItems)) {
            Log::debug("No history for " . ($this->downloadItem->title ?? "Unknown Title"));
            return false;
        }

        $importedIssues = array_map(function(Issue $issue) use ($historyItems) {
            /** @var IssueHistory[] */
            $matchingHistoryItems =  array_filter($historyItems, fn(IssueHistory $h) => $h->issue_id == $issue->cvid);
            $lastHistoryItem = reset($matchingHistoryItems);

            if ($lastHistoryItem === false) {
                Log::debug(sprintf("No history for issue %d [%d]", $issue->issue_num, $issue->cvid));
                return false;
            }

            Log::debug(sprintf(
                "Last event for issue %d [%d] is: %s", 
                $issue->issue_num, $issue->cvid, 
                IssueHistoryEventType::toString($lastHistoryItem->event_type)
            ));

            return $lastHistoryItem->event_type == IssueHistoryEventType::DOWNLOAD_FOLDER_IMPORTED;
        }, $this->remoteIssue?->issues ?? []);

        $allDownloaded = count($importedIssues) == count($historyItems);

        Log::debug(sprintf("All issues for %s have been imported: %s", $this->downloadItem->title ?? "Unknown Title", $allDownloaded ? "true" : "false"));

        return $allDownloaded;
    }
}