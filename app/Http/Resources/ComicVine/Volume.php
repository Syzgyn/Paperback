<?php

namespace App\Http\Resources\ComicVine;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Comic;

class Volume extends JsonResource
{
    const URL_BASE = "https://comicvine.gamespot.com/";

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
		    'description' => $this->processDescription($this->resource->description),
		    'start_year' => $this->resource->start_year,
		    'num_issues' => $this->resource->count_of_issues,
		    'url' => $this->resource->site_detail_url,
		    'cvid' => $this->resource->id,
		    'image' => $this->resource->image->{Comic::IMAGE_KEY},
	    ]; 
    }

    protected function processDescription($text) {
        return preg_replace(
            '/href\=\"\//',
            'target="_blank" href="' . self::URL_BASE,
            $text
        );
    }
}
