<?php

namespace App\Models;

use App\Libraries\Providers\ProviderModel;
use App\Libraries\Providers\ProviderSettingsCast;

class Indexer extends ProviderModel
{
    const PROTOCOL = null;

    protected $casts = [
        'settings' => ProviderSettingsCast::class,
        'priority' => 'integer',
        'enable_rss' => 'boolean',
        'enable_interactive_search' => 'boolean',
        'enable_automatic_search' => 'boolean',
    ];

    public $timestamps = false;
    protected $guarded = [
        'protocol',
    ];
    protected $table = 'indexers';

    protected $schema;
    protected $supportsRss;
    protected $supportsSearch;

    public $attributes = [
        'priority' => 25,
        'enable_rss' => true,
        'enable_interactive_search' => true,
        'enable_automatic_search' => true,
    ];

    public function getChildClasses(): array
    {
        return [
            Indexers\Newznab::class,
        ];
    }

    public function getNameAttribute(): string
    {
        return $this->attributes['name'] ?? $this->name ?? "";
    }

    public function getImplementationAttribute(): string
    {
        return $this->attributes['implementation'] ?? $this->implementation ?? "";
    }

    protected function prepareAttributes(array &$attributes): void
    {
        parent::prepareAttributes($attributes);
    }

    public function getParser()
    {
        throw new \Exception("Cannot call getParser from base Indexer class");
    }

    public function getRequestGenerator()
    {
        throw new \Exception("Cannot call getRequestGenerator from base Indexer class");
    }

    public function getEnableAttribute(): bool
    {
        return $this->enable_rss || $this->enable_interactive_search || $this->enable_automatic_search;
    }

    public function setEnableRssAttribute($value): void
    {
        $this->attributes['enable_rss'] = $value;
    }
}
