<?php

namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

class SabnzbdRetryResponse
{
    public bool $status;
    public string $id;

    public function __construct(bool $status, string $nzo_id)
    {
        $this->status = $status;
        $this->id = $nzo_id;
    }
}
