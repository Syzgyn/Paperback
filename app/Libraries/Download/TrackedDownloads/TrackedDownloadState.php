<?php

namespace App\Libraries\Download\TrackedDownloads;

class TrackedDownloadState
{
    public const DOWNLOADING = 0;
    public const IMPORT_PENDING = 1;
    public const IMPORTING = 2;
    public const IMPORTED = 3;
    public const FAILED_PENDING = 4;
    public const FAILED = 5;
    public const IGNORED = 6;
}