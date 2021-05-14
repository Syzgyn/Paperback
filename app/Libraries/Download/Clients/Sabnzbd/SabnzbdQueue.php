<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Download\Clients\Sabnzbd\JsonTransformers\SabnzbdQueueItemTransformer;
use App\Libraries\Download\Clients\Sabnzbd\JsonTransformers\SabnzbdQueueTransformer;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdResponseInterface;
use App\Libraries\Download\Clients\Sabnzbd\SabnzbdQueueItem;

class SabnzbdQueue implements SabnzbdResponseInterface
{
    public ?string $defaultRootFolder = null;
    /** @var SabnzbdQueueItem[] */
    public array $items = [];
    public bool $paused = false;

    public static function getTransforms(): array
    {
        return [
            SabnzbdQueueTransformer::class,
            SabnzbdQueueItemTransformer::class,
        ];
    }

    public static function getRoot(): string
    {
        return "queue";
    }
}