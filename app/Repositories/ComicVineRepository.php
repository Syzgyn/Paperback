<?php

namespace App\Repositories;

use App\Http\Resources\ComicVine\Volume;
use App\Http\Resources\ComicVine\VolumeCollection;
use App\Http\Resources\ComicVine\Issue;
use App\Http\Resources\ComicVine\IssueCollection;

class ComicVineRepository
{
    const VOLUME_PREFIX = '4050-';
    const ISSUE_PREFIX = '4000-';

    protected $client;

    public function __construct() {
        $this->client = resolve("Guzzle\ComicVine");
    }

    public function volumes($name) {
        $volumes = $this->makeRequest("volumes", ['filter' => "name:$name"]);
        return VolumeCollection::make($volumes->results)->resolve();
    }

    public function volume($cvid) {
        $volume = $this->makeRequest("volume/" . self::VOLUME_PREFIX . $cvid);
        return Volume::make($volume->results)->resolve();
    }

    public function volumeIssues($cvid) {
        $issues = $this->makeRequest("issues", ['filter' => "volume:$cvid"]);
        return IssueCollection::make($issues->results)->resolve();
    }

    public function issue($cvid) {
        $issue = $this->makeRequest("issue/" . self::ISSUE_PREFIX . $cvid);
        return Issue::make($issue->results)->resolve();
    }

    protected function makeRequest($url, $params = []) {
        $params['api_key'] = config("paperback.comicvine_apikey");
        $params['format']  = "json";
		try {
			$response = $this->client->request('GET', $url, ['query' => $params]);
		} catch (\Exception $e) {
            return [];
		}

		return $this->responseHandler($response->getBody()->getContents());
    }

	protected function responseHandler($response)
	{
		if ($response) {
			return json_decode($response);
		}
		
		return [];
	}
}
