<?php

namespace App\Libraries\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/**
 * @property string $baseUrl
 * @property string $apiPath
 * @property string $apiKey
 * @property array $categories
 * @property string $additionalParameters
 */
class ProviderSettings
{
    /** @var array */
    protected $definitions = [];

    /** @var array */
    protected $rules = [];

    /** @var array */
    protected $attributeLabels = [];

    /** @var array<string, array|scalar> */
    protected $attributes = [];

    public final function __construct(array $attributes = [])
    {
        /** @var array{name: string, value: array|scalar} $v */
        foreach($attributes as $k => $v) {
            if (!is_numeric($k)) {
                $this->attributes[$k] = $v;
            } else {
                $this->attributes[$v['name']] = $v['value'] ?? '';
            }
        }
    }

    public function getSettings(): array
    {
        return array_map(function(array $array) {
            /** @var array{name: string, value: array|scalar} $array */
            if (isset($this->attributes[$array['name']])) {
                $array['value'] = $this->attributes[$array['name']];
            }
            return $array;
        }, $this->definitions);
    }

    public function __get(string $key)
    {
        return $this->attributes[$key] ?? null;
    }

    /** @param scalar $value */
    public function __set(string $key, mixed $value): void 
    {
        $this->attributes[$key] = $value;
    }

    public function __isset(string $key): bool
    {
        return isset($this->attributes[$key]);
    }

    public function validate(array $messages = []): bool
    {
        $validator = Validator::make($this->attributes, $this->rules, $messages, $this->attributeLabels);
        if($validator->fails()) {
            throw new ValidationException($validator);
        }

        return true;
    }
}
