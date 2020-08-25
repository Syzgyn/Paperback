<?php

namespace App\Services;

use App\Models\Issue;
use App\Models\Comic;
use App\Models\Indexer;
use App\Dto\SearchResult;
use App\Models\TrackedDownload;
use App\Dto\SearchResultCollection;

class DownloadService
{
    protected static $issues = [];

    public function searchIssue(int $cvid)
    {
        $indexers = Indexer::where('enable_search', true)->get();

        $results = [];
        foreach ($indexers as $indexer) {
            $result = $this->searchIndexerForIssue($indexer, $cvid);

            $source = $indexer->schema['protocol'] == 'usenet' ? 'nzb' : $indexer->schema['protocol'];
            $comic = $this->getIssue($cvid)->comic;

            array_walk($result, function (&$item, $key) use ($source, $cvid, $comic, $indexer) {
                $item['indexer'] = $indexer->name;
                $item['indexer_id'] = $indexer->id;
                $item['source'] = $source;
                $item['issue_id'] = (int)$cvid;
                $item['comic_id'] = $comic->cvid;
                $item['protocol'] = $indexer::PROTOCOL;
            });

            $results = array_merge($results, $result);
        }

        return $results;
    }

    protected function searchIndexerForIssue(Indexer $indexer, int $cvid)
    {
        $issue = $this->getIssue($cvid);
        $padding = 3;

        while (true) {
            $queryData = $this->buildSearchQuery($cvid, $padding);
            $result = $indexer->searchCvid($queryData['comic'], $queryData['issue'], $queryData['issueYear'], $queryData['comicYear']);

            //If we have results, we're done
            if (count($result)) {
                return $result->resolve();
            }

            //Try decreasing the issue num padding by one
            if ($padding == 3 && $issue->issue_num !== 0) {
                $padding = 2;
                continue;
            }

            return [];
        }
    }

    public function buildSearchQuery(int $cvid, $issuePadding = 3)
    {
        $issue = $this->getIssue($cvid);
        $year = date('Y', strtotime($issue->release_date));
        $formatString = '%0' . $issuePadding . 'd';
        $name = preg_replace('/[^A-Za-z0-9 ]/', '', $issue->comic->name);

        return [
            'comic' => $name,
            'issue' => sprintf($formatString, $issue->issue_num),
            'issueYear' => $year,
            'comicYear' => $issue->comic->start_year,
        ];
    }

    public function getIssue(int $cvid)
    {
        if (array_key_exists($cvid, self::$issues)) {
            return self::$issues[$cvid];
        }

        $issue = Issue::with('comic')->find($cvid);
        self::$issues[$cvid] = $issue;

        return self::$issues[$cvid];
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

        return $this->download($selectedResult);
    }

    public function download(SearchResult $result)
    {
        $trackedDownload = new TrackedDownload();
        $trackedDownload->indexerId = $result->indexer_id;
        $trackedDownload->url = $result->url;
        $trackedDownload->fill($result->toArray());
        $trackedDownload->save();

        return $trackedDownload;
    }

    public function downloadComic(int $cvid)
    {
        $comic = Comic::with(['issues', 'issues.downloadedFile'])->find($cvid);

        foreach($comic->issues as $issue) {
            if (! $issue->monitored || $issue->hasDownloadedFile()) {
                continue;
            }
            $this->downloadIssue($issue->cvid);
        }
    }
}
