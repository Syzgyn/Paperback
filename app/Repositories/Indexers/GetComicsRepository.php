<?php

namespace App\Repositories\Indexers;

use Goutte\Client; 
use Symfony\Component\DomCrawler\Crawler;

use App\Models\Indexers\GetComics;

class GetComicsRepository
{
    const BASE_URL = 'https://getcomics.info';
    const RESULTS_PER_PAGE = 12;

    protected $client;

    public function __construct()
    {
        $this->client = new Client();
    }

    public function search(String $query, Int $offset = 0)
    {
        $url = self::BASE_URL;
        $page = floor($offset / self::RESULTS_PER_PAGE) + 1;

        if ($page > 1) {
            $url .= "/page/$page/";
        }

        $url .= '?s=' . urlencode($query);

        $results = $this->getSearchResults($url);
        $parser = resolve('ParserService');

        return $parser->filterResults($results, $query);

/*
        return array_filter($results, function($result) use ($parser, $query) {
            return $parser->titleMatchesQuery($result['title'], $query);
        });
*/
    }

    protected function getSearchResults(String $url)
    {
        $results = [];
        $crawler = $this->client->request('GET', $url);

        $statusCode = $this->client->getResponse()->getStatusCode();
        if ($statusCode !== 200) {
            return [];
        }

        // Get results
        $crawler->filter('article')->each(function($node) use (&$results) {
            $output = [
                'multiple' => false,
            ];

            $id = $node->attr('id');
            $output['id'] = substr($id, strpos($id, '-') + 1);
            $output['link'] = $node->filter('a')->attr('href');

            //Replace unicode dashes with regular ones
            $title = $node->filter('h1.post-title')->text();
            $title = preg_replace('/\x{2013}/u', '-', $title);
            $output['originalTitle'] = $title;

            preg_match('/#(?<issues>\d+ - \d+)/', $title, $issuesMatch);

            // Result is for a range of issues
            if (isset($issuesMatch['issues'])) {
                $output['issues'] = $issuesMatch['issues'];
                $output['multiple'] = true;
                $title = preg_replace('/ ?#\d+ - \d+/', '', $title);
            }

            // Look for year and size
            $info = $node->filter('p[style*="text-align: center"]')->text();
            preg_match('/Year :\ ?(?<year>\d+(?:-\d+)?) \| Size : (?<size>[\d\.]+ .B)/', $info, $infoMatch);

            $output['year'] = $infoMatch['year'];
            $output['size'] = $infoMatch['size'];

            // For range of issues, remove years from title
            if ($output['multiple'] && strpos($output['year'], '-') !== -1) {
                $title = preg_replace('/\(' . $output['year'] . '\)/', '', $title);
            }

            $output['title'] = trim($title);

            $date = $node->filter('time')->attr('datetime');
            $output['date'] = $date;

            $results[] = $output;
        });

        //Get number of pages
        //$last_page = $crawler->filter('ul.page-numbers>li>a')->last()->text(1);

        return $results;
    }

    public function getDownloadLinkFromPage(string $url)
    {
        $crawler = $this->client->request('GET', $url); 

        /*
        // Get more info from the download page
        $title = $crawler->filter('h1.post-title')->text();
        $title = preg_replace('/\x{2013}/u', '-', $title);

        $crawler->filter('p[style*="text-align: center"]')->each(function($node) use (&$output) {
            preg_match('/Year :\ ?(?<year>\d+(?:-\d+)?) \| Size : (?<size>[\d\.]+ .B)/', $node->text(), $infoMatch);
            if (!isset($output['year']) && isset($infoMatch['year'])) {
                $output['year'] = $infoMatch['year'];
                $output['size'] = $infoMatch['size'];
            }
        });
        */

        foreach ($crawler->filter('div.aio-pulse a') as $node) {
            if ($node->nodeValue == "Download Now") {
                $url = $node->getAttribute('href');
                $urlData = parse_url($url);

                if ($urlData['host'] == 'sh.st') {

                    $ch = \curl_init();
                    \curl_setopt($ch, CURLOPT_URL, $url);
                    \curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $output = \curl_exec($ch);
                    \curl_close($ch);

                    $urlCrawler = new Crawler($output);
                    $url = $urlCrawler->filter('a')->attr('href');
                }

                return $url;
            }
        }
    }

    public function test()
    {
        $file_headers = @get_headers(self::BASE_URL);
        if(!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found') {
            $exists = false;
        } else {
            $exists = true;
        }

        return json_encode(['result' => $exists]);
    }
}

