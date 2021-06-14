<?php

namespace App\Libraries\MediaFiles;

use App\Models\IssueFile;

class RenamedIssueFile
{
    public function __construct(
        public IssueFile $issueFile,
        public string $previousPath,
        public string $previousRelativePath,
    )
    {
        
    }
}