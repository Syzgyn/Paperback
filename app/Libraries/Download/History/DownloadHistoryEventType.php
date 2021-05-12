<?php

namespace App\Libraries\Download\History;

class DownloadHistoryEventType
{
    const DOWNLOAD_GRABBED = 1;
    const DOWNLOAD_IMPORTED = 2;
    const DOWNLOAD_FAILED = 3;
    const DOWNLOAD_IGNORED = 4;
    const FILE_IMPORTED = 5;
}