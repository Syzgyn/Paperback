<?php

namespace App\Libraries\Organizer;

use App\Models\Comic;
use App\Models\Issue;
use App\Models\IssueFile;

class SampleResult
{
    /** @param Issue[] $issues */
    public function __construct(
        public string $fileName,
        public Comic $comic,
        public array $issues,
        public IssueFile $issueFile,
    )
    {
    }
}