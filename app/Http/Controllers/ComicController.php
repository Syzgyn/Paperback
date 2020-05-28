<?php

namespace App\Http\Controllers;

use App\Comic;
use Illuminate\Http\Request;
use App\Http\Resources\Comic as ComicResource;
use App\Repositories\ComicVineRepository;

class ComicController extends Controller
{

    public function __construct()
    {
        $this->comicvine= resolve("ComicVineRepository");
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $comic = new Comic;
        $comic->createFromCvid($cvid, false);

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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comic  $comic
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comic $comic)
    {
        //
    }

    public function search(String $name) {
        return $this->comicvine->volumes($name);
        
    }
}
