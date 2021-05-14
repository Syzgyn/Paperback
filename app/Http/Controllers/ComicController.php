<?php

namespace App\Http\Controllers;

use App\Models\Comic;
use Illuminate\Http\Request;
use App\Http\Requests\ComicRequest;
use App\Http\Requests\BulkComicRequest;
use App\Http\Resources\ComicCollection;
use App\Http\Resources\Comic as ComicResource;
use App\Http\Resources\ComicVine\VolumeCollection;
use App\Repositories\ComicVineRepository;
use App\Services\FileManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Psalm\Report\JsonReport;

class ComicController extends Controller
{
    protected ComicVineRepository $comicvine;
    
    public function __construct()
    {
        /** @var ComicVineRepository */
        $this->comicvine = resolve('ComicVineRepository');
    }

    public function index(): ComicCollection
    {
        $comics = Comic::all();

        return new ComicCollection($comics);
    }

    public function store(ComicRequest $request): ComicResource
    {
        $comic = Comic::create($request->validated());
        return new ComicResource($comic);
    }

    public function show(Comic $comic): ComicResource
    {
        return new ComicResource($comic);
    }

    public function update(Request $request, Comic $comic): ComicResource
    {
        $comic->fill($request->validate([
            'monitored' => 'boolean',
        ]));
        $comic->save();

        return new ComicResource($comic);
    }

    /** @return JsonResponse */
    public function destroy(Comic $comic): JsonResponse
    {
        /** @var Request */
        $request = request();
        if ($request->query('deleteFiles') === 'true') {
            /** @var FileManager */
            $fileManager = resolve('FileManager');
            $fileManager->removeDir($comic->path);
        }
        $comic->delete();

        /** @var JsonResponse */
        return response()->json(['status' => 'OK']);
    }

    public function search(Request $request): VolumeCollection
    {
        $search = (string)$request->input('term');

        return $this->comicvine->searchVolumes($search, true);
    }

    public function comicvine(Comic $comic): \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
    {
        /** @var array $data 
         *  @var string $data['url']
        */
        $data = $this->comicvine->volume($comic->cvid);
        return redirect($data['url']);
    }

    public function importSearch(Request $request): VolumeCollection
    {
        $search = (string)$request->input('query');

        return $this->comicvine->searchVolumes($search);
    }

    public function lookup(Request $request): VolumeCollection|array
    {
        /** @var string|null */
        $term = $request->input('term', null);
        if (!$term) {
            return [];
        }
        
        return $this->comicvine->searchVolumes($term);
    }

    public function import(BulkComicRequest $request): ComicCollection|JsonResponse
    {
        //The content is coming in as an unlabeled array, so we have to do weird stuff to validate it
        /** @var array */
        $content = json_decode((string)$request->getContent(), true);
        $rules = $request->rules();
        $validator = Validator::make($content, $rules);
        
        if ($validator->fails()) {
            /** @var JsonResponse */
            $return = response()->json($validator->errors()->messages(), 422);
            return $return;
        }

        $comics = [];
        /** @var array $item */
        foreach ($content as $item) {
            $comic = Comic::create($item);
            $comic->importIssueFiles();
            $comics[] = $comic;
        }
        return new ComicCollection($comics);
    }
}
