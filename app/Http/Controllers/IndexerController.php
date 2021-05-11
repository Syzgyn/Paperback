<?php

namespace App\Http\Controllers;

use App\Libraries\Providers\ProviderController;
use App\Repositories\IndexerRepository;

class IndexerController extends ProviderController
{
    public function __construct(IndexerRepository $repo)
    {
        $this->repo = $repo;
    }
}
