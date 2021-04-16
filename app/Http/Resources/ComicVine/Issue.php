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
            'comic_id' => (int)$this->resource->volume->id,
            'overview' => $this->resource->description,
            'store_date' => $this->resource->store_date,
            'cover_date' => $this->resource->cover_date,
            'issue_num' => (int)$this->resource->issue_number,
            'cvid' => (int)$this->resource->id,
            'images' => $this->resource->image,
        ];
    }
}
