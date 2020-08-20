<?php

namespace App\Repositories\Indexers;

use Goutte\Client;
use Symfony\Component\DomCrawler\Crawler;

class ComicExtraRepository
{
    const BASE_URL = 'https://comicextra.com';
    const COMIC_LIST_FILE = 'app/comicextralist.json';
    const ISSUE_URL_FORMAT = '/%s/chapter-%s/full';

    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    protected function downloadComicList()
    {
        $client = new Client();
        $crawler = $client->request('GET', self::BASE_URL . '/comic-list');
        $statusCode = $client->getResponse()->getStatusCode();
        if ($statusCode !== 200) {
            return false;
        }

        return $crawler->html();
    }

    protected function getComicListData()
    {
        $filePath = storage_path(self::COMIC_LIST_FILE);

        try {
            $content = file_get_contents($filePath);
            $data = json_decode($content, true);
        } catch (\Exception $e) {
            return $this->parseComicListHtml($this->downloadComicList());
        }

        $date = $data['date'];

        if ($date < date('Y-m-d')) {
            return $this->parseComicListHtml($this->downloadComicList());
        }

        return $data['comics'];
    }

    protected function parseComicListHtml(string $html)
    {
        $crawler = new Crawler($html);
        $comics = [];

        $crawler->filter('.series-col li')->each(function ($node) use (&$comics) {
            $output = [
                'url' => $node->filter('a')->attr('href'),
                'title' => $node->text(),
            ];

            $comics[] = $output;
        });

        file_put_contents(storage_path(self::COMIC_LIST_FILE), json_encode([
            'date' => date('Y-m-d'),
            'comics' => $comics,
        ]));

        return $comics;
    }

    public function getBestMatchingComic(string $comic)
    {
        $comics = $this->getComicListData();
        $parser = resolve('ParserService');

        return $parser->filterResults($comics, $comic)[0];
    }

    public function search(string $comic, int $issueNum)
    {
        $comicData = $this->getBestMatchingComic($comic);
        $comicName = $comicData['title'];
        $url = $this->doesIssueExist($comicData['url'], $issueNum);
        if ($url) {
            return [
                [
                    'guid' => "comicextra-$comicName-$issueNum",
                    'url' => $url,
                    'displayTitle' => "$comicName - #$issueNum",
                    'title' => "$comicName - #$issueNum",
                    'date' => date('Y-m-d'),
                    'ago' => 'now',
                    'size' => 'Unknown',
                ],
            ];
        }

        return [];
    }

    protected function doesIssueExist(string $url, $issueNum)
    {
        $issueUrl = $this->getIssueUrl($url, $issueNum);
        $crawler = $this->client->request('HEAD', $issueUrl);
        $statusCode = $this->client->getResponse()->getStatusCode();
        if ($statusCode !== 200) {
            //Some oneshot comics are listed as 'full' rather than issue 1
            if ($issueNum === 1) {
                return $this->doesIssueExist($url, 'full');
            }

            return false;
        }

        return $issueUrl;
    }

    protected function getIssueUrl(string $comicUrl, string $issueNum)
    {
        $parts = explode('/', $comicUrl);
        $comicPart = array_pop($parts);

        return self::BASE_URL . sprintf(self::ISSUE_URL_FORMAT, $comicPart, $issueNum);
    }

    public function test()
    {
        $file_headers = @get_headers(self::BASE_URL);
        if (! $file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found') {
            $exists = false;
        } else {
            $exists = true;
        }

        return json_encode(['result' => $exists]);
    }

    public function getIssueImageUrls(string $url)
    {
        $crawler = $this->client->request('GET', $url);
        $statusCode = $this->client->getResponse()->getStatusCode();
        if ($statusCode !== 200) {
            return false;
        }

        return $crawler->filter('img.chapter_img')->extract(['src']);
    }
}
