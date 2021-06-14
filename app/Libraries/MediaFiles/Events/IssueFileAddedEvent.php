<?php

namespace App\Libraries\MediaFiles\Events;

use App\Models\IssueFile;

class IssueFileAddedEvent
{
    public function __construct(
        public IssueFile $issueFile
    )
    {
    }
}