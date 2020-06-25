<?php

namespace App\Repositories\Indexers;

use GuzzleHttp\Client;

use App\Models\Indexers\Newznab;

class NewznabRepository
{
    const CATEGORY = 7000;

    protected $indexer;
    protected $client;
    protected $apikey;

    public function __construct(Newznab $indexer)
    {
        $this->indexer = $indexer;

        $this->client = new Client([
            'base_uri' => $indexer->settings->url . $indexer::URL_ENDPOINT_BASE,
        ]);
        $this->apikey = $indexer->settings->apikey;
    }

    public function search(String $query, Int $offset = 0)
    {
        $params = [
            'cat' => self::CATEGORY,
            't' => 'search',
            'q' => urldecode($query),
            'offset' => $offset,
        ];

        $results = $this->makeRequest('', $params);

        if (isset($results['error'])) {
            //TODO: Error handling
            return [];
        }

        $items = $results['channel']['item'];

        //If there's only one result, enclose it.
        if (isset($items['title'])) {
            $items = [$items];
        }

        return $items;
    }

    public function test()
    {
        $results = $this->makeRequest(
            '',
            [
                't' => 'search',
                'limit' => 1,
            ],
            [
                'timeout' => 10,
            ]
        );

        if (isset($results['error']) || (isset($results['@attributes']['code']) && $results['@attributes']['code'] == 100)) {
            return ['result' => false];
        }

        return ['result' => true];
    }

    protected function makeRequest($url = '', $queryParams = [], $requestParams = [])
    {
        $queryParams['apikey'] = $this->apikey;
        //Sadly XML appears to be more consistent amongst indexers than JSON
        $queryParams['o'] = 'xml';

        $requestParams['query'] = $queryParams;

        try {
            $response = $this->client->request('GET', $url, $requestParams);
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            //Request timed out
            return ['error' => true, 'type' => 'connection', 'message' => $e->getMessage()];
        } catch (\Exception $e) {
            return ['error' => true, 'type' => 'unknown', 'message' => $e->getMessage()];
        }

        return $this->responseHandler($response->getBody()->getContents());
    }

    protected function responseHandler($response)
    {
        if ($response) {
            //Convert the XML to JSON, then back to objects to make it easier to deal with.
            $xml = simplexml_load_string($response);
            $json = json_encode($xml);

            return json_decode($json, true);
        }

        return [];
    }
}
