<?php

namespace App\Libraries\Download;

class DownloadItemStatus
{
    public const QUEUED = 0;
    public const PAUSED = 1;
    public const DOWNLOADING = 2;
    public const COMPLETED = 3;
    public const FAILED = 4;
    public const WARNING = 5;
}