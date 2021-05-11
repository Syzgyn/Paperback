<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SabnzbdSettings
{
    protected $definitions = [
        [
            'name' => 'host',
            'label' => 'Host',
            'type' => 'textbox',
            'value' => 'localhost',
            'advanced' => false,
            'order' => 0,
        ],
        [
            'name' => 'port',
            'label' => 'Port',
            'type' => 'textbox',
            'value' => '8080',
            'advanced' => false,
            'order' => 1,
        ],
        [
            'name' => 'urlBase',
            'label' => 'Url Base',
            'helpText' => 'Adds a prefix to the Sabnzbd url, e.g. http://[host]:[port]/[urlBase]/api',
            'type' => 'textbox',
            'advanced' => true,
            'order' => 2,
        ],
        [
            'name' => 'apiKey',
            'label' => 'API Key',
            'type' => 'textbox',
            'advanced' => false,
            'order' => 3,
        ],
        [
            'name' => 'username',
            'label' => 'Username',
            'type' => 'textbox',
            'advanced' => false,
            'order' => 4,
        ],
        [
            'name' => 'password',
            'label' => 'Password',
            'type' => 'password',
            'advanced' => false,
            'order' => 5,
        ],
        [
            'name' => 'category',
            'label' => 'Category',
            'type' => 'textbox',
            'value' => 'comics',
            'advanced' => false,
            'helpText' => "Adding a category specific to Sonarr avoids conflicts with unrelated downloads, but it's optional",
            'order' => 6,
        ],
        [
            'name' => 'recentPriority',
            'label' => 'Recent Priority',
            'type' => 'select',
            'helpText' => "Priority to use when grabbing issues that aired within the last 14 days",
            'value' => -100,
            'advanced' => false,
            'order' => 7,
            'selectOptions' => [
                [
                    'value' => -100,
                    'name' => 'Default',
                    'order' => -100,
                    'hint' => '(-100)',
                ],
                [
                    'value' => -2,
                    'name' => 'Paused',
                    'order' => -2,
                    'hint' => '(-2)',
                ],
                [
                    'value' => -1,
                    'name' => 'Low',
                    'order' => -1,
                    'hint' => '(-1)',
                ],
                [
                    'value' => 0,
                    'name' => 'Normal',
                    'order' => 0,
                    'hint' => '(0)',
                ],
                [
                    'value' => 1,
                    'name' => 'High',
                    'order' => 1,
                    'hint' => '(1)',
                ],
                [
                    'value' => 2,
                    'name' => 'Force',
                    'order' => 2,
                    'hint' => '(2)',
                ],
            ],
        ],
        [
            'name' => 'olderPriority',
            'label' => 'Older Priority',
            'type' => 'select',
            'value' => -100,
            'advanced' => false,
            'helpText' => "Priority to use when grabbing issues that aired over 14 days ago",
            'order' => 8,
            'selectOptions' => [
                [
                    'value' => -100,
                    'name' => 'Default',
                    'order' => -100,
                    'hint' => '(-100)',
                ],
                [
                    'value' => -2,
                    'name' => 'Paused',
                    'order' => -2,
                    'hint' => '(-2)',
                ],
                [
                    'value' => -1,
                    'name' => 'Low',
                    'order' => -1,
                    'hint' => '(-1)',
                ],
                [
                    'value' => 0,
                    'name' => 'Normal',
                    'order' => 0,
                    'hint' => '(0)',
                ],
                [
                    'value' => 1,
                    'name' => 'High',
                    'order' => 1,
                    'hint' => '(1)',
                ],
                [
                    'value' => 2,
                    'name' => 'Force',
                    'order' => 2,
                    'hint' => '(2)',
                ],
            ],
        ],
        [
            'name' => 'useSsl',
            'label' => 'Use SSL',
            'type' => 'checkbox',
            'value' => false,
            'advanced' => false,
            'order' => 9,
        ],
    ];

    protected function validateHost($attribute, $value, $fail) {
        if (!preg_match('/^[-_a-z0-9.]+$/', $value)) {
            $fail("The $attribute must be valid Host without http://");
        }
    }

    protected $rules = [ 
        'host' => [
            'required',
        ],
        'port' => 'required|integer|between:1,65535',
        'apiKey' => 'required_without_all:username,password|string',
        'username' => 'required_without:apiKey|string',
        'password' => 'required_without:apiKey|string',
        'category' => 'string',
        'recentPriority' => 'required|integer',
        'olderPriority' => 'required|integer',
        'useSsl' => 'boolean',
    ];

    protected $attributeLabels = [
        'host' => 'Host',
        'port' => 'Port',
        'apiKey' => 'API Key',
        'username' => 'Username',
        'password' => 'Password',
        'category' => 'Category',
        'recentPriority' => 'Recent Priority',
        'olderPriority' => 'Older Priority',
        'useSsl' => 'Use SSL',
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
        $this->rules['host'][] = fn($a, $v, $f) => $this->validateHost($a, $v, $f);
        $validator = Validator::make($this->attributes, $this->rules, $messages, $this->attributeLabels);
        if($validator->fails()) {
            throw new ValidationException($validator);
        }

        return true;
    }
}

