<?php

namespace App\Services;

use App\Models\Indexer;
use App\Models\TrackedDownload;
use App\Dto\SearchResultCollection;

class DownloadService
{
    public function searchIssue(int $cvid)
    {
        $indexers = Indexer::where('enable_search', true)->get();

        $results = [];
        foreach ($indexers as $indexer) {
            $result = $indexer->searchCvid($cvid);
            $results = array_merge($results, $result->resolve());
        }

        return $results;
    }

    public function downloadIssue(int $cvid)
    {
        //Search Indexers
        $results = SearchResultCollection::create($this->searchIssue($cvid));

        //Remove invalid results
        $parsedResults = resolve('ParserService')->setIssue($cvid)->parseSearchResults($results);

        //Pick best result
        // For now, use NZB age.
        // TODO:  Expand this
        usort($parsedResults, function ($a, $b) {
            $aDt = new \DateTime($a->date);
            $bDt = new \DateTime($b->date);

            return ($aDt < $bDt);
        });

        $selectedResult = array_shift($parsedResults);

        //Result result
        if (! $selectedResult) {
            return;
        }

        return $this->downloadFromGuid($selectedResult->guid);
    }

    public function downloadFromGuid(string $guid)
    {
        $trackedDownload = TrackedDownload::createFromGuid($guid);

        return $trackedDownload;
    }
}
