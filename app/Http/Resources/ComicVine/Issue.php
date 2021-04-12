<?php

namespace App\Http\Resources\ComicVine;

use Illuminate\Http\Resources\Json\JsonResource;

class Issue extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'title' => $this->resource->name,
            'comicId' => (int)$this->resource->volume->id,
            'overview' => $this->resource->description,
            'storeDate' => $this->resource->store_date,
            'coverDate' => $this->resource->cover_date,
            'issueNumber' => (int)$this->resource->issue_number,
            'cvid' => (int)$this->resource->id,
        ];
    }
}
