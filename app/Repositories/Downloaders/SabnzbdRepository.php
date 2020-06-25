<?php

namespace App\Repositories\Downloaders;

use GuzzleHttp\Client;

use App\Models\Downloaders\Usenet\Sabnzbd;

class SabnzbdRepository
{
    protected $client;
    protected $apikey;

    public function __construct(Sabnzbd $downloader)
    {
        $settings = $downloader->settings;
        $uriParts = explode('/', $settings->url);
        if (isset($settings->port)) {
            $uriParts[0] .= ':' . $settings->port;
        }

        $uriParts[] = $downloader::URL_ENDPOINT_BASE;

        $uri = implode('/', $uriParts);

        $this->client = new Client([
            'base_uri' => $uri,
        ]);
        $this->apikey = $settings->apikey;
    }

    protected function makeRequest($mode, $queryParams = [], $requestParams = [])
    {
        $queryParams['apikey'] = $this->apikey;
        $queryParams['output'] = 'json';
        $queryParams['mode'] = $mode;

        $requestParams['query'] = $queryParams;

        try {
            $response = $this->client->request('GET', '', $requestParams);
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
            return json_decode($response, true);
        }

        return [];
    }

    public function test()
    {
        $results = $this->makeRequest(
            'get_cats',
            [],
            [
                'timeout' => 10,
            ]
        );

        if (isset($results['error'])) {
            return ['result' => false, 'error' => $results['error']];
        }

        return ['result' => true];
    }

    public function getCats()
    {
        return $this->makeRequest('get_cats');
    }

    public function addUrl($link)
    {
        return $this->makeRequest('addurl', ['name' => $link]);
    }

    public function history($params = [])
    {
        return $this->makeRequest('history', $params);
    }

    public function queue($params = [])
    {
        return $this->makeRequest('queue', $params);
    }

    public function getDownloadStatus($nzoId)
    {
        $queue = $this->queue();

        foreach ($queue['queue']['slots'] as $slot) {
            if ($slot['nzo_id'] == $nzoId) {
                return $slot;
            }
        }

        $history = $this->history();

        foreach ($history['history']['slots'] as $slot) {
            if ($slot['nzo_id'] == $nzoId) {
                return $slot;
            }
        }

        return false;
    }
}
