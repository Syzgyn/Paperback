<?php

namespace App\Http\Controllers;

use App\Models\Downloader;
use Illuminate\Http\Request;
use App\Dto\SearchResultCollection;
use App\Http\Requests\DownloaderRequest;
use App\Http\Resources\DownloaderCollection;
use App\Http\Resources\Downloader as DownloaderResource;

class DownloaderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $downloaders = Downloader::all();

        return new DownloaderCollection($downloaders);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DownloaderRequest $request)
    {
        $downloader = Downloader::createChild($request->validated());

        return new DownloaderResource($downloader);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Downloader $downloader
     * @return \Illuminate\Http\Response
     */
    public function show(Downloader $downloader)
    {
        return new DownloaderResource($downloader);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Downloader $downloader
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Downloader $downloader)
    {
        $downloader->fill($request->all());
        $downloader->save();

        return new DownloaderResource($downloader);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Downloader $downloader
     * @return \Illuminate\Http\Response
     */
    public function destroy(Downloader $downloader)
    {
        $downloader->delete();

        return response()->json(['status' => 'OK']);
    }

    public function test(DownloaderRequest $request)
    {
        $downloader = Downloader::createChild($request->validated(), false);
        $result = $downloader->test();

        return response()->json($result);
    }

    public function schema(Request $request, $name = null)
    {
        if ($name) {
            if (! array_key_exists($name, Downloader::DOWNLOADER_TYPES)) {
                return response()->json(['error' => "No downloader found of type: '$name'"], 404);
            }

            $className = Downloader::DOWNLOADER_TYPES[$name];
            $downloader = new $className();

            return $downloader->schema;
        }

        return Downloader::buildSchemas();
    }

    public function status(Request $request, $downloadId)
    {
        $downloaders = Downloader::all();

        foreach ($downloaders as $downloader) {
            $result = $downloader->getDownloadStatus($downloadId);

            if (! $result) {
                continue;
            }

            return $result;
        }

        return [];
    }

    public function testdownload(Request $request)
    {
        $data = '{"data":[{"guid":"6019043dbabfd6e6fd4cb130896f5a0d","displayTitle":"Big Hero 6 04 Of 5 2009 Noads Link-DCP","title":"Big.Hero.6.04.Of.5.2009.Noads.Link-DCP","date":"Sat, 19 Jul 2014 03:29:51 +0000","ago":"2173 days","size":"23.41 MB","raw_size":"24549000","url":"https:\/\/api.nzbgeek.info\/api?t=get&id=6019043dbabfd6e6fd4cb130896f5a0d&apikey=4a010133f6ecb847e689b30719a09491","indexer":"NZBGeek","indexer_id":2,"source":"nzb","issue_id":153023,"comic_id":21876},{"guid":"6019043dbabfd6e6fd4cb130896f5a0d","displayTitle":"Big Hero 6 04 Of 5 2009 Noads Link-DCP","title":"no way - no more hero 03 (2002)","date":"Sat, 19 Jul 2014 03:29:51 +0000","ago":"2173 days","size":"23.41 MB","raw_size":"24549000","url":"https:\/\/api.nzbgeek.info\/api?t=get&id=6019043dbabfd6e6fd4cb130896f5a0d&apikey=4a010133f6ecb847e689b30719a09491","indexer":"NZBGeek","indexer_id":2,"source":"nzb","issue_id":153023,"comic_id":21876},{"guid":"6019043dbabfd6e6fd4cb130896f5a0d","displayTitle":"Big Hero 6 04 Of 5 2009 Noads Link-DCP","title":"No more Hero 02 (2002) cbr","date":"Sat, 19 Jul 2014 03:29:51 +0000","ago":"2173 days","size":"23.41 MB","raw_size":"24549000","url":"https:\/\/api.nzbgeek.info\/api?t=get&id=6019043dbabfd6e6fd4cb130896f5a0d&apikey=4a010133f6ecb847e689b30719a09491","indexer":"NZBGeek","indexer_id":2,"source":"nzb","issue_id":153023,"comic_id":21876},{"guid":"6019043dbabfd6e6fd4cb130896f5a0d","displayTitle":"Big Hero 6 04 Of 5 2009 Noads Link-DCP","title":"No.Way.-.No.Hero.004.2009.Digital.Zone-Empire","date":"Sat, 19 Jul 2014 03:29:51 +0000","ago":"2173 days","size":"23.41 MB","raw_size":"24549000","url":"https:\/\/api.nzbgeek.info\/api?t=get&id=6019043dbabfd6e6fd4cb130896f5a0d&apikey=4a010133f6ecb847e689b30719a09491","indexer":"NZBGeek","indexer_id":2,"source":"nzb","issue_id":153023,"comic_id":21876},{"guid":"de213652283e8c9bd7c46846f0f69a01","displayTitle":"No Hero 004 2009 Digital Zone-Empire","title":"No.Hero.004.2009.Digital.Zone-Empire","date":"Thu, 31 Oct 2013 22:52:21 +0000","ago":"2433 days","size":"52.05 MB","raw_size":"54580000","url":"https:\/\/api.nzbgeek.info\/api?t=get&id=de213652283e8c9bd7c46846f0f69a01&apikey=4a010133f6ecb847e689b30719a09491","indexer":"NZBGeek","indexer_id":2,"source":"nzb","issue_id":153023,"comic_id":21876},{"guid":"de213652283e8c9bd7c46846f0f69a01","displayTitle":"No Hero 004 2009 Digital Zone-Empire","title":"No.Hero.007.2009.Digital.Zone-Empire","date":"Thu, 31 Oct 2013 22:52:21 +0000","ago":"2433 days","size":"52.05 MB","raw_size":"54580000","url":"https:\/\/api.nzbgeek.info\/api?t=get&id=de213652283e8c9bd7c46846f0f69a01&apikey=4a010133f6ecb847e689b30719a09491","indexer":"NZBGeek","indexer_id":2,"source":"nzb","issue_id":153023,"comic_id":21876}]}';

        $json = json_decode($data);
        $collection = SearchResultCollection::fill($json->data);
        $parsed = resolve('ParserService')->setIssue(153023)->parseSearchResults($collection);
        dump($parsed);
    }
}
