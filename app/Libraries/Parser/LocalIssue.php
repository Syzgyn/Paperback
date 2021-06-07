<?php

namespace App\Libraries\Parser;

use App\Models\Comic;
use App\Models\Issue;

class LocalIssue
{
    public ?string $path = null;
    public ?int $size = null;
    public ?ParsedIssueInfo $fileIssueInfo = null;
    public ?ParsedIssueInfo $downloadClientIssueInfo = null;
    public ?ParsedIssueInfo $folderIssueInfo = null;
    public ?Comic $comic = null;
    /** @var Issue[] */
    public array $issues = [];
    public bool $existingFile = false;

    public function __toString(): string
    {
        return $this->path ?? "";
    }
}