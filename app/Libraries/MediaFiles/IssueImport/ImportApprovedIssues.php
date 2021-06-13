<?php

namespace App\Libraries\MediaFiles\IssueImport;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Parser\LocalIssue;
use App\Models\IssueFile;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class ImportApprovedIssues
{
    /**
     * @param ImportDecision[] $importDecisions
     * 
     * @return ImportResult[]
     */
    public static function import(
        array $importDecisions,
        bool $newDownload,
        ?DownloadClientItem $downloadClientItem = null,
        int $importMode = ImportMode::AUTO,
    ): array
    {
        $qualifiedImports = array_filter($importDecisions, function(ImportDecision $decision) {
            return $decision->isApproved();
        });

        usort($qualifiedImports, fn(ImportDecision $a, ImportDecision $b) => $a->localIssue?->size <=> $b->localIssue?->size);

        $importResults = [];
        $importedIssueIds = [];

        foreach ($qualifiedImports as $importDecision) {
            $localIssue = $importDecision->localIssue;
            /** @var ImportResult[] */
            $oldFiles = [];

            if ($localIssue == null || $localIssue->comic == null || $localIssue->path == null) {
                throw new Exception("Unable to import broken importDecision");
            }

            try {
                $localIds = [];
                foreach ($localIssue->issues as $issue) {
                    $localIds[] = $issue->cvid;
                }
                if (count(array_intersect($importedIssueIds, $localIds))) {
                    $importResults[] = new ImportResult($importDecision, ["Issue has already been imported"]);
                    continue;
                }

                $issueFile = new IssueFile([
                    'comic_id' => $localIssue->comic->cvid,
                    'size' => filesize($localIssue->path),
                    'issue' => reset($localIssue->issues),
                ]);
                $issueFile->path = rtrim($localIssue->path, '/');


                switch ($importMode) {
                    default:
                    case ImportMode::AUTO:
                        $copyOnly = $downloadClientItem != null && !$downloadClientItem->canMoveFiles;
                        break;
                    case ImportMode::MOVE:
                        $copyOnly = false;
                        break;
                    case ImportMode::COPY:
                        $copyOnly = true;
                        break;
                }

                if ($newDownload) {
                    $issueFile->original_file_path = self::getOriginalFilePath($downloadClientItem, $localIssue);

                    $moveResult = resolve("UpgradeIssueFileService")->upgradeIssueFile($issueFile, $localIssue, $copyOnly);
                    $oldFiles = $moveResult->oldFiles;
                } else {
                    $issueFile->relative_path = rtrim(substr($issueFile->path, strlen($localIssue->comic->path)), DIRECTORY_SEPARATOR);
                    /** @var Builder */
                    $query = IssueFile::whereComicId($localIssue->comic->cvid)->whereRelativePath($issueFile->relative_path);
                    $query->delete();
                }

                $issueFile->save();
                $importResults[] = new ImportResult($importDecision);

                //event(new IssueImportedEvent($localIssue, $issueFile, $oldFiles, $newDownload, $downloadClientItem));

            } catch (Exception $e) {
                Log::warning("Couldn't import issue: " . $localIssue, ['exception' => $e]);
                $importResults[] = new ImportResult($importDecision, ["Failed to import issue"]);
            }
        }
        
        foreach ($importDecisions as $decision) {
            if (!$decision->isApproved()) {
                $importResults[] = new ImportResult($decision, array_map(fn($r) => (string) $r, $decision->rejections));
            }
        }

        return $importResults;
    }

    protected static function getOriginalFilePath(?DownloadClientItem $downloadClientItem, LocalIssue $localIssue): string
    {
        $path = $localIssue->path;

        if ($path == null) {
            throw new Exception("Missing local issue path");
        }

        if ($downloadClientItem != null && !empty($downloadClientItem->outputPath)) {
            $outputDirectory = pathinfo((string) $downloadClientItem->outputPath, PATHINFO_DIRNAME);
            if (self::isParentPath($outputDirectory, $path)) {
                return rtrim(substr($path, strlen($outputDirectory)), DIRECTORY_SEPARATOR);
            }
        }

        $folderIssueInfo = $localIssue->folderIssueInfo;

        if ($folderIssueInfo != null) {
            $folderPath = null;
            $parent = dirname($path);

            while ($parent != "/" && $parent != ".") {
                $currentPath = $parent;
                $parent = dirname($parent);

                if (pathinfo($currentPath, PATHINFO_FILENAME) == $folderIssueInfo->releaseTitle) {
                    $folderPath = $currentPath;
                    break;
                }
            }

            if ($folderPath != null) {
                return rtrim(substr($path, strlen(dirname($folderPath))), DIRECTORY_SEPARATOR);
            }
        }

        $parentPath = dirname($path);
        $grandparentPath = dirname($parentPath);

        if ($grandparentPath != "/" && $grandparentPath != ".") {
            return rtrim(substr($path, strlen($grandparentPath)), DIRECTORY_SEPARATOR);
        }

        return pathinfo($path, PATHINFO_FILENAME);
    }

    protected static function isParentPath(string $parentPath, string $childPath): bool
    {
        if ($parentPath != '/' && !str_ends_with($parentPath, ":\\")) {
            $parentPath = rtrim($parentPath, DIRECTORY_SEPARATOR);
        }
        
        if ($childPath != '/' && !str_ends_with($childPath, ":\\")) {
            $childPath = rtrim($childPath, DIRECTORY_SEPARATOR);
        }

        //TODO: Implement for windows
        while (dirname($childPath) != "/" && dirname($childPath) != ".") {
            if (dirname($childPath) == $parentPath) {
                return true;
            }

            $childPath = dirname($childPath);
        }

        return false;
    }
}