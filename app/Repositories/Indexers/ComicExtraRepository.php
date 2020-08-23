<?php

namespace App\Repositories\Indexers;

use Goutte\Client;
use Symfony\Component\DomCrawler\Crawler;

class ComicExtraRepository
{
    const BASE_URL = 'https://comicextra.com';
    //const COMIC_LIST_FILE = 'app/comicextralist.json';
    const ISSUE_URL_FORMAT = '/%s/chapter-%s/full';
    const ISSUES_PER_PAGE = 50;

    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    /*
    protected function downloadComicList()
    {
        $crawler = $this->client->request('GET', self::BASE_URL . '/comic-list');
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

    public function oldSearch(string $comic, int $issueNum)
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
    */

    public function search(string $comic, int $issueNum, int $comicYear)
    {
        $parser = resolve('ParserService');
        $results = $this->getSearchResults($comic);

        if (! count($results)) {
            return [];
        }

        $bestMatch = $parser->filterResults($results, "$comic $comicYear")[0];
        
        //Check if the expected issue URL exists
        $url = $this->doesIssueExist($bestMatch['url'], $issueNum);
        if ($url) {
            return [$this->generateResult($comic, $issueNum, $url, $bestMatch['id'])];
        }

        //No match, this usually means there's a custom title as part of the url
        //Look through the listed issues and return the best match
        $issues = $this->getMatchingIssues($bestMatch['url'], $issueNum);

        if (count($issues) == 0) {
            return [];
        }

        $output = [];
        foreach($issues as $issue) {
            $output[] = $this->generateResult(
                $comic,
                $issueNum,
                $issue['url'],
                $bestMatch['id'],
                $issue['title'],
                date('Y-m-d', strtotime($issue['date'])),
            );
        }

        return $output;
    }

    protected function generateResult(string $comicName, int $issueNum, string $url, int $id = null, string $title = null, string $date = null)
    {
        if (! $id) {
            $id = "$comicName-$issueNum";
        }

        if (! $title) {
            $title = "$comicName - #$issueNum";
        }

        if (! $date) {
            $date = date('Y-m-d');
        }

        $datetime1 = new \DateTime($date);
        $datetime2 = new \DateTime();
        $interval = $datetime1->diff($datetime2);

        $ago = $interval->format('%a days');

        return [
            'guid' => "comicextra-$id",
            'url' => $url,
            'displayTitle' => $title,
            'title' => $title,
            'date' => $date,
            'ago' => $ago,
            'size' => 'Unknown',
        ];
    }

    protected function getSearchResults(string $comic)
    {
        $url = self::BASE_URL . '/comic-search?key=' . urlencode($comic);

        $crawler = $this->client->request('GET', $url);
        $statusCode = $this->client->getResponse()->getStatusCode();
        if ($statusCode !== 200) {
            return false;
        }

        $results = [];

        $crawler->filter('div.cartoon-box')->each(function($node) use (&$results) {
            $link = $node->filter('h3 a');
            $idString = $node->filter('img')->attr('src');
            preg_match('/(\d+)\.jpg/', $idString, $matches);

            $results[] = [
                'id' => isset($matches[1]) ? $matches[1] : null,
                'url' => $link->attr('href'),
                'title' => $link->text(),
                'year' => $node->filter('div.detail')->last()->text(),
            ];
        });

        return $results;
    }

    protected function getMatchingIssues(string $url, int $issueNum)
    {
        //We're only using the first page here.  I haven't found a comic with custom issue urls that has more than 50 issues yet
        //If that changes, we can search more pages here
        $crawler = $this->client->request('GET', $url);
        $results = [];
        
        $crawler->filter('.episode-list td a')->each(function($node) use (&$results, $issueNum) {
            if (preg_match("/\#{$issueNum}_/", $node->text())) {
                $results[] = [
                    'url' => $node->attr('href'),
                    'title' => str_replace('_', ' ', $node->text()),
                    'date' => $node->parents()->nextAll()->text(),
                ];
            }
        });

        return $results;
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
