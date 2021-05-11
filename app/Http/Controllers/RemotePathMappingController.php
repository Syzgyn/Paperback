<?php

namespace App\Http\Controllers;

use App\Models\RemotePathMapping;
use App\Http\Resources\RemotePathMapping as RemotePathMappingResource;
use App\Http\Resources\RemotePathMappingCollection;
use Illuminate\Http\Request;
use App\Libraries\Disk\OsPath;

class RemotePathMappingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new RemotePathMappingCollection(RemotePathMapping::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $mapping = new RemotePathMapping();
        $mapping->host = $request->input('host');
        $mapping->local_path = new OsPath($request->input('local_path')->asDirectory->getPath();
        $mapping->remote_path = new OsPath($request->input('remote_path')->asDirectory->getPath();

        $all = RemptePathMapping::all()->toArray();

        $this->validateMapping($all, $mapping);

        $mapping->save();

        return new RemotePathMappingResource($mapping);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RemotePathMapping  $remotePathMapping
     * @return \Illuminate\Http\Response
     */
    public function show(RemotePathMapping $remotePathMapping)
    {
        return new RemotePathMappingResource($remotePathMapping);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RemotePathMapping  $remotePathMapping
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RemotePathMapping $mapping)
    {
        $mapping->fill($request->all());

        $all = RemotePathMapping::where('id', '!=', $mapping->id)->get()->toArray();

        $this->validateMapping($mapping, $all);

        $mapping->save();

        return new RemotePathMappingResource($mapping);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RemotePathMapping  $remotePathMapping
     * @return \Illuminate\Http\Response
     */
    public function destroy(RemotePathMapping $remotePathMapping)
    {
        $remotePathMapping->delete();

        return response()->json(['status' => 'OK']);
    }

    protected function validateMapping(array $existing, RemotePathMapping $mapping): void
    {
        if (empty($mapping->host)) {
            throw new \LogicException("Invalid Host");
        }

        $remotePath = new OsPath($mapping->remote_path);
        $localPath = new OsPath($mapping->local_path);

        if ($remotePath->isEmpty()) {
            throw new \LogicException("Invalid RemotePath");
        }

        if ($localPath->isEmpty() || !$localPath->isRooted()) {
            throw new \LogicException("Invalid LocalPath");
        }

        if (!is_dir($localPath->getPath())) {
            throw new \LogicException("Can't add mount point directory that doesn't exist");
        }

        foreach($existing as $existingMapping) {
            if ($existingMapping->host == $mapping->host && $existingMapping->remote_path == $mapping->remote_path) {
                throw new \Exception("RemotePath already mounted");
            }
        }
    }
}
