<?php

namespace App\Libraries\MediaFiles;

use App\Libraries\DecisionEngine\Rejection;
use App\Libraries\Disk\DiskProviderBase;
use App\Libraries\Download\DownloadClientInfo;
use App\Libraries\Download\DownloadClientItem;
use App\Libraries\MediaFiles\IssueImport\ImportApprovedIssues;
use App\Libraries\MediaFiles\IssueImport\ImportDecision;
use App\Libraries\MediaFiles\IssueImport\ImportMode;
use App\Libraries\MediaFiles\IssueImport\ImportResult;
use App\Libraries\MediaFiles\IssueImport\ImportResultType;
use App\Libraries\Parser\LocalIssue;
use App\Libraries\Parser\Parser;
use App\Models\Comic;
use Exception;
use Illuminate\Support\Facades\Log;

class DownloadedIssuesImportService
{
    /**
     * @param ImportMode::* $importMode
     * 
     * @return ImportResult[]
     */
    public function processPath(string $path, int $importMode = ImportMode::AUTO, Comic $comic = null, DownloadClientItem $downloadClientItem = null): array
    {
        Log::debug("Processing path: " . $path);

        if (is_dir($path)) {
            return $this->processFolder($path, $importMode, $comic, $downloadClientItem);
        }

        if (file_exists($path)) {
            return $this->processsFile($path, $importMode, $comic, $downloadClientItem);
        }

        Log::error(sprintf("Import failed, path does not exist or is not accessible by Paperback: %s. Ensure the path exists and the user running Paperback has the correct permissions to access this file/folder", $path));
        return [];
    }

    public function shouldDeleteFolder(string $path, Comic $comic): bool
    {
        try {
            $issueFiles = resolve("DiskScanService")->getIssueFiles($path);

            foreach($issueFiles as $issueFile) {
                $filename = pathinfo($issueFile, PATHINFO_BASENAME);
                $issueParsedResult = Parser::parseTitle($filename);

                if ($issueParsedResult == null) {
                    Log::warning("Unable to parse file on import: " . $issueFile);
                    return false;
                }
            }

            return true;
        } catch (Exception $e) {
            Log::debug("Unable to determine whether folder should be removed: " . $path);
            return false;
        }
    }

    protected function getCleanedUpFolderName(string $path): string
    {
        return str_replace(["_UNPACK_", "_FAILED_"], "", $path);
    }

    protected function unknownComicResult(string $message, string $issueFile = null): ImportResult
    {
        $localIssue = null;

        if ($issueFile != null) {
            $localIssue = new LocalIssue();
            $localIssue->path = $issueFile;
        }

        return new ImportResult(new ImportDecision($localIssue, [new Rejection("Unknown Comic")]), [$message]);
    }

    protected function fileIsLockedResult(string $issueFile): ImportResult
    {
        Log::debug(sprintf("[%s] is currently locked by another process, skipping.", $issueFile));
        $localIssue = new LocalIssue();
        $localIssue->path = $issueFile;

        return new ImportResult(new ImportDecision($localIssue, [new Rejection("Locked file, try again later")]), ["Locked file, try again later"]);
    }

    /** @return ImportResult[] */
    protected function processFolder(string $path, int $importMode, ?Comic $comic = null, ?DownloadClientItem $downloadClientItem = null): array
    {
        if (!is_dir($path)) {
            throw new Exception("Unable to process file as folder");
        }

        if ($comic == null) {
            $cleanName = $this->getCleanedUpFolderName(pathinfo($path, PATHINFO_BASENAME));
            $comic = resolve("ParserService")->getComicFromTitle($cleanName);

            if ($comic == null) {
                Log::debug("Unknown Comic: " . $cleanName);

                return [
                    $this->unknownComicResult("Unknown Comic"),
                ];
            }
        }

        if (Comic::wherePath($path)->count()) {
            Log::warning("Unable to process folder that is mapped to a current comic");
            return [];
        }

        $folderInfo = Parser::parseTitle(pathinfo($path, PATHINFO_BASENAME));
        $diskScanService = resolve("DiskScanService");
        $diskProviderService = resolve("DiskProviderService");

        $issueFiles = $diskScanService->filterPaths($path, $diskScanService->getIssueFiles($path));

        if ($downloadClientItem == null) {
            foreach ($issueFiles as $issueFile) {
                if ($diskProviderService->isFileLocked($issueFile)) {
                    return [
                        $this->fileIsLockedResult($issueFile),
                    ];
                }
            }
        }

        $decisions = resolve("ImportDecisionMakerService")->getImportDecisions($issueFiles, $comic, $downloadClientItem, $folderInfo, true);
        $importResults = ImportApprovedIssues::import($decisions, true, $downloadClientItem, $importMode);

        if ($importMode == ImportMode::AUTO) {
            $importMode = ($downloadClientItem == null || $downloadClientItem->canMoveFiles) ? ImportMode::MOVE : ImportMode::COPY;
        }

        if ($importMode == ImportMode::MOVE &&
            count(array_filter($importResults, fn(ImportResult $i) => $i->result() == ImportResultType::IMPORTED)) &&
            $this->shouldDeleteFolder($path, $comic)
        )
        {
            Log::debug("Deleting folder after importing valid files");
            resolve("DiskProviderService")->deleteFolder($path);
        }

        return $importResults;
    }

    /** @return ImportResult[] */
    protected function processsFile(string $path, int $importMode, ?Comic $comic = null, ?DownloadClientItem $downloadClientItem = null): array
    {
        if ($comic == null) {
            $comic = resolve("ParserService")->getComicFromTitle(pathinfo($path, PATHINFO_BASENAME));

            if ($comic == null) {
                Log::debug("Unknown comic for file: " . $path);
                return [
                    $this->unknownComicResult("Unknown comic for file: " . $path, $path),
                ];
            }
        }

        if (str_starts_with(pathinfo($path, PATHINFO_BASENAME), "._")) {
            Log::debug(sprintf("[%s] starts with '._', skipping", $path));

            $reason = "Invalid file, filename starts with '._'";
            $localIssue = new LocalIssue();
            $localIssue->path = $path;

            return [
                new ImportResult(new ImportDecision($localIssue, [new Rejection($reason)]), [$reason]),
            ];
        }

        if ($downloadClientItem == null) {
            if (resolve("DiskProviderService")->isFileLocked($path)) {
                return [
                    $this->fileIsLockedResult($path),
                ];
            }
        }

        $decisions = resolve("ImportDecisionMakerService")->getImportDecisions([$path], $comic, $downloadClientItem, null, true);
        return ImportApprovedIssues::import($decisions, true, $downloadClientItem, $importMode);
    }
}