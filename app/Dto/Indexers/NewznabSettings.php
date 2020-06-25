<?php

namespace App\Dto\Indexers;

use App\Casts\Indexers\NewznabSettingsCast;
use Spatie\DataTransferObject\DataTransferObject;
use Illuminate\Contracts\Database\Eloquent\Castable;

final class NewznabSettings extends DataTransferObject implements Castable
{
    public $url;

    public $apikey;

    public static function castUsing()
    {
        return NewznabSettingsCast::class;
    }
}
