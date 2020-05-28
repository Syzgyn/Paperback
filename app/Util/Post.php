<?php
namespace App\Util;

use GuzzleHttp\Client;

class Post
{
	protected $client;

	public function __construct(Client $client)
	{
		$this->client = $client;
	}

	public function all()
	{
		return $this->endpointRequest('');
	}

	public function findById($id)
	{
		return $this->endpointRequest('/dummy/post/'.$id);
	}

	public function endpointRequest($url, $params = [])
	{
		$params['apikey'] = "4a010133f6ecb847e689b30719a09491";
		$params['t'] = "search";
		$params['q'] = "transmetropolitan";
		$params['o'] = "json";
		
		try {
			$response = $this->client->request('GET', $url, ['query' => $params]);
		} catch (\Exception $e) {
            return [];
		}

		return $this->response_handler($response->getBody()->getContents());
	}

	public function response_handler($response)
	{
		if ($response) {
			return json_decode($response);
		}
		
		return [];
	}
}
