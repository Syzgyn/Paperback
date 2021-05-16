<?php

namespace App\Libraries\Indexers\Newznab;

use App\Libraries\Providers\ProviderSettings;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

/**
 * @property string $baseUrl
 * @property string $apiPath
 * @property string $apiKey
 * @property array $categories
 * @property string $additionalParameters
 */
class NewznabSettings extends ProviderSettings
{
    /** @var array */
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

    /** @var array */
    protected $rules = [ 
        'baseUrl' => 'required|url',
        'apiPath' => 'string',
        'apiKey' => 'required|string',
        'categories' => 'array',
        'additionalParameters' => 'string',
    ];

    /** @var array */
    protected $attributeLabels = [
        'baseUrl' => 'URL',
        'apiPath' => 'API Path',
        'apiKey' => 'API Key',
    ];
}
