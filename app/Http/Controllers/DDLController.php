<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Goutte\Client;
use Symfony\Component\DomCrawler\Crawler;

class DDLController extends Controller
{
    public function index(Request $request)
    {

        $repo = new \App\Repositories\Indexers\GetComicsRepository();
        $results = $repo->search("Locke Key Welcome to Lovecraft");
        dd($results);
        $results = [];
        $client = new Client();
        $crawler = $client->request('GET', 'http://getcomics.info/?s=Locke++Key+Welcome+to+Lovecraft');

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

    public function download()
    {
        $td = new \App\Models\TrackedDownload;
        $td->fill([
            'comic_id' => 7506, 
            'issue_id' => '175227', 
            'protocol' => 'ddl', 
            'guid' => 'abc1234', 
        ]);
        $td->url = 'http://speedtest-ny.turnkeyinternet.net/1000mb.bin';
        \App\Jobs\DownloadFile::dispatchNow($td);
        exit;
        //output buffer
        ob_start();

        //create javascript progress bar
        echo '<html><head>
            <script type="text/javascript">
            function updateProgress(percentage) {
                document.getElementById(\'progress\').value = percentage;
            }
        </script></head><body>

            <progress id="prog" value="0" max="100.0"></progress>
            ';

        //initilize progress bar
        ob_flush();
        flush();

        //save progress to variable instead of a file
        $targetFile = fopen( '/mnt/nfs/media/the-magicians.zip', 'w' );
        $ch = curl_init( 'http://elv.comicfiles.ru/Others/Boom%20Studios/The%20Magicians/The%20Magicians%20001-005%20%282019-2020%29.zip');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt( $ch, CURLOPT_NOPROGRESS, false);
        curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt( $ch, CURLOPT_PROGRESSFUNCTION, [$this, 'progressCallback'] );
        curl_setopt( $ch, CURLOPT_FILE, $targetFile );
        curl_exec( $ch );
        fclose( $targetFile );


        //if we get here, the download has completed
        echo "Done";

        //flush just to be sure
        ob_flush();
        flush();
    }

    //must add $resource to the function after a newer php version. Previous comments states php 5.5
    public function progressCallback( $resource, $download_size, $downloaded_size, $upload_size, $uploaded_size )
    {
        static $previousProgress = 0;

        if ( $download_size == 0 ) {
            $progress = 0;
        } else {
            $progress = round( $downloaded_size * 100 / $download_size );
        }

        if ( $progress > $previousProgress)
        {
            $previousProgress = $progress;
        }
        //update javacsript progress bar to show download progress
        echo '<script>document.getElementById(\'prog\').value = '.$progress.';</script>';

        ob_flush();
        flush();
        //sleep(1); // just to see effect
    }

}
