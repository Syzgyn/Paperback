<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Comic extends JsonResource
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
		    'name' => $this->name,
		    'description' => $this->description,
		    'start_year' => $this->start_year,
		    'url' => $this->url,
		    'cvid' => $this->cvid,
        ];
    }
}
