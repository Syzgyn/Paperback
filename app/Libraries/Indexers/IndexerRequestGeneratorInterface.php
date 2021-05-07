<?php

namespace App\Libraries\Indexers;

use App\Libraries\IndexerSearch\SearchCriteriaBase;

interface IndexerRequestGeneratorInterface
{
    public function getRecentRequests(): IndexerPageableRequestChain;
    public function getSearchRequests(SearchCriteriaBase $searchCriteria): IndexerPageableRequestChain;
}
