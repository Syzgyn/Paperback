<?php

namespace App\Libraries\Providers;

use Illuminate\Foundation\Http\Middleware\TransformsRequest;
use Closure;

class ProviderMiddleware extends TransformsRequest
{
    protected $transformations = [
        'enableRss' => 'enable_rss',
        'enableAutomaticSearch' => 'enable_automatic_search',
        'enableInteractiveSearch' => 'enable_interactive_search',
        'configContract' => 'settings_schema',
        'fields' => 'settings',
    ];

    protected function cleanArray(array $data, $keyPrefix = '')
    {
        foreach($data as $key => $value) {
            $this->updateData($data, $key, $value);
        }

        return collect($data)->all();
    }

    protected function updateData(array &$data, $key, $value)
    {
        if (isset($this->transformations[$key])) {
            $data[$this->transformations[$key]] = $value;
            unset($data[$key]);
        }
    }
}
