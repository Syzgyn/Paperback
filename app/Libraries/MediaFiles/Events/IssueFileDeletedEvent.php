<?php

namespace App\Libraries\MediaFiles\Events;

use App\Libraries\MediaFiles\DeleteIssueFileReason;
use App\Models\IssueFile;

class IssueFileDeletedEvent
{
    /** @param DeleteIssueFileReason::* $reason */
    public function __construct(
        public IssueFile $issueFile,
        public int $reason,
    )
    {
    }
}