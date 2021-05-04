<?php

namespace App\Libraries\Providers;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use InvalidArgumentException;

class ProviderSettingsCast implements CastsAttributes
{
    protected $libraryPath = "App\Libraries";

    public function get($model, $key, $value, $attributes)
    {
        $path = $model->getSettingsSchemaClassName();

        $settingsValues = json_decode($value, true) ?? [];

        return new $path($settingsValues);
    }

    public function set($model, $key, $value, $attributes)
    {
        if (is_array($value)) {
            return [
                'settings' => json_encode($value),
            ];
        }

        $path = $model->getSettingsSchemaClassName();

        if (!is_object($value) || get_class($value) !== $path) {
            throw new InvalidArgumentException("The given value " . gettype($value) . " is not an instance of $path.");
        }

        return [
            'settings' => json_encode($value->attributes)
        ];
    }
}
