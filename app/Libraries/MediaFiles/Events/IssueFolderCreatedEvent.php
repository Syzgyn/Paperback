<?php

namespace App\Libraries\MediaFiles\Events;

use App\Models\Comic;
use App\Models\IssueFile;

class IssueFolderCreatedEvent
{
    public Comic $comic;
    public IssueFile $issueFile;
    public ?string $comicFolder = null;
    public ?string $issueFolder = null;

    public function __construct(Comic $comic, IssueFile $issueFile)
    {
        $this->comic = $comic;
        $this->issueFile = $issueFile;
    }
}