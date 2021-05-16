<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;
use App\Http\Resources\ComicVine\Issue;
use bandwidthThrottle\tokenBucket\Rate;
use App\Http\Resources\ComicVine\Volume;
use bandwidthThrottle\tokenBucket\TokenBucket;
use App\Http\Resources\ComicVine\IssueCollection;
use App\Http\Resources\ComicVine\VolumeCollection;
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

        $storage = new FileStorage(storage_path('app/api.bucket'));
        $rate = new Rate(1, Rate::SECOND);
        $bucket = new TokenBucket(1, $rate, $storage);
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
        $data = resolve('OldParserService')->getComicInfoFromString($name);
        if (! $year) {
            $year = $data['year'];
        }

        $name = $data['name'];

        $volumes = $this->makeRequest('volumes', "volumes.$name.$year", ['filter' => "name:$name,start_year:$year"]);

        $this->sortResults($volumes->results, $name, $year);

        return VolumeCollection::make($volumes->results)->resolve();
    }

    public function volume($cvid): array
    {
        $volume = $this->makeRequest('volume/' . self::VOLUME_PREFIX . $cvid, "volume.$cvid");

        return Volume::make($volume->results)->resolve();
    }

    public function volumeIssues($cvid, $offset = 0): array
    {
        $this->bypassCache = true;
        $issues = $this->makeRequest('issues', "issues.$cvid.$offset", ['filter' => "volume:$cvid"]);

        while (count($issues->results) < $issues->number_of_total_results) {
            $offset+=100;
            $moreIssues = $this->makeRequest('issues', "issues.$cvid.$offset", ['filter' => "volume:$cvid", 'offset' => $offset]);

            if ($moreIssues->error !== "OK" || $moreIssues->number_of_page_results === 0) {
                break;
            }
            $issues->results = array_merge($issues->results, $moreIssues->results);
        }

        return IssueCollection::make($issues->results)->resolve();
    }

    public function issue($cvid)
    {
        $issue = $this->makeRequest('issue/' . self::ISSUE_PREFIX . $cvid, "issue.$cvid");

        return Issue::make($issue->results)->resolve();
    }

    public function issuesById(Array $cvids)
    {
        asort($cvids);
        $idList = implode('|', $cvids);
        $issues = $this->makeRequest('issues', "issuesById.$idList", ['filter' => "id:$idList"]);

        return IssueCollection::make($issues->results)->resolve();
    }

    public function searchVolumes($query, $includeLastIssue = false): array
    {
        if (preg_match('/^cvid:(\d+)$/', $query, $match)) {
            return [ $this->volume($match[1]) ];
        }

        $volumes = $this->makeRequest('volumes', "volumes.$query." . ($includeLastIssue ? 'true' : 'false'), ['filter' => "name:$query"]);

        if (empty($volumes->results)) {
            $volumes = $this->makeRequest('search', "search.$query", [
                'resources' => 'volume',
                'query' => $query,
            ]);
        }

        $issueIds = $this->addLastIssueToVolumes($volumes);

        $this->sortResults($volumes->results, $query);

        return VolumeCollection::make($volumes->results)->resolve();
    }

    protected function makeRequest($url, $cacheKey = null, $params = [])
    {
        if ($this->bypassCache || $cacheKey === null) {
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
        if (! $year) {
            $data = resolve('OldParserService')->getComicInfoFromString($name);
            $name = $data['name'];
            $year = $data['year'];
        }
        usort($results, function ($a, $b) use ($name, $year) {
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

    protected function addLastIssueToVolumes(&$volumes)
    {
        if ($volumes->number_of_page_results === 0) {
            return;
        }

        $issueIds = array_map(fn($resource) => $resource->last_issue->id, $volumes->results);

        $issues = $this->issuesById($issueIds);

        array_walk($volumes->results, function(&$vol, $key, $issues) {
            $i = array_search($vol->last_issue->id, array_column($issues, 'cvid'));
            if ($i !== false) {
                $vol->last_issue_resource = $issues[$i];
            }
        }, $issues);
    }
}
