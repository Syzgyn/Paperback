<?php

namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

class SabnzbdFullStatusResponse
{
    public SabnzbdFullStatus $status;

    public function __construct(array $status)
    {
        $this->status = new SabnzbdFullStatus($status);
    }
}
