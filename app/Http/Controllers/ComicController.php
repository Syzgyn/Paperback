<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use Illuminate\Http\Request;
use App\Http\Requests\ComicRequest;
use App\Http\Requests\BulkComicRequest;
use App\Http\Resources\ComicCollection;
use App\Http\Resources\Comic as ComicResource;
use Illuminate\Support\Facades\Validator;

class ComicController extends Controller
{
    protected $comicvine;
    
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
    public function store(ComicRequest $request)
    {
        $comic = Comic::create($request->validated());
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
        if (request()->query('deleteFiles') === 'true') {
            resolve('FileManager')->removeDir($comic->path);
        }
        $comic->delete();

        return response()->json(['status' => 'OK']);
    }

    public function search(Request $request)
    {
        $search = $request->input('term');

        return $this->comicvine->searchVolumes($search, true);
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

    public function lookup(Request $request)
    {
        if (!$term = $request->input('term', null)) {
            return [];
        }
        
        return $this->comicvine->searchVolumes($term);
    }

    public function import(BulkComicRequest $request) {
        //The content is coming in as an unlabeled array, so we have to do weird stuff to validate it
        $content = json_decode($request->getContent(), true);
        $rules = $request->rules();
        $validator = Validator::make($content, $rules);
        
        if (!$validator->passes()) {
            return response()->json($validator->errors()->messages(), 422);
        }

        $comics = [];
        foreach ($content as $item) {
            $comic = Comic::create($item);
            $comic->importIssueFiles();
            $comics[] = $comic;
        }
        return new ComicCollection($comics);
    }
}
