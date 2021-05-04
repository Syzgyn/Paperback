<?php

namespace App\Libraries\Indexers\Newznab;

use App\Libraries\Http\HttpAccept;
use App\Libraries\Http\HttpRequest;
use App\Libraries\Indexers\IndexerRequestGeneratorInterface;
use App\Libraries\Indexers\IndexerPageableRequestChain;

class NewznabRequestGenerator implements IndexerRequestGeneratorInterface
{
    protected $maxPages = 30;
    protected $pageSize = 100;

    public function __construct(public NewznabSettings $settings)
    {
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

        if ($this->pageSize === 0)
        {
            yield new HttpRequest($baseUrl . $parameters, HttpAccept::rss());
        } else {
            for($page = 0; $page < $this->maxPages; $page++) {
                $url = sprintf("%s&offset=%d&limit=%d%s", $baseUrl, $page * $this->pageSize, $this->pageSize, $parameters);
                yield new HttpRequest($url, HttpAccept::rss());
            }
        }
    }
}
