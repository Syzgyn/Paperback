<?php

namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

use App\Libraries\Download\Clients\Sabnzbd\JsonTransformers\SabnzbdRetryResponseTransformer;

class SabnzbdRetryResponse implements SabnzbdResponseInterface
{
    public ?bool $status = null;
    public ?string $id = null;

    public static function getTransforms(): array
    {
        return [
            SabnzbdRetryResponseTransformer::class,
        ];
    }

    public static function getRoot(): string
    {
        return "";
    }
}
