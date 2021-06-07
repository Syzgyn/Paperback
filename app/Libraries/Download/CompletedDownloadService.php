<?php

namespace App\Libraries\Download;

use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadState;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadStatusMessage;
use App\Libraries\History\IssueHistory;
use App\Libraries\MediaFiles\IssueImport\ImportMode;
use App\Libraries\MediaFiles\IssueImport\ImportResult;
use App\Libraries\MediaFiles\IssueImport\ImportResultType;
use App\Models\Comic;
use App\Models\DownloadClient;
use Exception;

class CompletedDownloadService
{
    public function check(TrackedDownload $trackedDownload): void
    {
        if ($trackedDownload->downloadItem?->status != DownloadItemStatus::COMPLETED) {
            return;
        }

        $this->setImportItem($trackedDownload);

        if ($trackedDownload->state != TrackedDownloadState::DOWNLOADING) {
            return;
        }

        if ($trackedDownload->downloadItem == null || $trackedDownload->downloadItem->downloadId == null) {
            return;
        }

        $historyItem = IssueHistory::mostRecentForDownloadId($trackedDownload->downloadItem->downloadId);

        if ($historyItem == null && empty($trackedDownload->downloadItem->category)) {
            //TODO: Log
            return;
        }

        if (!$this->validatePath($trackedDownload)) {
            return;
        }

        if ($trackedDownload->downloadItem->title == null) {
            return;
        }

        $comic = resolve("ParserService")->getComicFromTitle($trackedDownload->downloadItem->title);

        if ($comic == null) {
            if ($historyItem != null) {
                $comic = Comic::find($historyItem->comic_id);
            }

            if ($comic == null) {
                //TODO: Log
                return;
            }
        }

        $trackedDownload->state = TrackedDownloadState::IMPORT_PENDING;
    }

    public function import(TrackedDownload $trackedDownload): void
    {
        $this->setImportItem($trackedDownload);

        if (!$this->validatePath($trackedDownload)) {
            return;
        }

        $trackedDownload->state = TrackedDownloadState::IMPORTING;
        $outputPath = $trackedDownload->importItem?->outputPath?->getPath();

        if (!$outputPath) {
            throw new Exception("Import is missing path");
        }

        if ($trackedDownload->remoteIssue == null || $trackedDownload->remoteIssue->comic == null) {
            return;
        }

        /** @var ImportResult[] */
        $importResults = resolve("DownloadedIssuesImportService")
            ->processPath($outputPath, ImportMode::AUTO, $trackedDownload->remoteIssue->comic, $trackedDownload->downloadItem);
        
        if ($this->verifyImport($trackedDownload, $importResults)) {
            return;
        }

        $trackedDownload->state = TrackedDownloadState::IMPORT_PENDING;

        if (empty($importResults)) {
            $trackedDownload->warn("No files are available for import in " . $outputPath);
            return;
        }

        $statusMessages = [
            new TrackedDownloadStatusMessage("One or more episodes expected in this release were not imported or missing", [])
        ];

        foreach ($importResults as $importResult) {
            if ($importResult->result() != ImportResultType::IMPORTED) {
                $filename = pathinfo($importResult->importDecision->localIssue->path ?? "", PATHINFO_BASENAME);
                $statusMessages[] = new TrackedDownloadStatusMessage($filename, $importResult->errors);
            }
        }

        $trackedDownload->warn($statusMessages);
    }

    /** @param ImportResult[] $importResults */
    public function verifyImport(TrackedDownload $trackedDownload, array $importResults): bool
    {
        $importedCount = 0;
        foreach($importResults as $importResult) {
            if ($importResult->result() == ImportResultType::IMPORTED) {
                $importedCount += count($importResult->importDecision->localIssue->issues);
            }
        }

        $allIssuesImported = $importedCount >= max(1, count($trackedDownload->remoteIssue?->issues ?? []));

        if ($allIssuesImported) {
            //TODO: Log
            $trackedDownload->state = TrackedDownloadState::IMPORTED;
            //TODO: event(new DownloadCompletedEvent($trackedDownload, $trackedDownload->remoteIssue->comic->cvid));
            return true;
        }

        if ($trackedDownload->downloadItem == null) {
            return false;
        }

        $historyItems = IssueHistory::whereDownloadId($trackedDownload->downloadItem->downloadId)->orderByDesc("date")->get();

        if ($trackedDownload->isImported($historyItems->all())) {
            if ($importedCount > 0) {
                //TODO: Log all issues imported
            } else {
                //TODO: Log no issues imported
            }

            $trackedDownload->state = TrackedDownloadState::IMPORTED;
            //TODO: event(new DownloadCompletedEvent($trackedDownload, $trackedDownload->remoteIssue->comic->cvid));
            return true;
        }

        //TODO: log
        return false;
    }

    protected function setImportItem(TrackedDownload $trackedDownload): void
    {
        if ($trackedDownload->downloadItem == null ||
            $trackedDownload->downloadItem->downloadClientInfo == null ||
            $trackedDownload->downloadItem->downloadClientInfo->id == null
        )
        {
            throw new Exception("Missing downloadClientInfo");
        }

        $downloadClient = DownloadClient::find($trackedDownload->downloadItem->downloadClientInfo->id);

        if (!$downloadClient) {
            throw new Exception("Missing download client");
        }

        $trackedDownload->importItem = $downloadClient->getImportItem($trackedDownload->downloadItem, $trackedDownload->importItem);
    }

    protected function validatePath(TrackedDownload $trackedDownload): bool
    {
        $outputPath = $trackedDownload->importItem?->outputPath;

        if (empty($outputPath)) {
            //TODO: Log
            return false;
        }

        if ((PHP_OS_FAMILY == "Windows" && !$outputPath->isWindowsPath()) ||
            (PHP_OS_FAMILY != "Windows" && !$outputPath->isUnixPath())
        )
        {
            //TODO: Log
            return false;
        }

        return true;
    }
}