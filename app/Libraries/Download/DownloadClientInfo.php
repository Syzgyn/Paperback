<?php

namespace App\Libraries\Download;

use App\Libraries\Disk\OsPath;

class DownloadClientInfo
{
    public ?bool $isLocalhost = null;
    /** @var OsPath[] */
    public array $outputRootFolders = [];
}

