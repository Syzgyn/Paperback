<?php

namespace App\Libraries\Download\History;

class DownloadHistoryEventType
{
    public const DOWNLOAD_GRABBED = 1;
    public const DOWNLOAD_IMPORTED = 2;
    public const DOWNLOAD_FAILED = 3;
    public const DOWNLOAD_IGNORED = 4;
    public const FILE_IMPORTED = 5;
}
