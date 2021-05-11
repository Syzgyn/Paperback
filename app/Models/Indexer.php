<?php

namespace App\Models;

use Exception;
use App\Libraries\Indexers\IndexerModelBase;

class Indexer extends IndexerModelBase
{
    protected function getParser()
    {
        throw new Exception("Cannot call getParser of base Indexer");
    }

    protected function getRequestGenerator()
    {
        throw new Exception("Cannot call getRequestGenerator of base Indexer");
    }
}
