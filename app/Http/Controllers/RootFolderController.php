<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use App\Models\RootFolder;
use Illuminate\Http\Request;
use App\Http\Resources\RootFolderCollection;
use App\Http\Resources\RootFolder as RootFolderResource;
use Illuminate\Http\JsonResponse;

class RootFolderController extends Controller
{
    public function index(): RootFolderCollection
    {
        return new RootFolderCollection(RootFolder::all());
    }

    public function store(Request $request): RootFolderResource
    {
        $params = $request->validate([
            'path' => 'string|required',
        ]);
        $model = RootFolder::create($params);

        return new RootFolderResource($model);
    }

    public function show(RootFolder $rootFolder): RootFolderResource
    {
        return new RootFolderResource($rootFolder);
    }

    public function destroy(RootFolder $rootFolder): JsonResponse
    {
        $rootFolder->delete();

        /** @var JsonResponse */
        return response()->json(['status' => 'OK']);
    }

    /*
    public function import(Request $request)
    {
        $data = $request->input('data');
        $fileManager = resolve('FileManager');
        $output = [];

        foreach ($data as $folder) {
            $comic = Comic::find($folder['matchId']);
            if (! $comic) {
                $comic = Comic::createFromCvid($folder['matchId']);
            }

            $comic->importIssuesFromPath($folder['path']);

            if ($folder['path'] !== $comic->fullDirectoryName) {
                $fileManager->removeEmptyDir($folder['path']);
            }

            $output[] = $comic;
        }

        return $output;
    }
    */
}
