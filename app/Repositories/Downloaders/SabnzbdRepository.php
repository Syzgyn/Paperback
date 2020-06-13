<?php

namespace App\Repositories\Downloaders;

use GuzzleHttp\Client;

use App\Downloaders\Usenet\Sabnzbd;

class SabnzbdRepository
{
    protected $client;
    protected $apikey;

    public function __construct(Sabnzbd $downloader)
    {
        $this->client = new Client([
            'base_uri' => $downloader->settings['host'] . ':' . $downloader->settings['port'] . $downloader::URL_ENDPOINT_BASE,
        ]);
        $this->apikey = $downloader->settings['apikey'];
    }

    protected function makeRequest($mode, $params = [])
    {
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
            return json_decode($response, true);
        }

        return [];
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

    public function getDownloadStatus($nzo_id)
    {
        $queue = $this->queue();

        foreach ($queue->slots as $slot) {
            if ($slot->nzo_id == $nzo_id) {
                return $slot;
            }
        }

        $history = $this->history();

        foreach ($history->slots as $slot) {
            if ($slot->nzo_id == $nzo_id) {
                return $slot;
            }
        }

        return [];
    }
}
