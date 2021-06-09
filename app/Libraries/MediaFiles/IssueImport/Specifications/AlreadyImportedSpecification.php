<?php

namespace App\Libraries\MediaFiles\IssueImport\Specifications;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\DecisionEngine\Decision;
use App\Libraries\History\IssueHistory;
use App\Libraries\History\IssueHistoryEventType;
use App\Libraries\MediaFiles\IssueImport\ImportDecisionSpecificationInterface;
use App\Libraries\Parser\LocalIssue;
use DateTime;
use Illuminate\Support\Facades\Log;

class AlreadyImportedSpecification implements ImportDecisionSpecificationInterface
{
    public function isSatisfiedBy(LocalIssue $localIssue, ?DownloadClientItem $downloadClientItem): Decision
    {
        if ($downloadClientItem == null) {
            Log::debug("No download client information is available, skipping");
            return Decision::accept();
        }

        foreach ($localIssue->issues as $issue) {
            if (!$issue->has_file) {
                Log::debug("Skipping already imported check for issue without file");
                continue;
            }
            
            $issueHistory = IssueHistory::findByIssueId($issue->cvid);
            /** @var ?IssueHistory */
            $lastImported = $issueHistory->firstWhere("event_type", IssueHistoryEventType::DOWNLOAD_FOLDER_IMPORTED);
            /** @var ?IssueHistory */
            $lastGrabbed = $issueHistory->firstWhere("event_type", IssueHistoryEventType::GRABBED);

            if ($lastImported == null) {
                Log::debug("Issue file has not been imported");
                continue;
            }

            if ($lastGrabbed != null && $lastGrabbed->date > $lastImported->date) {
                Log::debug("Issue file was grabbed again after importing");
                continue;
            }

            if ($lastImported->download_id == $downloadClientItem->downloadId) {
                Log::debug("Issue file previously imported at " . $lastImported->date->format(DATE_ATOM));
                return Decision::reject("Issue file already imported at " . $lastImported->date->format(DATE_ATOM));
            }
        }

        return Decision::accept();
    }
}