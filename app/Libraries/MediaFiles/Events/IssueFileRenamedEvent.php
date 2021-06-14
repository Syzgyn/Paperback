<?php

namespace App\Libraries\MediaFiles\Events;

use App\Models\Comic;
use App\Models\IssueFile;

class IssueFileRenamedEvent
{
    public function __construct(
        public Comic $comic, 
        public IssueFile $issueFile,
        public string $originalPath,
    )
    {
    }
}