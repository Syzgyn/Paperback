<?php

namespace App\Libraries\MediaFiles\IssueImport\Specifications;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\DecisionEngine\Decision;
use App\Libraries\MediaFiles\IssueImport\ImportDecisionSpecificationInterface;
use App\Libraries\Parser\LocalIssue;
use Exception;
use Illuminate\Support\Facades\Log;

class FreeSpaceSpecification implements ImportDecisionSpecificationInterface
{
    public function isSatisfiedBy(LocalIssue $localIssue, ?DownloadClientItem $downloadClientItem): Decision
    {
        if ((bool) resolve("AppSettings")->get("mediamanagement", "skipFreeSpaceCheckWhenImporting")) {
            Log::debug("Skipping free space check while importing");
            return Decision::accept();
        }

        try {
            if ($localIssue->existingFile) {
                Log::debug("Skipping free space check for existing issue");
                return Decision::accept();
            }

            $path = $localIssue->comic?->path;

            if (!$path) {
                return Decision::accept();
            }

            $freeSpace = disk_free_space(dirname($path));

            if (!$freeSpace) {
                Log::debug("Free space check returned an invalid result for: " . $path);
                return Decision::accept();
            }

            if ($freeSpace < ($localIssue->size ?? 0) + ((int) resolve("AppSettings")->get("mediamanagement", "minimumFreeSpaceWhenImporting"))) {
                Log::warning(sprintf("Not enough free space (%d) to import: %s (%d)", $freeSpace, $localIssue->path ?? "Unknown Path", $localIssue->size ?? 0));
                return Decision::reject("Not enough free space");
            }

        } catch (Exception $e) {
            Log::error("Unable to check free disk space while importing: " . ($localIssue->path ?? "Unknown Path"), ['exception' => $e]);
        }

        return Decision::accept();
    }
}