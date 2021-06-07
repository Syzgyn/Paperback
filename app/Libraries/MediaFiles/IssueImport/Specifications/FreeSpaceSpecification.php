<?php

namespace App\Libraries\MediaFiles\IssueImport\Specifications;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\DecisionEngine\Decision;
use App\Libraries\MediaFiles\IssueImport\ImportDecisionSpecificationInterface;
use App\Libraries\Parser\LocalIssue;
use Exception;

class FreeSpaceSpecification implements ImportDecisionSpecificationInterface
{
    public function isSatisfiedBy(LocalIssue $localIssue, ?DownloadClientItem $downloadClientItem): Decision
    {
        if ((bool) resolve("AppSettings")->get("mediamanagement", "skipFreeSpaceCheckWhenImporting")) {
            //TODO: Log
            return Decision::accept();
        }

        try {
            if ($localIssue->existingFile) {
                //TODO: Log
                return Decision::accept();
            }

            $path = $localIssue->comic?->path;

            if (!$path) {
                return Decision::accept();
            }

            $freeSpace = disk_free_space(dirname($path));

            if (!$freeSpace) {
                //TODO: Log
                return Decision::accept();
            }

            if ($freeSpace < ($localIssue->size ?? 0) + ((int) resolve("AppSettings")->get("mediamanagement", "minimumFreeSpaceWhenImporting"))) {
                //TODO: Log
                return Decision::reject("Not enough free space");
            }

        } catch (Exception $e) {
            //TODO: Log
        }

        return Decision::accept();
    }
}