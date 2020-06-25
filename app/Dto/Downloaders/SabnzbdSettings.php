<?php

namespace App\Dto\Downloaders;

use App\Casts\Downloaders\SabnzbdSettingsCast;
use Spatie\DataTransferObject\DataTransferObject;
use Illuminate\Contracts\Database\Eloquent\Castable;

final class SabnzbdSettings extends DataTransferObject implements Castable
{
    public $url;
    public $apikey;
    public $port;
    public $username;

    public static function castUsing()
    {
        return SabnzbdSettingsCast::class;
    }
}
