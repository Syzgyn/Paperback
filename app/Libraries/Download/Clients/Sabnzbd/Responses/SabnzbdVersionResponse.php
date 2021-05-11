<?php

namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

class SabnzbdVersionResponse
{
    public function __construct(public string $version)
    {
    }
}
