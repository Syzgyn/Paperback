<?php

namespace App\Libraries\MediaFiles;

use App\Libraries\Parser\LocalIssue;
use App\Models\Issue;
use App\Models\IssueFile;
use Exception;

class UpgradeIssueFileService
{
    public function upgradeIssueFile(IssueFile $issueFile, LocalIssue $localIssue, bool $copyOnly = false): IssueFileMoveResult
    {
        if ($localIssue->comic == null) {
            throw new Exception("Cannot upgrade file for missing comic.");
        }

        $moveFileResult = new IssueFileMoveResult();
        $existingFiles = array_filter(array_unique(array_map(function(Issue $issue): ?IssueFile {
            /** @var IssueFile */
            return $issue->issueFile;
        }, $localIssue->issues)));

        $rootFolder = dirname($localIssue->comic->path);

        if (!empty($existingFiles) && !is_dir($rootFolder)) {
            throw new Exception("Root folder " . $rootFolder . " not found");
        }

        foreach ($existingFiles as $file) {
            $issueFilePath = $localIssue->comic->path . DIRECTORY_SEPARATOR . ($file->relative_path ?? "");
            $subfolder = substr(dirname($issueFilePath), strlen($rootFolder));

            if (is_file($issueFilePath)) {
                //TODO: Log
                //TODO: Recycle delete file
            }

            $moveFileResult->oldFiles[] = $file;
            $file->delete();
        }
        
        if ($copyOnly) {
            $moveFileResult->issueFile = resolve("IssueFileMovingService")->copyIssueFile($issueFile, $localIssue);
        } else {
            $moveFileResult->issueFile = resolve("IssueFileMovingService")->moveIssueFile($issueFile, $localIssue);
        }

        return $moveFileResult;
    }
}