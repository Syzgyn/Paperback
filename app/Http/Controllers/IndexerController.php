<?php

namespace App\Http\Controllers;

use App\Models\Indexer;
use Illuminate\Http\Request;
use App\Http\Requests\IndexerRequest;
use App\Http\Resources\IndexerCollection;
use App\Http\Resources\IndexerResultCollection;
use App\Http\Resources\Indexer as IndexerResource;
use App\Http\Resources\TrackedDownload as TrackedDownloadResource;
use App\Libraries\Providers\ProviderController;
use App\Libraries\Providers\ProviderModel;
use App\Repositories\IndexerRepository;

class IndexerController extends ProviderController
{
    public function __construct(IndexerRepository $repo)
    {
        $this->repo = $repo;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     /*
    public function index()
    {
        $indexers = Indexer::all();

        return new IndexerCollection($indexers);
    }
    */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function _store(IndexerRequest $request)
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
     /*
    public function show(Indexer $indexer)
    {
        return new IndexerResource($indexer);
    }
    */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Indexer  $indexer
     * @return \Illuminate\Http\Response
     */
    public function _update(Request $request, Indexer $indexer)
    {
        $indexer->fill($request->all());
        $indexer->save();

        return new IndexerResource($indexer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Indexer  $indexer
     * @return \Illuminate\Http\Response
     */
    public function _destroy(Indexer $indexer)
    {
        $indexer->delete();

        return response()->json(['status' => 'OK']);
    }

    public function _search(Request $request)
    {
        $cvid = $request->input('cvid');

        $results = resolve('DownloadService')->searchIssue($cvid);

        return new IndexerResultCollection($results);
    }

    public function _autosearch(Request $request)
    {
        $cvid = $request->input('cvid');
        //TODO: Look at matching files and try replacing issue number to download the rest of the comics

        $trackedDownload = resolve('DownloadService')->downloadIssue($cvid);

        if (! $trackedDownload) {
            return response()->json(['error' => true, 'message' => 'Search results invalidated, please search again']);
        }

        return new TrackedDownloadResource($trackedDownload);
    }

    public function _schema(Request $request, $name = null)
    {
        if ($name) {
            if (! array_key_exists($name, Indexer::INDEXER_TYPES)) {
                return response()->json(['error' => "No indexer found of type: '$name'"], 404);
            }

            $className = Indexer::INDEXER_TYPES[$name];
            $indexer = new $className();

            return $indexer->schema;
        }

        return Indexer::buildSchemas();
    }

    public function _test(IndexerRequest $request)
    {
        $indexer = Indexer::createChild($request->validated(), false);

        return $indexer->test();
    }
}
