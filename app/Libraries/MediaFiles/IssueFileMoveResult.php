<?php

namespace App\Libraries\MediaFiles;

use App\Models\IssueFile;

class IssueFileMoveResult
{
    public ?IssueFile $issueFile = null;
    /** @var IssueFile[] */
    public array $oldFiles = [];
}