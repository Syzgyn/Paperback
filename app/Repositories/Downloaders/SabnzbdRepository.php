<?php

namespace App\Repositories\Downloaders;

use GuzzleHttp\Client;

use App\Downloaders\Usenet\Sabnzbd;
use App\Http\Resources\Downloaders;

class SabnzbdRepository
{
    protected $client;
    protected $apikey;

    public  function __construct(Sabnzbd $downloader) {
        $this->client = new Client([
            'base_uri' => $downloader->settings['host'] . ':' . $downloader->settings['port'] . $downloader::URL_ENDPOINT_BASE,
        ]);
        $this->apikey = $downloader->settings['apikey'];
    }

    protected function makeRequest($mode, $params = []) {
        $params['apikey'] = $this->apikey;
        $params['output'] = 'json';
        $params['mode'] = $mode;

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
            return json_decode($response,TRUE);
		}
		
		return [];
	}

    public function getCats() {
        return $this->makeRequest('get_cats');
    }

    public function addUrl($link) {
        return $this->makeRequest('addurl', ['name' => $link]);
    }
}
