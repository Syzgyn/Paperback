<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

class SabnzbdFullStatus
{
    public string $completeDir;

    public function __construct(array $status)
    {
        $this->completeDir = $status['completedir'];
    }
}
