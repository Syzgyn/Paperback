<?php

namespace App\Libraries\Download\Clients\Sabnzbd\JsonTransformers;

use App\Libraries\Download\Clients\Sabnzbd\SabnzbdQueue;
use App\Libraries\Download\Clients\Sabnzbd\SabnzbdQueueItem;
use Karriere\JsonDecoder\Bindings\AliasBinding;
use Karriere\JsonDecoder\Bindings\ArrayBinding;
use Karriere\JsonDecoder\ClassBindings;
use Karriere\JsonDecoder\Transformer;

class SabnzbdQueueTransformer implements Transformer
{
    public function register(ClassBindings $classBindings): void
    {
        $classBindings->register(new ArrayBinding('items', 'slots', SabnzbdQueueItem::class));
        $classBindings->register(new AliasBinding('defaultRootFolder', 'my_home'));
    }

    public function transforms(): string
    {
        return SabnzbdQueue::class;
    }
}
