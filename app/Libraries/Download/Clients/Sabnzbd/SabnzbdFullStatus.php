<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Download\Clients\Sabnzbd\JsonTransformers\SabnzbdFullStatusTransformer;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdResponseInterface;

class SabnzbdFullStatus implements SabnzbdResponseInterface
{
    public ?string $completeDir = null;

    public static function getTransforms(): array
    {
        return [
            SabnzbdFullStatusTransformer::class,
        ];
    }

    public static function getRoot(): string
    {
        return "";
    }
}
