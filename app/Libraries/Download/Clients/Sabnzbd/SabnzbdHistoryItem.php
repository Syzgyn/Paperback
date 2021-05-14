<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

class SabnzbdHistoryItem
{
    public ?string $failMessage = null;
    public ?string $category = null;
    public ?int $size = null;
    public ?int $downloadTime = null;
    public ?string $nzbName = null;
    public ?string $storage = null;
    public ?string $id = null;
    public ?string $title = null;
    public ?string $status = null;
}