<?php

namespace App\Libraries\Download;

class DownloadIgnoredEvent
{
    public ?int $comicId = null;
    public array $issueIds = [];
    public ?string $sourceTitle = null;
    public ?DownloadClientItemClientInfo $downloadClientInfo = null;
    public ?string $downloadId = null;
    public ?string $message = null;
}