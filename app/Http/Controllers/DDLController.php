<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Goutte\Client;
use Symfony\Component\DomCrawler\Crawler;

class DDLController extends Controller
{
    public function index(Request $request)
    {
        $results = [];
        $client = new Client();
        $crawler = $client->request('GET', 'http://getcomics.info/?s=planetary');

        $statusCode = $client->getResponse()->getStatusCode();
        if ($statusCode !== 200) {
            return [];
        }

        $crawler->filter('article')->each(function($node) use (&$results) {
            $output = [
                'multiple' => false,
            ];

            $id = $node->attr('id');
            $output['id'] = substr($id, strpos($id, '-') + 1);
            $output['link'] = $node->filter('a')->attr('href');
            $title = $node->filter('h1.post-title')->text();
            $title = preg_replace('/\x{2013}/u', '-', $title);
            $output['originalTitle'] = $title;

            preg_match('/#(?<issues>\d+ - \d+)/', $title, $issuesMatch);

            if (isset($issuesMatch['issues'])) {
                $output['issues'] = $issuesMatch['issues'];
                $output['multiple'] = true;
                $title = preg_replace('/ ?#\d+ - \d+/', '', $title);
            }

            $info = $node->filter('p[style*="text-align: center"]')->text();
            preg_match('/Year :\ ?(?<year>\d+(?:-\d+)?) \| Size : (?<size>[\d\.]+ .B)/', $info, $infoMatch);

            $output['year'] = $infoMatch['year'];
            $output['size'] = $infoMatch['size'];

            if ($output['multiple'] && strpos($output['year'], '-') !== -1) {
                $title = preg_replace('/\(' . $output['year'] . '\)/', '', $title);
            }

            $output['title'] = trim($title);

            $date = $node->filter('time')->attr('datetime');
            $output['date'] = $date;


            $results[] = $output;
        });

        $last_page = $crawler->filter('ul.page-numbers>li>a')->last()->text(1);
        dump($results);
    }

    public function page(Request $request)
    {
        $client = new Client();
        $crawler = $client->request('GET',  'https://getcomics.info/dc/planetary-001-027-extras-free-download/');

        $title = $crawler->filter('h1.post-title')->text();
        $title = preg_replace('/\x{2013}/u', '-', $title);
        dump($title);

        $crawler->filter('p[style*="text-align: center"]')->each(function($node) use (&$output) {
            preg_match('/Year :\ ?(?<year>\d+(?:-\d+)?) \| Size : (?<size>[\d\.]+ .B)/', $node->text(), $infoMatch);
            if (!isset($output['year']) && isset($infoMatch['year'])) {
                $output['year'] = $infoMatch['year'];
                $output['size'] = $infoMatch['size'];
            }
        });

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

                dump($url);

                break;
            }
        }
    }

    public function short()
    {
        /*
        $client = new Client();
        $crawler = $client->request('GET', 'http://sh.st/faBW5');
        dump($crawler);
        */

        $ch = \curl_init();
        \curl_setopt($ch, CURLOPT_URL, 'http://sh.st/faBW5');
        \curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $output = \curl_exec($ch);
        \curl_close($ch);
        dump($output);
        return;

        $c = new \GuzzleHttp\Client();
        //$output = $c->request('GET', 'http://sh.st/faBW5');
        $output = $c->request('GET', 'http://sh.st/aqOvW', ['timeout' => 10]);
        //$output = $c->request('GET', 'http://google.com');
        dump($output->getBody());
    }
}
