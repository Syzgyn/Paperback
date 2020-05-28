<?php

namespace App\Http\Resources;

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
		    'volume_name' => $this->volume->name,
            'comic_id' => $this->volume->cvid,
		    'description' => $this->description,
		    'release_date' => $this->release_date,
		    'issue_num' => $this->issue_num,
		    'url' => $this->url,
		    'cvid' => $this->cvid,
	    ]; 
    }
}
