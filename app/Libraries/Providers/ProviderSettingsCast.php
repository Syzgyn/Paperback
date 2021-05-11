<?php

namespace App\Libraries\Providers;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use InvalidArgumentException;

class ProviderSettingsCast implements CastsAttributes
{
    public function get($model, $key, $value, $attributes)
    {
        $class = $model->settingsSchemaClassName;

        $settingsValues = json_decode($value, true) ?? [];

        return new $class($settingsValues);
    }

    public function set($model, $key, $value, $attributes)
    {
        if (is_array($value)) {
            return [
                'settings' => json_encode($value),
            ];
        }

        // I don't know why this doesn't work when called as $model->settingsSchemaClassName,
        // but it throws an Undefined Property error... 
        $class = $model->getSettingsSchemaClassNameAttribute();

        if (!is_object($value) || get_class($value) !== $class) {
            throw new InvalidArgumentException("The given value " . gettype($value) . " is not an instance of $class.");
        }

        return [
            'settings' => json_encode($value->attributes)
        ];
    }
}
