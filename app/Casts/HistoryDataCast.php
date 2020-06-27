<?php

namespace App\Casts;

use App\Casts\DTOCast;
use App\Dto\HistoryData;

final class HistoryDataCast extends DTOCast
{
    protected function dtoClass(): string
    {
        return HistoryData::class;
    }
}

