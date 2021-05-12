<?php

namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

class SabnzbdRetryResponse
{
    public ?bool $status;
    public ?string $id;

    public function __construct(bool $status = null, string $nzo_id = null)
    {
        $this->status = $status;
        $this->id = $nzo_id;
    }
}
