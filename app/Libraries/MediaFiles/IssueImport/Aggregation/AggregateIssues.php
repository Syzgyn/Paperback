<?php

namespace App\Libraries\MediaFiles\IssueImport\Aggregation;

use App\Libraries\Parser\LocalIssue;
use App\Libraries\Download\DownloadClientItem;
use App\Libraries\MediaFiles\IssueFileExtensions;
use App\Libraries\Parser\ParsedIssueInfo;
use App\Models\Issue;

class AggregateIssues implements AggregateInterface
{
    public function aggregate(LocalIssue $localIssue, DownloadClientItem $downloadClientItem): LocalIssue
    {
        $localIssue->issues = $this->getIssues($localIssue);

        return $localIssue;
    }

    /** @return Issue[] */
    protected function getIssues(LocalIssue $localIssue): array
    {
        $bestIssueInfoforIssues = $this->getBestIssueInfo($localIssue);

        if ($bestIssueInfoforIssues == null || $localIssue->comic == null) {
            return [];
        }

        /** @var Issue[] */
        return resolve("ParserService")->getIssues($bestIssueInfoforIssues, $localIssue->comic);
    }

    protected function getBestIssueInfo(LocalIssue $localIssue): ?ParsedIssueInfo
    {
        $parsedIssueInfo = $localIssue->fileIssueInfo;
        $downloadClientIssueInfo = $localIssue->downloadClientIssueInfo;
        $folderIssueInfo = $localIssue->folderIssueInfo;

        if ($downloadClientIssueInfo != null && !$downloadClientIssueInfo->fullComic) {
            $parsedIssueInfo = $localIssue->downloadClientIssueInfo;
        } elseif ($folderIssueInfo != null && !$folderIssueInfo->fullComic) {
            $parsedIssueInfo = $localIssue->folderIssueInfo;
        }

        return $parsedIssueInfo;
    }
}