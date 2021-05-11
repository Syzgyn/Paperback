<?php

namespace App\Repositories;

use App\Libraries\Providers\ProviderRepository;
use App\Models\Indexer;
use App\Libraries\Indexers\IndexerModelBase;
use App\Interfaces\IndexerRepositoryInterface;
use App\Http\Resources\Indexer as IndexerResource;
use App\Http\Resources\IndexerCollection;

class IndexerRepository extends ProviderRepository implements IndexerRepositoryInterface
{
    public function __construct()
    {
        parent::__construct(
            new Indexer(),
            IndexerResource::class,
            IndexerCollection::class,
        );
    }

    public function additionalValidationRules(): array
    {
        return [
            'name' => 'string|required',
            'enable_rss' => 'boolean',
            'enable_automatic_search' => 'boolean',
            'enable_interactive_search' => 'boolean',
            'priority' => 'integer',
            'settings_schema' => 'string|required',
            'implementation' => 'string|required',
            //'tags' => 'array',
            'settings' => 'array',
        ];
    }
}
