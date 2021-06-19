<?php

namespace App\Libraries\MediaFiles\IssueImport\Manual;

use App\Libraries\DecisionEngine\Rejection;
use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Libraries\MediaFiles\IssueImport\ImportDecision;
use App\Libraries\Parser\LocalIssue;
use App\Libraries\Parser\Parser;
use App\Models\Comic;
use App\Models\Issue;
use Exception;
use Illuminate\Support\Facades\Log;

class ManualImportService
{
    /** @return ManualImportItem[] */
    public static function getMediaFiles(string $path, ?string $downloadId, ?int $comicId, bool $filterExistingFiles): array
    {
        if (!empty($downloadId)) {
            /** @var ?TrackedDownload */
            $trackedDownload = resolve("TrackedDownloadService")->find($downloadId);

            if ($trackedDownload == null ||
                $trackedDownload->importItem == null ||
                $trackedDownload->importItem->outputPath == null
            ) {
                return [];
            }

            $path = $trackedDownload->importItem->outputPath->getPath();
        }

        if (!is_dir($path)) {
            if (!is_file($path)) {
                return [];
            }

            $rootFolder = dirname($path);
            return [
                self::processFile($rootFolder, $rootFolder, $path, $downloadId),
            ];
        }

        return self::processFolder($path, $path, $downloadId, $comicId, $filterExistingFiles);
    }

    public static function reprocessItem(string $path, string $downloadId, int $comicId, array $issueIds): ManualImportItem
    {
        $rootFolder = dirname($path);
        $comic = Comic::find($comicId);

        if (!empty($issueIds)) {
            $downloadClientItem = self::getTrackedDownload($downloadId)?->downloadItem;

            $localIssue = new LocalIssue();
            $localIssue->comic = $comic;
            /** @var Issue[] */
            $localIssue->issues = Issue::findMany($issueIds)->all();
            $localIssue->fileIssueInfo = Parser::parsePath($path);
            $localIssue->downloadClientIssueInfo = $downloadClientItem == null ? null : Parser::parseTitle((string) $downloadClientItem->title);
            $localIssue->path = $path;
            $localIssue->existingFile = resolve("DiskProviderService")->isParentPath($comic->path, $path);
            $localIssue->size = filesize($path);

            return self::mapItem(resolve("ImportDecisionMakerService")->getDecision($localIssue, $downloadClientItem), $rootFolder, $downloadId, null);
        }

        return self::processFile($rootFolder, $rootFolder, $path, $downloadId, $comic);
    }

    /** @return ManualImportItem[] */
    protected static function processFolder(string $rootFolder, string $baseFolder, ?string $downloadId, ?int $comicId, bool $filterExistingFiles): array
    {
        $downloadClientItem = null;
        $comic = null;
        $directoryName = pathinfo($baseFolder, PATHINFO_DIRNAME);

        if (!empty($comicId)) {
            $comic = Comic::find($comicId);
        } else {
            try {
                $comic = resolve("ParserService")->getComicFromTitle($directoryName);
            } catch (Exception $e) {
                Log::warning("Unable to find comic from title");
            }
        }

        if (!empty($downloadId)) {
            /** @var TrackedDownload */
            $trackedDownload = resolve("TrackedDownloadService")->find($downloadId);
            $downloadClientItem = $trackedDownload->downloadItem;

            if ($comic == null) {
                $comic = $trackedDownload->remoteIssue?->comic;
            }
        }

        $diskScanService = resolve("DiskScanService");
        $diskProviderService = resolve("DiskProviderService");

        if ($comic == null) {
            $files = $diskScanService->filterPaths($rootFolder, $diskScanService->getIssueFiles($baseFolder, false));

            if (count($files) > 100) {
                return self::processDownloadDirectory($rootFolder, $files);
            }

            $subfolders = $diskScanService->filterPaths($rootFolder, $diskProviderService->getDirectories($baseFolder));

            $processedFiles = array_map(fn($file) => self::processFile($rootFolder, $baseFolder, $file, $downloadId), $files);
            $processedFolders = array_map(fn($subfolder) => self::processFolder($rootFolder, $subfolder, $downloadId, null, $filterExistingFiles), $subfolders);
            $processedFolders = array_merge(...$processedFolders);

            return array_filter(array_values($processedFolders) + array_values($processedFiles));
        }

        $folderInfo = Parser::parseTitle($directoryName);
        $comicFiles = $diskScanService->filterPaths($rootFolder, $diskScanService->getIssueFiles($baseFolder));
        $decisions = resolve("ImportDecisionMakerService")->getImportDecisions($comicFiles, $comic, $downloadClientItem, $folderInfo, self::isSceneSource($comic, $baseFolder));

        return array_map(fn($decision) => self::mapItem($decision, $rootFolder, $downloadId, $directoryName), $decisions);
    }

    protected static function processFile(string $rootFolder, string $baseFolder, string $file, ?string $downloadId, Comic $comic = null): ManualImportItem
    {
        try {
            $trackedDownload = self::getTrackedDownload($downloadId);
            $relativeFile = trim(substr($file, strlen($baseFolder)), DIRECTORY_SEPARATOR);

            if ($comic == null) {
                $comic = resolve("ParserService")->getComicFromTitle(preg_split('@[\///]@', $relativeFile)[0]);
            }

            if ($comic == null) {
                $comic = resolve("ParserService")->getComicFromTitle($relativeFile);
            }

            if ($trackedDownload != null && $comic == null) {
                $comic = $trackedDownload->remoteIssue?->comic;
            }

            if ($comic == null) {
                $relativeParseInfo = Parser::parsePath($relativeFile);

                if ($relativeParseInfo != null) {
                    $comic = Comic::findByTitle($relativeParseInfo->comicTitle);
                }
            }

            if ($comic == null) {
                $localIssue = new LocalIssue();
                $localIssue->path = $file;
                $localIssue->size = filesize($file);

                return self::mapItem(new ImportDecision($localIssue, [new Rejection("Unknown Comic")]), $rootFolder, $downloadId, null);
            }

            $importDecisions = resolve("ImportDecisionMakerService")->getImportDecisions(
                [$file], 
                $comic,
                $trackedDownload?->downloadItem, 
                null, 
                self::isSceneSource($comic, $baseFolder)
            );

            if (!empty($importDecisions)) {
                return self::mapItem(array_shift($importDecisions), $rootFolder, $downloadId, null);
            }
        } catch (Exception $e) {
            Log::warning("Failed to process file: " . $file);
        }

        $manualImportItem = new ManualImportItem();
        $manualImportItem->downloadId = $downloadId;
        $manualImportItem->path = $file;
        $manualImportItem->id = crc32($manualImportItem->path);
        $manualImportItem->relativePath = trim(substr($file, strlen($rootFolder)), DIRECTORY_SEPARATOR);
        $manualImportItem->name = pathinfo($file, PATHINFO_FILENAME);

        return $manualImportItem;
    }

    protected static function isSceneSource(Comic $comic, string $folder): bool
    {
        return !($comic->path == $folder || resolve("DiskProviderService")->isParentPath($comic->path, $folder));
    }

    /** 
     * @param string[] $issueFiles
     * 
     * @return ManualImportItem[]
     */
    protected static function processDownloadDirectory(string $rootFolder, array $issueFiles): array
    {
        $items = [];

        foreach ($issueFiles as $file) {
            $localIssue = new LocalIssue();
            $localIssue->path = $file;
            $localIssue->size = filesize($file);

            $items[] = self::mapItem(new ImportDecision($localIssue), $rootFolder, null, null);
        }

        return $items;
    }

    protected static function getTrackedDownload(?string $downloadId): ?TrackedDownload
    {
        if (!empty($downloadId)) {
            return resolve("TrackedDownloadService")->find($downloadId);
        }

        return null;
    }

    protected static function mapItem(ImportDecision $importDecision, string $rootFolder, ?string $downloadId, ?string $folderName): ManualImportItem
    {
        if ($importDecision->localIssue == null) {
            throw new Exception("ImportDecision is missing LocalIssue");
        }

        if ($importDecision->localIssue->path == null) {
            throw new Exception("ImportDecision is missing path");
        }

        $item = new ManualImportItem();
        $item->path = $importDecision->localIssue->path;
        $item->id = crc32($item->path);
        $item->folderName = $folderName;
        $item->relativePath = trim(substr($importDecision->localIssue->path, strlen($rootFolder)), DIRECTORY_SEPARATOR);
        $item->name = pathinfo($importDecision->localIssue->path, PATHINFO_FILENAME);
        $item->downloadId = $downloadId;
        $item->size = filesize($importDecision->localIssue->path);
        $item->rejections = $importDecision->rejections;

        if ($importDecision->localIssue->comic != null) {
            $item->comic = $importDecision->localIssue->comic;
        }

        if (!empty($importDecision->localIssue->issues)) {
            $item->issues = $importDecision->localIssue->issues;
        }

        return $item;
    }
}