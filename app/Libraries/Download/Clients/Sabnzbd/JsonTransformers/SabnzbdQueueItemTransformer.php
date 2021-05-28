<?php

namespace App\Libraries\Download\Clients\Sabnzbd\JsonTransformers;

use App\Libraries\Download\Clients\Sabnzbd\SabnzbdQueueItem;
use Karriere\JsonDecoder\Bindings\AliasBinding;
use Karriere\JsonDecoder\Bindings\ArrayBinding;
use Karriere\JsonDecoder\Bindings\CallbackBinding;
use Karriere\JsonDecoder\ClassBindings;
use Karriere\JsonDecoder\Transformer;
use Exception;

class SabnzbdQueueItemTransformer implements Transformer
{
    public function register(ClassBindings $classBindings): void
    {
        $classBindings->register(new AliasBinding('size', 'mb'));
        $classBindings->register(new AliasBinding('sizeString', 'size'));
        $classBindings->register(new AliasBinding('sizeLeft', 'mbleft'));
        $classBindings->register(new AliasBinding('title', 'filename'));
        $classBindings->register(new AliasBinding('category', 'cat'));
        $classBindings->register(new AliasBinding('id', 'nzo_id'));
        $classBindings->register(new CallbackBinding('timeLeft', fn(array $p) => $this->parseTimeLeft($p)));
    }

    public function transforms(): string
    {
        return SabnzbdQueueItem::class;
    }

    protected function parseTimeLeft(array $properties): int
    {
        $timeLeft = (string) $properties['timeleft'];

        /** @var int[] */
        $split = explode(":", $timeLeft);

        switch (count($split))
        {
            case 4:
                return (int)((($split[0] * 24 + $split[1]) * 60) + $split[2]) * 60 + $split[3];
            case 3:
                return (int)(($split[0] * 60) + $split[1]) * 60 + $split[2];
            default:
                throw new Exception("Expected either 0:0:0:0 or 0:0:0 format, but received: " . $timeLeft);
                
        }
    }
}
