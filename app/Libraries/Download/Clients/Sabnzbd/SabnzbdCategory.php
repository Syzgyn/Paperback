<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Disk\OsPath;

class SabnzbdCategory
{
    public OsPath $fullPath;

    public function __construct(
        public int $priority,
        public string $pp,
        public string $name,
        public string $script,
        public string $dir,
        ...$other)
    {
    }
}
