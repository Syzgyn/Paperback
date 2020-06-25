<?php

namespace App\Casts\Indexers;

use App\Casts\DTOCast;
use App\Dto\Indexers\NewznabSettings;

final class NewznabSettingsCast extends DTOCast
{
    protected function dtoClass(): string
    {
        return NewznabSettings::class;
    }
}
