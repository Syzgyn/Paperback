<?php

namespace App\Libraries\Providers;

use Illuminate\Foundation\Http\Middleware\TransformsRequest;
use Closure;

class ProviderMiddleware extends TransformsRequest
{
    /** @var array<string, string> */
    protected array $transformations = [
        'enableRss' => 'enable_rss',
        'enableAutomaticSearch' => 'enable_automatic_search',
        'enableInteractiveSearch' => 'enable_interactive_search',
        'configContract' => 'settings_schema',
        'fields' => 'settings',
    ];

    /** 
     * @param string $keyPrefix
    */
    protected function cleanArray(array $data, $keyPrefix = '')
    {
        /** @psalm-var array<string, string> $data */
        foreach($data as $key => $value) {
            $this->updateData($data, $key, $value);
        }

        return collect($data)->all();
    }

    protected function updateData(array &$data, string $key, mixed $value): void
    {
        if (isset($this->transformations[$key])) {
            $data[$this->transformations[$key]] = $value;
            unset($data[$key]);
        }
    }
}
