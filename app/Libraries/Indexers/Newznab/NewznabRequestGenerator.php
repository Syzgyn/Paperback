<?php

namespace App\Libraries\Indexers\Newznab;

use App\Libraries\Http\HttpAccept;
use App\Libraries\Http\HttpRequest;
use App\Libraries\IndexerSearch\SearchCriteriaBase;
use App\Libraries\Indexers\IndexerRequestGeneratorInterface;
use App\Libraries\Indexers\IndexerPageableRequestChain;
use App\Models\Indexers\Newznab;
use Exception;

class NewznabRequestGenerator implements IndexerRequestGeneratorInterface
{
    public NewznabSettings $settings;
    protected int $maxPages = 30;

    public function getPageSize(): int
    {
        return Newznab::PAGE_SIZE;
    }

    public function __construct(?NewznabSettings $settings = null)
    {
        if (!$settings) {
            throw new Exception("Missing NewznabSettings object");
        }

        $this->settings = $settings;
    }

    public function getRecentRequests(): IndexerPageableRequestChain
    {
        //TODO: add capabilities check
        $chain = new IndexerPageableRequestChain();
        $chain->add($this->getPagedRequests('search', ""));

        return $chain;
    }

    protected function getPagedRequests(string $searchType, string $parameters): \Generator
    {
        $categoriesQuery = implode(',', $this->settings->categories);

        if (empty($this->settings->categories)) {
            return;
        }

        $host = rtrim($this->settings->baseUrl, '/');
        $apiPath = rtrim($this->settings->apiPath, '/');
        $baseUrl = sprintf("%s%s?t=%s&cat=%s&extended=1%s",
            $host, $apiPath, $searchType, $categoriesQuery, $this->settings->additionalParameters);

        if (!empty($this->settings->apiKey)) {
            $baseUrl .= "&apikey=" . $this->settings->apiKey;
        }

        if ($this->getPageSize() === 0)
        {
            yield new HttpRequest($baseUrl . $parameters, (string) HttpAccept::rss());
        } else {
            for($page = 0; $page < $this->maxPages; $page++) {
                $url = sprintf("%s&offset=%d&limit=%d%s", $baseUrl, $page * $this->getPageSize(), $this->getPageSize(), $parameters);
                yield new HttpRequest($url, (string) HttpAccept::rss());
            }
        }
    }

    public function getSearchRequests(SearchCriteriaBase $searchCriteria): IndexerPageableRequestChain
    {
        $pageableRequests = new IndexerPageableRequestChain();
        
        //TODO: Check if supports search
        $query = str_replace(' ', '+', (string) $searchCriteria);

        $pageableRequests->add($this->getPagedRequests("search", sprintf("&q=%s", $query)));

        return $pageableRequests;
    }
}
