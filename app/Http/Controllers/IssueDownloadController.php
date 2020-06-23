<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\IssueDownload;
use App\Http\Requests\IssueDownloadRequest;
use App\Http\Resources\IssueDownloadCollection;
use App\Http\Resources\IssueDownload as IssueDownloadResource;

class IssueDownloadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $issueDownloads = IssueDownload::all();

        return new IssueDownloadCollection($issueDownloads);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(IssueDownloadRequest $request)
    {
        $attrs = $request->validated();
        $issueDownload = IssueDownload::create($request->validated());

        return new IssueDownloadResource($issueDownload);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\IssueDownload  $issueDownload
     * @return \Illuminate\Http\Response
     */
    public function show(IssueDownload $issueDownload)
    {
        return new IssueDownloadResource($issueDownload);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\IssueDownload  $issueDownload
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IssueDownload $issueDownload)
    {
        $issueDownload->fill($request->all());
        $issueDownload->save();

        return new IssueDownloadResource($issueDownload);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\IssueDownload  $issueDownload
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueDownload $issueDownload)
    {
        $issueDownload->delete();

        return response()->json(['status' => 'OK']);
    }
}
