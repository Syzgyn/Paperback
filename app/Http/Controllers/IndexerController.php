<?php

namespace App\Http\Controllers;

use App\Models\Indexer;
use Illuminate\Http\Request;
use App\Http\Requests\IndexerRequest;
use App\Http\Resources\IndexerCollection;
use App\Http\Resources\IndexerResultCollection;
use App\Http\Resources\Indexer as IndexerResource;
use App\Http\Resources\TrackedDownload as TrackedDownloadResource;
use App\Libraries\Providers\ProviderController;
use App\Libraries\Providers\ProviderModel;
use App\Repositories\IndexerRepository;

class IndexerController extends ProviderController
{
    public function __construct(IndexerRepository $repo)
    {
        $this->repo = $repo;
    }
}
