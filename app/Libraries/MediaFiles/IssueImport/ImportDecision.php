<?php

namespace App\Libraries\MediaFiles\IssueImport;

use App\Libraries\DecisionEngine\Rejection;
use App\Libraries\Parser\LocalIssue;

class ImportDecision
{
    public function __construct(
        public ?LocalIssue $localIssue = null,
        /** @var Rejection[] */
        public array $rejections = [],
    ){}

    public function isApproved(): bool
    {
        return empty($this->rejections);
    }
}