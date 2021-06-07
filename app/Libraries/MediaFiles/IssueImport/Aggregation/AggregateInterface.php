<?php

namespace App\Libraries\MediaFiles\IssueImport\Aggregation;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Parser\LocalIssue;

interface AggregateInterface
{
    public function aggregate(LocalIssue $localIssue, DownloadClientItem $downloadClientItem): LocalIssue;
}