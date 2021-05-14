<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Providers\ProviderSettings;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/** @package App\Libraries\Download\Clients\Sabnzbd
 * @property string $host
 * @property int $port
 * @property string $urlBase
 * @property string $apiKey
 * @property string $username
 * @property string $password
 * @property string $category
 * @property int $recentPriority
 * @property int $olderPriority
 * @property bool $useSsl
 */
class SabnzbdSettings extends ProviderSettings
{
    /** @var array */
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

    protected function validateHost(string $attribute, string $value, callable $fail): void
    {
        if (!preg_match('/^[-_a-z0-9.]+$/', $value)) {
            $fail("The $attribute must be valid Host without http://");
        }
    }

    /** @var array $rules */
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

    /** @var array */
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


    public function validate(array $messages = []): bool
    {
        $func = function(string $a, string $v, callable $f): void { $this->validateHost($a, $v, $f); };
        
        if (!is_array($this->rules['host'])) {
            $this->rules['host'] = [$this->rules['host']];
        }
        $this->rules['host'][] = $func;

        return parent::validate($messages);
    }
}

