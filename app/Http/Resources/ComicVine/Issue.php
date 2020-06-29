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
            'name' => $this->resource->name,
            'comic_id' => (int)$this->resource->volume->id,
            'description' => $this->resource->description,
            'release_date' => $this->resource->cover_date,
            'issue_num' => (int)$this->resource->issue_number,
            'url' => $this->resource->site_detail_url,
            'cvid' => (int)$this->resource->id,
            'volume' => $this->resource->volume,
        ];
    }
}
