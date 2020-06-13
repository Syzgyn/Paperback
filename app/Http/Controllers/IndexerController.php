<?php

namespace App\Http\Controllers;

use App\Models\Indexer;
use Illuminate\Http\Request;

use App\Http\Requests\IndexerRequest;
use App\Http\Resources\Indexer as IndexerResource;
use App\Http\Resources\IndexerCollection;
use App\Http\Resources\Indexers\NewznabCollection;

class IndexerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $indexers = Indexer::all();

        return new IndexerCollection($indexers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IndexerRequest $request)
    {
        $indexer = Indexer::createChild($request->validated());

        return new IndexerResource($indexer);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Indexer  $indexer
     * @return \Illuminate\Http\Response
     */
    public function show(Indexer $indexer)
    {
        return new IndexerResource($indexer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Indexer  $indexer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Indexer $indexer)
    {
        $indexer->fill($request->validate());
        $indexer->save();

        return new IndexerResource($indexer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Indexer  $indexer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Indexer $indexer)
    {
        $indexer->delete();
        return response()->json(['status' => 'OK']);
    }

    public function search(String $query, Int $offset = 0) {
        $indexers = Indexer::all();

        $results = [];
        foreach($indexers as $indexer) {
                $results = array_merge($results, $indexer->search($query, $offset));
        }

        return new NewznabCollection($results);
    }

    public function schema(Request $request, $name=null) {
        if ($name) { 
            //TODO: Validation
            $className = Indexer::INDEXER_TYPES[$name];
            $indexer = new $className();

            return $indexer->buildSchema();
        }

        return Indexer::buildSchemas();
    }
}
