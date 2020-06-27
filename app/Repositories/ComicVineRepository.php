<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;
use App\Http\Resources\ComicVine\Issue;
use App\Http\Resources\ComicVine\Volume;
use App\Http\Resources\ComicVine\IssueCollection;
use App\Http\Resources\ComicVine\VolumeCollection;

class ComicVineRepository
{
    const VOLUME_PREFIX = '4050-';
    const ISSUE_PREFIX = '4000-';

    const CACHE_PREFIX = '.comicvine';
    const CACHE_TIME = 86400; //1 Day

    protected $client;
    protected $apikey;
    protected $bypassCache;

    public function __construct()
    {
        $this->client = resolve("Guzzle\ComicVine");
        $settings = resolve('AppSettings');
        $this->apikey = $settings->get('general', 'comicvine_apikey');
        $this->bypassCache = $settings->get('general', 'bypass_cache');
    }

    public function volumes($name)
    {
        $volumes = $this->makeRequest('volumes', "volumes.$name", ['filter' => "name:$name"]);

        return VolumeCollection::make($volumes->results)->resolve();
    }

    public function volume($cvid)
    {
        $volume = $this->makeRequest('volume/' . self::VOLUME_PREFIX . $cvid, "volume.$cvid");

        return Volume::make($volume->results)->resolve();
    }

    public function volumeIssues($cvid)
    {
        $issues = $this->makeRequest('issues', "issues.$cvid", ['filter' => "volume:$cvid"]);

        return IssueCollection::make($issues->results)->resolve();
    }

    public function issue($cvid)
    {
        $issue = $this->makeRequest('issue/' . self::ISSUE_PREFIX . $cvid, "issue.$cvid");

        return Issue::make($issue->results)->resolve();
    }

    protected function makeRequest($url, $cacheKey, $params = [])
    {
        if ($this->bypassCache) {
            return $this->getResponse($url, $params);
        }

        return Cache::remember(
            self::CACHE_PREFIX . '.' . $cacheKey,
            self::CACHE_TIME,
            function () use ($url, $params) {
                return $this->getResponse($url, $params);
            }
        );
    }

    protected function getResponse($url, $params = [])
    {
        $params['api_key'] = $this->apikey;
        $params['format'] = 'json';
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
