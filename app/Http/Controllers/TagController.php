<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Resources\Tag as TagResource;
use App\Http\Resources\TagCollection;
use Illuminate\Http\Request;
use App\Http\Requests\TagRequest;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    public function index(): TagCollection
    {
        $tags = Tag::all();

        return new TagCollection($tags);
    }

    public function store(TagRequest $request): TagResource
    {
        $tag = Tag::create($request->validated());
        return new TagResource($tag);
    }

    public function show(Tag $tag): TagResource
    {
        return new TagResource($tag);
    }

    public function update(TagRequest $request, Tag $tag): TagResource
    {
        $tag->fill($request->validated());
        $tag->save();

        return new TagResource($tag);
    }

    public function destroy(Tag $tag): JsonResponse
    {
        $tag->delete();

        /** @var JsonResponse */
        return response()->json(['status' => 'OK']);
    }
}
