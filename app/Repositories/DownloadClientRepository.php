<?php

namespace App\Repositories;

use App\Libraries\Providers\ProviderRepository;
use App\Models\DownloadClient;
use App\Libraries\Download\DownloadClientModelBase;
use App\Interfaces\DownloadClientRepositoryInterface;
use App\Http\Resources\DownloadClient as DownloadClientResource;
use App\Http\Resources\DownloadClientCollection;

class DownloadClientRepository extends ProviderRepository 
{
    public function __construct()
    {
        parent::__construct(
            new DownloadClient(),
            DownloadClientResource::class,
            DownloadClientCollection::class,
        );
    }

    public function additionalValidationRules(): array
    {
        return [
            'name' => 'string|required',
            'enable' => 'boolean',
            'priority' => 'integer',
            'settings_schema' => 'string|required',
            'implementation' => 'string|required',
            //'tags' => 'array',
            'settings' => 'array',
        ];
    }
}

