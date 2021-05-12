<?php

namespace App\Libraries\Parser;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class ReleaseInfoCast implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes)
    {
        $releaseInfo = new ReleaseInfo();
        $json = json_decode($value, true);
        foreach ($json as $key => $val) {
            
            $releaseInfo->$key = $val;
        }

        return $releaseInfo;
    }

    public function set($model, string $key, $value, array $attributes)
    {
        return json_encode($value);
    }
}