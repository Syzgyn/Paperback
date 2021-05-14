<?php

namespace App\Libraries\Download\Clients\Sabnzbd\JsonTransformers;

use App\Libraries\Download\Clients\Sabnzbd\SabnzbdCategory;
use App\Libraries\Download\Clients\Sabnzbd\SabnzbdFullStatus;
use Exception;
use Karriere\JsonDecoder\Bindings\ArrayBinding;
use Karriere\JsonDecoder\Bindings\CallbackBinding;
use Karriere\JsonDecoder\ClassBindings;
use Karriere\JsonDecoder\Transformer;

class SabnzbdFullStatusTransformer implements Transformer
{
    public function register(ClassBindings $classBindings): void
    {
    }

    public function transforms(): string
    {
        return SabnzbdFullStatus::class;
    }
}
