<?php

namespace App\Libraries\MediaFiles\IssueImport;

use App\Libraries\DecisionEngine\Decision;
use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Parser\LocalIssue;

interface ImportDecisionSpecificationInterface
{
    public function isSatisfiedBy(LocalIssue $localIssue, ?DownloadClientItem $downloadClientItem): Decision;
}