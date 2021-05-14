<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Disk\OsPath;

class SabnzbdCategory
{
    public ?OsPath $fullPath = null;
    public ?int $priority = null;
    public ?string $pp = null;
    public ?string $name = null;
    public ?string $script = null;
    public ?string $dir = null;
}
