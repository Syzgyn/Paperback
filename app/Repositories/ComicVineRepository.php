<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;
use App\Http\Resources\ComicVine\Issue;
use App\Http\Resources\ComicVine\Volume;
use App\Http\Resources\ComicVine\IssueCollection;
use App\Http\Resources\ComicVine\VolumeCollection;
use bandwidthThrottle\tokenBucket\Rate;
use bandwidthThrottle\tokenBucket\TokenBucket;
use bandwidthThrottle\tokenBucket\BlockingConsumer;
use bandwidthThrottle\tokenBucket\storage\FileStorage;

class ComicVineRepository
{
    const VOLUME_PREFIX = '4050-';
    const ISSUE_PREFIX = '4000-';

    const CACHE_PREFIX = '.comicvine';
    const CACHE_TIME = 86400; //1 Day

    protected $client;
    protected $apikey;
    protected $bypassCache;
    protected $consumer;

    public function __construct()
    {
        $this->client = resolve("Guzzle\ComicVine");
        $settings = resolve('AppSettings');
        $this->apikey = $settings->get('general', 'comicvine_apikey');
        $this->bypassCache = $settings->get('general', 'bypass_cache');

        $storage  = new FileStorage(storage_path('app/api.bucket'));
        $rate     = new Rate(1, Rate::SECOND);
        $bucket   = new TokenBucket(1, $rate, $storage);
        $this->consumer = new BlockingConsumer($bucket);
        $bucket->bootstrap(1);
    }

    public function volumes($name)
    {
        $volumes = $this->makeRequest('volumes', "volumes.$name", ['filter' => "name:$name"]);

        $this->sortResults($volumes->results, $name);

        return VolumeCollection::make($volumes->results)->resolve();
    }

    public function volumesWithYear($name, $year = null)
    {
        $data = resolve('ParserService')->getComicInfoFromString($name);
        if (!$year) {
            $year = $data['year'];
        }

        $name = $data['name'];


        $volumes = $this->makeRequest('volumes', "volumes.$name.$year", ['filter' => "name:$name,start_year:$year"]);

        $this->sortResults($volumes->results, $name, $year);


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

    public function searchVolumes($query)
    {
        $volumes = $this->makeRequest('volumes', "volumes.$query", ['filter' => "name:$query"]);

        if (empty($volumes->results)) {
            $volumes = $this->makeRequest('search', "search.$query", [
                'resources' => 'volume',
                'query' => $query,
            ]);
        }

        $this->sortResults($volumes->results, $query);

        return VolumeCollection::make($volumes->results)->resolve();
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
            //Rate limiting to 1 call/sec
            $this->consumer->consume(1);
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

    protected function sortResults(&$results, $name, $year = null)
    {
        if (!$year) {
            $data = resolve('ParserService')->getComicInfoFromString($name);
            $name = $data['name'];
            $year = $data['year'];
        }
        usort($results, function($a, $b) use ($name, $year) {
            //dump($a->name == $name, $a->name, $name);
            if (strtolower($a->name) == strtolower($name) && ($year == null || $a->start_year == $year)) {
                return -1;
            }

            if (strtolower($b->name) == strtolower($name) && ($year == null || $b->start_year == $year)) {
                return 1;
            }

            return 0;
        });
    }
}
