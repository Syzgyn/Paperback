<?php

namespace App\Casts\Downloaders;

use App\Casts\DTOCast;
use App\Dto\Downloaders\SabnzbdSettings;

final class SabnzbdSettingsCast extends DTOCast
{
    protected function dtoClass(): string
    {
        return SabnzbdSettings::class;
    }
}
