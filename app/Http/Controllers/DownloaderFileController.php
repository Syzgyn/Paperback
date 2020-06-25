<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DownloaderFile;
use App\Http\Requests\DownloaderFileRequest;
use App\Http\Resources\DownloaderFileCollection;
use App\Http\Resources\DownloaderFile as DownloaderFileResource;

class DownloaderFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $downloaderFiles = DownloaderFile::all();

        return new DownloaderFileCollection($downloaderFiles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DownloaderFileRequest $request)
    {
        $downloaderFile = DownloaderFile::create($request->validated());

        return new DownloaderFileResource($downloaderFile);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DownloaderFile  $downloaderFile
     * @return \Illuminate\Http\Response
     */
    public function show(DownloaderFile $downloaderFile)
    {
        return new DownloaderFileResource($downloaderFile);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DownloaderFile  $downloaderFile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DownloaderFile $downloaderFile)
    {
        $downloaderFile->fill($request->all());
        $downloaderFile->save();

        return new DownloaderFileResource($downloaderFile);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DownloaderFile  $downloaderFile
     * @return \Illuminate\Http\Response
     */
    public function destroy(DownloaderFile $downloaderFile)
    {
        $downloaderFile->delete();

        return response()->json(['status' => 'OK']);
    }
}
