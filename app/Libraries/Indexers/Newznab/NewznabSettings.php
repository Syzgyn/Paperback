<?php

namespace App\Libraries\Indexers\Newznab;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class NewznabSettings
{
    protected $definitions = [
        [
            'name' => 'baseUrl',
            'label' => 'URL',
            'type' => 'textbox',
            'advanced' => false,
            'order' => 0,
        ],
        [
            'name' => 'apiPath',
            'label' => 'API Path',
            'helpText' => 'Path to the api, usually /api',
            'type' => 'textbox',
            'value' => '/api',
            'advanced' => true,
            'order' => 1,
        ],
        [
            'name' => 'apiKey',
            'label' => 'API Key',
            'type' => 'textbox',
            'advanced' => false,
            'order' => 2,
        ],
        [
            'name' => 'categories',
            'label' => 'Categories',
            'helpText' => 'Comma separated list',
            'type' => 'select',
            'value' => [7000, 7030],
            'selectOptionsProviderAction' => 'newznabCategories',
            'advanced' => false,
            'order' => 3,
        ],
        [
            'name' => 'additionalParameters',
            'label' => 'Additional Parameters',
            'type' => 'textbox',
            'advanced' => true,
            'order' => 4,
        ],
    ];

    protected $rules = [ 
        'baseUrl' => 'required|url',
        'apiPath' => 'string',
        'apiKey' => 'required|string',
        'categories' => 'array',
        'additionalParameters' => 'string',
    ];

    protected $attributeLabels = [
        'baseUrl' => 'URL',
        'apiPath' => 'API Path',
        'apiKey' => 'API Key',
    ];

    public $attributes = [];

    public function __construct(array $attributes = [])
    {
        foreach($attributes as $k => $v) {
            if (!is_numeric($k)) {
                $this->attributes[$k] = $v;
            } else {
                $this->attributes[$v['name']] = $v['value'] ?? '';
            }
        }
    }

    public function getSettings()
    {
        return array_map(function(array $array) {
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

    public function __set(string $key, $value): void 
    {
        $this->attributes[$key] = $value;
    }

    public function __isset(string $key): bool
    {
        return isset($this->attributes[$key]);
    }

    public function validate($messages = [])
    {
        $validator = Validator::make($this->attributes, $this->rules, $messages, $this->attributeLabels);
        if($validator->fails()) {
            throw new ValidationException($validator);
        }

        return true;
    }
}
