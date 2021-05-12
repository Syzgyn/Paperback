<?php

namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

class SabnzbdAddResponse
{
    public ?array $ids;
    public ?bool $status;

    public function __construct(bool $status = null, array $nzo_ids = null)
    {
        $this->status = $status;
        $this->ids = $nzo_ids;
    }
}
