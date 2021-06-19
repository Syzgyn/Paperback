<?php

namespace App\Events\Listeners;

use App\Events\DownloadCompletedEvent;
use App\Libraries\Commands\DownloadedIssuesScanCommand;
use App\Libraries\Commands\ManualImportCommand;
use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadState;
use App\Libraries\MediaFiles\IssueImport\ImportApprovedIssues;
use App\Libraries\MediaFiles\IssueImport\ImportDecision;
use App\Libraries\MediaFiles\IssueImport\ImportMode;
use App\Libraries\MediaFiles\IssueImport\ImportResult;
use App\Libraries\MediaFiles\IssueImport\ImportResultType;
use App\Libraries\MediaFiles\IssueImport\Manual\ManualImportFile;
use App\Libraries\MediaFiles\IssueImport\Manual\ManuallyImportedFile;
use App\Libraries\Parser\LocalIssue;
use App\Libraries\Parser\ParsedIssueInfo;
use App\Libraries\Parser\Parser;
use App\Models\Comic;
use App\Models\Issue;
use Exception;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

use function Psy\debug;

class ImportListener
{
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            DownloadedIssuesScanCommand::class,
            [$this, 'handleDownloadedIssuesScanCommand']
        );

        $events->listen(
            ManualImportCommand::class,
            [$this, 'handleManualImportCommand']
        );
    }

    public function handleDownloadedIssuesScanCommand(DownloadedIssuesScanCommand $event): void
    {
        Log::debug("handleDownloadedIssuesScan");
        $importResults = $this->processPath($event);
    Log::debug((string) count($importResults));
        if (empty(array_filter($importResults, fn(ImportResult $i) => $i->result() == ImportResultType::IMPORTED))) {
            Log::debug("Failed to import");
        }
    }

    /** @return ImportResult[] */
    protected function processPath(DownloadedIssuesScanCommand $event): array
    {
        if (empty($event->path)) {
            throw new Exception("A Path must be provided");
        }

        if (empty($event->importMode)) {
            throw new Exception("An import mode must be provided");
        }

        if (!is_dir($event->path) && !is_file($event->path)) {
            Log::warning("Folder/File specified for import scan doesn't exist: " . $event->path);
            return [];
        }

        if (!empty($event->downloadClientId)) {
            $trackedDownload = resolve("TrackedDownloadService")->find($event->downloadClientId);

            if ($trackedDownload != null) {
                Log::debug(sprintf("External directory scan request for known download %s. [%s]", $event->downloadClientId, $event->path));

                $importResults = resolve("DownloadedIssuesImportService")->processPath($event->path, $event->importMode, $trackedDownload->remoteIssue?->comic, $trackedDownload->downloadItem);

                resolve("CompletedDownloadService")->verifyImport($trackedDownload, $importResults);

                return $importResults;
            }

            Log::warning(sprintf("External directory scan request for unknown download %s, attempting normal import. [%s]", $event->downloadClientId, $event->path));
        }

        return resolve("DownloadedIssuesImportService")->processPath($event->path, $event->importMode);
    }

    public function handleManualImportCommand(ManualImportCommand $event): void
    {
        if ($event->importMode == null) {
            throw new Exception("Missing ImportMode");
        }

        Log::debug(sprintf("Manually importing %d files using mode %s", count($event->files), ImportMode::toString($event->importMode) ?? "auto"));

        $diskProviderService = resolve("DiskProviderService");
        $trackedDownloadService = resolve("TrackedDownloadService");
        $aggregationService = resolve("AggregationService");

        $imported = [];
        $importedTrackedDownloads = [];

        for ($i = 0; $i < count($event->files); $i++) {
            Log::debug(sprintf("Processing file %d of %d", $i + 1, count($event->files)));

            $file = $event->files[$i];

            if ($file->path == null) {
                throw new Exception("Manual import file is missing path");
            }

            $comic = Comic::find($file->comicId);
            /** @var Issue[] */
            $issues = Issue::findMany($file->issueIds)->all();
            $fileIssueInfo = Parser::parsePath($file->path) ?? new ParsedIssueInfo();
            $existingFile = $diskProviderService->isParentPath($comic->path, $file->path);
            $trackedDownload = null;

            $localIssue = new LocalIssue();
            $localIssue->existingFile = false;
            $localIssue->issues = $issues;
            $localIssue->fileIssueInfo = $fileIssueInfo;
            $localIssue->path = $file->path;
            $localIssue->comic = $comic;
            $localIssue->size = 0;

            if (!empty($file->downloadId)) {
                $trackedDownload = $trackedDownloadService->find($file->downloadId);
                $localIssue->downloadClientIssueInfo = $trackedDownload?->remoteIssue?->parsedIssueInfo;
            }

            if (!empty($file->folderName)) {
                $localIssue->folderIssueInfo = Parser::parseTitle($file->folderName);
            }

            $localIssue = $aggregationService->augment($localIssue, $trackedDownload?->downloadItem);

            //Apply the user chosen values
            $localIssue->issues = $issues;
            $localIssue->comic = $comic;

            $importDecision = new ImportDecision($localIssue);

            if ($trackedDownload == null) {
                $imported += ImportApprovedIssues::import([$importDecision], !$existingFile, null, $event->importMode);
            } else {
                $importResults = ImportApprovedIssues::import([$importDecision], true, $trackedDownload->downloadItem, $event->importMode);
                $importResult = array_shift($importResults);

                $imported[] = $importResult;

                $importedFile = new ManuallyImportedFile();
                $importedFile->trackedDownload = $trackedDownload;
                $importedFile->importResult = $importResult;

                $importedTrackedDownloads[] = $importedFile;
            }
        }

        Log::debug(sprintf("Manually imported %d files", count($imported)));

        $groupedTrackedDownloads = [];
        foreach ($importedTrackedDownloads as $td) {
            if ($td->trackedDownload != null &&
                $td->trackedDownload->importItem != null &&
                $td->trackedDownload->importItem->downloadId != null
            ) {
                $groupedTrackedDownloads[$td->trackedDownload->importItem->downloadId][] = $td;
            }
        }

        foreach ($groupedTrackedDownloads as $groupedTrackedDownload) {
            $trackedDownload = reset($groupedTrackedDownload)->trackedDownload;
            $importedComic = reset($imported)->importDecision->localIssue->comic;
            $outputPath = $trackedDownload?->importItem?->outputPath?->getPath();

            if ($trackedDownload == null || $importedComic == null) {
                continue;
            }

            if ($outputPath && is_dir($outputPath)) {
                if (resolve("DownloadedIssuesImportService")->shouldDeleteFolder($outputPath, $importedComic) &&
                    $trackedDownload->downloadItem?->canMoveFiles
                ) {
                    resolve("DiskProviderService")->deleteFolder($outputPath);
                }
            }

            $allIssuesImported = array_reduce($groupedTrackedDownload, function(?bool $carry, ManuallyImportedFile $file) use ($trackedDownload) {
                if ($file->importResult?->result() == ImportResultType::IMPORTED) {
                    return $carry && count($file->importResult?->importDecision?->localIssue?->issues ?? []) >= max(1, count($trackedDownload->remoteIssue?->issues ?? []));
                }
            }, true);

            if ($allIssuesImported) {
                $trackedDownload->state = TrackedDownloadState::IMPORTED;
                event(new DownloadCompletedEvent($trackedDownload, $importedComic->cvid));
            }
        }
    }
}