<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

class SabnzbdJsonError
{
    public function __construct(public ?bool $status = null, public ?string $error = null)
    {
    }

    public function failed(): bool
    {
        return isset($this->status) && !$this->status; 
    }
}
