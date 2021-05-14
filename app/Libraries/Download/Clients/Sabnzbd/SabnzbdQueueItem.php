<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

class SabnzbdQueueItem
{
    public ?string $status = null;
    public ?int $index = null;
    public ?int $timeLeft = null;
    public ?string $size = null;
    public ?string $title = null;
    public ?string $priority = null;
    public ?string $category = null;
    public ?float $sizeLeft = null;
    public ?int $percentage = null;
    public ?string $id = null;
}