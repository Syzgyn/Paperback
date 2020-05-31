<?php

namespace App\Repositories;

use GuzzleHttp\Client;

use App\Indexers\Newznab;
use App\Http\Resources\NewznabCollection;

class NewznabRepository
{
    const CATEGORY = 7030;

    protected $client;
    protected $apikey;

    public function __construct(Newznab $indexer) {
        $this->client = new Client([
            'base_uri' => $indexer->settings['url'] . "/api/",
        ]);
        $this->apikey = $indexer->settings['apikey'];
    }

    public function search(String $query, Int $offset = 0) {
        $params = [
            'apikey' => $this->apikey,
            'o' => 'xml', //Sadly XML appears to be more consistent amongst indexers than JSON
            'cat' => self::CATEGORY,
            't' => 'search',
            'q' => urldecode($query),
            'offset' => $offset,
        ];

        $results = $this->makeRequest('', $params);
        $items = $results['channel']['item'];

        //If there's only one result, enclose it.
        if (isset($items['title'])) {
            $items = [$items];
        }

        return NewznabCollection::make($items)->resolve();
    }

    protected function makeRequest($url, $params = []) {
		try {
			$response = $this->client->request('GET', '', ['query' => $params]);
		} catch (\Exception $e) {
            return [];
		}

		return $this->responseHandler($response->getBody()->getContents());
    }

	protected function responseHandler($response)
	{
		if ($response) {
            $xml = simplexml_load_string($response);
            $json = json_encode($xml);
            return json_decode($json,TRUE);
		}
		
		return [];
	}
}

