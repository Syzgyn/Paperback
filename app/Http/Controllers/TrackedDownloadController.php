<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrackedDownload;
use App\Http\Requests\TrackedDownloadRequest;
use App\Http\Resources\TrackedDownloadCollection;
use App\Http\Resources\TrackedDownload as TrackedDownloadResource;

class TrackedDownloadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trackedDownloads = TrackedDownload::all();

        return new TrackedDownloadCollection($trackedDownloads);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TrackedDownloadRequest $request)
    {
        $trackedDownload = TrackedDownload::create($request->validated());

        return new TrackedDownloadResource($trackedDownload);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TrackedDownload  $trackedDownload
     * @return \Illuminate\Http\Response
     */
    public function show(TrackedDownload $trackedDownload)
    {
        return new TrackedDownloadResource($trackedDownload);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TrackedDownload  $trackedDownload
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TrackedDownload $trackedDownload)
    {
        $trackedDownload->fill($request->all());
        $trackedDownload->save();

        return new TrackedDownloadResource($trackedDownload);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TrackedDownload  $trackedDownload
     * @return \Illuminate\Http\Response
     */
    public function destroy(TrackedDownload $trackedDownload)
    {
        $trackedDownload->delete();

        return response()->json(['status' => 'OK']);
    }
}
