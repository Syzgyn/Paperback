<?php

namespace App\Libraries\MediaFiles\IssueImport;

use App\Libraries\DecisionEngine\Rejection;
use App\Libraries\Parser\LocalIssue;

class ImportDecision
{
    /** @param Rejection[] $rejections */
    public function __construct(
        public ?LocalIssue $localIssue = null,
        public array $rejections = [],
    ){}

    public function isApproved(): bool
    {
        return empty($this->rejections);
    }
}