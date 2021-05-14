<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Download\Clients\Sabnzbd\JsonTransformers\SabnzbdHistoryItemTransformer;
use App\Libraries\Download\Clients\Sabnzbd\JsonTransformers\SabnzbdHistoryTransformer;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdResponseInterface;

class SabnzbdHistory implements SabnzbdResponseInterface
{
    /** @var SabnzbdHistoryItem[] */
    public array $items = [];

    public static function getTransforms(): array
    {
        return [
            SabnzbdHistoryItemTransformer::class,
            SabnzbdHistoryTransformer::class,
        ];
    }

    public static function getRoot(): string
    {
        return "history";
    }
}