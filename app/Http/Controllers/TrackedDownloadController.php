<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TrackedDownload;
use App\Http\Requests\TrackedDownloadRequest;
use App\Http\Resources\TrackedDownloadCollection;
use App\Http\Resources\TrackedDownload as TrackedDownloadResource;
use Illuminate\Http\JsonResponse;

class TrackedDownloadController extends Controller
{
    public function index(): TrackedDownloadCollection
    {
        $trackedDownloads = TrackedDownload::all();

        return new TrackedDownloadCollection($trackedDownloads);
    }

    public function store(TrackedDownloadRequest $request): TrackedDownloadResource
    {
        $attrs = $request->validated();

        $trackedDownload = new TrackedDownload();
        $trackedDownload->fill($attrs);
        $trackedDownload->url = $attrs['url'];
        $trackedDownload->indexerId = $attrs['indexer_id'];
        $trackedDownload->save();
        //$trackedDownload = TrackedDownload::createFromGuid($attrs['guid'], $attrs['comic_id'], $attrs['issue_id']);

        if (! $trackedDownload) {
            return response()->json(['error' => true, 'message' => 'Search results invalidated, please search again']);
        }

        return new TrackedDownloadResource($trackedDownload);
    }

    public function show(TrackedDownload $trackedDownload): TrackedDownloadResource
    {
        return new TrackedDownloadResource($trackedDownload);
    }

    public function update(Request $request, TrackedDownload $trackedDownload):TrackedDownloadResource
    {
        $trackedDownload->fill($request->all());
        $trackedDownload->save();

        return new TrackedDownloadResource($trackedDownload);
    }

    public function destroy(TrackedDownload $trackedDownload): JsonResponse
    {
        $trackedDownload->delete();
        
        return response()->json(['status' => 'OK']);
    }
}
