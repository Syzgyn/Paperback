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
}
