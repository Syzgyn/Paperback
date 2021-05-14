<?php

namespace App\Libraries\Download\Clients\Sabnzbd\JsonTransformers;

use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdAddResponse;
use Karriere\JsonDecoder\Bindings\AliasBinding;
use Karriere\JsonDecoder\ClassBindings;
use Karriere\JsonDecoder\Transformer;

class SabnzbdAddResponseTransformer implements Transformer
{
    public function register(ClassBindings $classBindings): void
    {
        $classBindings->register(new AliasBinding('items', 'nzo_ids'));
    }

    public function transforms(): string
    {
        return SabnzbdAddResponse::class;
    }
}
