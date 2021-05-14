<?php

namespace App\Libraries\Download\Clients\Sabnzbd\JsonTransformers;

use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdRetryResponse;
use Karriere\JsonDecoder\Bindings\AliasBinding;
use Karriere\JsonDecoder\ClassBindings;
use Karriere\JsonDecoder\Transformer;

class SabnzbdRetryResponseTransformer implements Transformer
{
    public function register(ClassBindings $classBindings): void
    {
        $classBindings->register(new AliasBinding('id', 'nzo_id'));
    }

    public function transforms(): string
    {
        return SabnzbdRetryResponse::class;
    }
}
