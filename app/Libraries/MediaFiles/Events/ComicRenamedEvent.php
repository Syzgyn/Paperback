<?php

namespace App\Libraries\MediaFiles\Events;

use App\Libraries\MediaFiles\RenamedIssueFile;
use App\Models\Comic;

class ComicRenamedEvent
{
    /** @param RenamedIssueFile[] $renamedFiles */
    public function __construct(
        public Comic $comic,
        public array $renamedFiles,
    )
    {
    }
}