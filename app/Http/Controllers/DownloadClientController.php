<?php

namespace App\Http\Controllers;

use App\Libraries\Providers\ProviderController;
use App\Repositories\DownloadClientRepository;

class DownloadClientController extends ProviderController
{
    public function __construct(DownloadClientRepository $repo)
    {
        $this->repo = $repo;
    }
}

