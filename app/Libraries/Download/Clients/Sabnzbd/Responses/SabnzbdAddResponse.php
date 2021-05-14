<?php

namespace App\Libraries\Download\Clients\Sabnzbd\Responses;

use App\Libraries\Download\Clients\Sabnzbd\JsonTransformers\SabnzbdAddResponseTransformer;

class SabnzbdAddResponse implements SabnzbdResponseInterface
{
    /** @var string[] */
    public ?array $ids = null;
    public ?bool $status = null;

    public static function getTransforms(): array
    {
        return [
            SabnzbdAddResponseTransformer::class,
        ];
    }

    public static function getRoot(): string
    {
        return "";
    }
}
