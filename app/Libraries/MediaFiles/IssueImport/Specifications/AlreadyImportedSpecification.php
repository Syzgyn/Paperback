<?php

namespace App\Libraries\MediaFiles\IssueImport\Specifications;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\DecisionEngine\Decision;
use App\Libraries\History\IssueHistory;
use App\Libraries\History\IssueHistoryEventType;
use App\Libraries\MediaFiles\IssueImport\ImportDecisionSpecificationInterface;
use App\Libraries\Parser\LocalIssue;
use DateTime;

class AlreadyImportedSpecification implements ImportDecisionSpecificationInterface
{
    public function isSatisfiedBy(LocalIssue $localIssue, ?DownloadClientItem $downloadClientItem): Decision
    {
        if ($downloadClientItem == null) {
            return Decision::accept();
        }

        foreach ($localIssue->issues as $issue) {
            if (!$issue->has_file) {
                //TODO: Log
                continue;
            }
            
            $issueHistory = IssueHistory::findByIssueId($issue->cvid);
            /** @var ?IssueHistory */
            $lastImported = $issueHistory->firstWhere("event_type", IssueHistoryEventType::DOWNLOAD_FOLDER_IMPORTED);
            /** @var ?IssueHistory */
            $lastGrabbed = $issueHistory->firstWhere("event_type", IssueHistoryEventType::GRABBED);

            if ($lastImported == null) {
                //TODO: Log
                continue;
            }

            if ($lastGrabbed != null && $lastGrabbed->date > $lastImported->date) {
                //TODO: Log
                continue;
            }

            if ($lastImported->download_id == $downloadClientItem->downloadId) {
                //TODO: Log
                return Decision::reject("Issue file already imported at " . $lastImported->date->format(DATE_ATOM));
            }
        }

        return Decision::accept();
    }
}