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
		    'volume_name' => $this->resource->volume->name,
            'comic_id' => $this->resource->volume->id,
		    'description' => $this->resource->description,
		    'release_date' => $this->resource->cover_date,
		    'issue_num' => $this->resource->issue_number,
		    'url' => $this->resource->site_detail_url,
		    'cvid' => $this->resource->id,
	    ]; 
    }
}
