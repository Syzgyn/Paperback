<?php

namespace App\Http\Controllers;

use App\Models\RootFolder;
use App\Http\Resources\RootFolder as RootFolderResource;
use App\Http\Resources\RootFolderCollection;
use Illuminate\Http\Request;

class RootFolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new RootFolderCollection(RootFolder::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $params = $request->validate([
            'path' => 'string|required',
        ]);
        $model = RootFolder::create($params);
        
        return new RootFolderResource($model);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RootFolder  $rootFolder
     * @return \Illuminate\Http\Response
     */
    public function show(RootFolder $rootFolder)
    {
        return new RootFolderResource($rootFolder);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RootFolder  $rootFolder
     * @return \Illuminate\Http\Response
     */
    public function destroy(RootFolder $rootFolder)
    {
        $rootFolder->delete();

        return response()->json(['status' => 'OK']);
    }

    public function import(int $id)
    {
        $rootFolder = RootFolder::find($id);
        return $rootFolder->import();
    }
}
