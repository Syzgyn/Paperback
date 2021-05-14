<?php

namespace App\Libraries\Download\Clients\Sabnzbd\JsonTransformers;

use App\Libraries\Download\Clients\Sabnzbd\SabnzbdHistory;
use App\Libraries\Download\Clients\Sabnzbd\SabnzbdHistoryItem;
use Karriere\JsonDecoder\Bindings\ArrayBinding;
use Karriere\JsonDecoder\ClassBindings;
use Karriere\JsonDecoder\Transformer;

class SabnzbdHistoryTransformer implements Transformer
{
    public function register(ClassBindings $classBindings): void
    {
        $classBindings->register(new ArrayBinding('items', 'slots', SabnzbdHistoryItem::class));
    }

    public function transforms(): string
    {
        return SabnzbdHistory::class;
    }
}
