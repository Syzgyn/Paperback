<?php

namespace App\Http\Controllers;

use App\Models\RemotePathMapping;
use App\Http\Resources\RemotePathMapping as RemotePathMappingResource;
use App\Http\Resources\RemotePathMappingCollection;
use Illuminate\Http\Request;
use App\Http\Requests\RemotePathMappingRequest;
use App\Libraries\Disk\OsPath;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class RemotePathMappingController extends Controller
{

    public function index(): RemotePathMappingCollection
    {
        return new RemotePathMappingCollection(RemotePathMapping::all());
    }

    public function store(RemotePathMappingRequest $request): RemotePathMappingResource
    {
        $mapping = new RemotePathMapping();
        $mapping->host = $request->input('host');
        $localPath = new OsPath((string)$request->input('local_path'));
        $remotePath = new OsPath((string)$request->input('remote_path'));
        $mapping->local_path = $localPath->asDirectory()->getPath();
        $mapping->remote_path = $remotePath->asDirectory()->getPath();

        $all = RemotePathMapping::all()->all();

        $this->validateMapping($all, $mapping);

        $mapping->save();

        return new RemotePathMappingResource($mapping);
    }

    public function show(RemotePathMapping $remotePathMapping): RemotePathMappingResource
    {
        return new RemotePathMappingResource($remotePathMapping);
    }

    public function update(RemotePathMappingRequest $request, RemotePathMapping $mapping):RemotePathMappingResource
    {
        $mapping->fill($request->all());

        /** @var Collection */
        $mappings = RemotePathMapping::where('id', '!=', $mapping->id)->get();

        $this->validateMapping($mappings->all(), $mapping);

        $mapping->save();

        return new RemotePathMappingResource($mapping);
    }

    public function destroy(RemotePathMapping $remotePathMapping): JsonResponse
    {
        $remotePathMapping->delete();

        /** @var JsonResponse */
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

        /** @var RemotePathMapping $existingMapping */
        foreach($existing as $existingMapping) {
            if ($existingMapping->host == $mapping->host && $existingMapping->remote_path == $mapping->remote_path) {
                throw new \Exception("RemotePath already mounted");
            }
        }
    }
}
