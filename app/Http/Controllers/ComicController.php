<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use Illuminate\Http\Request;
use App\Http\Resources\ComicCollection;
use App\Http\Resources\Comic as ComicResource;

class ComicController extends Controller
{
    public function __construct()
    {
        $this->comicvine = resolve('ComicVineRepository');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comics = Comic::all();

        return new ComicCollection($comics);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cvid = $request->input('cvid');
        $search = $request->input('search');
        $comic = Comic::createFromCvid($cvid, true, $search);

        return new ComicResource($comic);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Comic  $comic
     * @return \Illuminate\Http\Response
     */
    public function show(Comic $comic)
    {
        return new ComicResource($comic);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Comic  $comic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comic $comic)
    {
        $comic->fill($request->validate([
            'monitored' => 'boolean',
        ]));
        $comic->save();

        return new ComicResource($comic);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comic  $comic
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comic $comic)
    {
        $comic->delete();

        return response()->json(['status' => 'OK']);
    }

    public function search(Request $request)
    {
        $search = $request->input('query');

        return $this->comicvine->searchVolumes($search);
    }

    public function download(Comic $comic)
    {
        resolve('DownloadService')->downloadComic($comic->cvid);
    }

    public function comicvine(Comic $comic)
    {
        $data = resolve('ComicVineRepository')->volume($comic->cvid);
        return redirect($data['url']);
    }

    public function importSearch(Request $request)
    {
        $search = $request->input('query');

        return $this->comicvine->searchVolumes($search);
    }
}
