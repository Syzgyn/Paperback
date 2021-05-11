<?php

namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

use App\Libraries\Download\Clients\Sabnzbd\SabnzbdRemoteConfig;

class SabnzbdConfigResponse
{
    public SabnzbdRemoteConfig $config;

    public function __construct(array $config)
    {
        $this->config = SabnzbdRemoteConfig::fromArray($config);
    }
}

