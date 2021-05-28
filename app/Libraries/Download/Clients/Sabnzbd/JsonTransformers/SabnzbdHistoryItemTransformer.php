<?php

namespace App\Libraries\Download\Clients\Sabnzbd\JsonTransformers;

use App\Libraries\Download\Clients\Sabnzbd\SabnzbdHistoryItem;
use Karriere\JsonDecoder\Bindings\AliasBinding;
use Karriere\JsonDecoder\Bindings\CallbackBinding;
use Karriere\JsonDecoder\ClassBindings;
use Karriere\JsonDecoder\Transformer;
use Exception;

class SabnzbdHistoryItemTransformer implements Transformer
{
    public function register(ClassBindings $classBindings): void
    {
        $classBindings->register(new AliasBinding('size', 'mb'));
        $classBindings->register(new AliasBinding('sizeString', 'size'));
        $classBindings->register(new AliasBinding('sizeLeft', 'mbleft'));
        $classBindings->register(new AliasBinding('title', 'filename'));
        $classBindings->register(new AliasBinding('category', 'cat'));
        $classBindings->register(new AliasBinding('id', 'nzo_id'));
    }
    
    public function transforms(): string
    {
        return SabnzbdHistoryItem::class;
    }
}
