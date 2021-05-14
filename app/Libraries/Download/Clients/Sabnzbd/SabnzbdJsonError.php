<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

class SabnzbdJsonError
{
    public function __construct(public bool $status, public string $error)
    {
    }

    public function failed(): bool
    {
        return !$this->status; 
    }
}
