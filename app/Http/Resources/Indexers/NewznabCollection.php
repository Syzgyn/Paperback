<?php

namespace App\Http\Resources\Indexers;

use Illuminate\Http\Resources\Json\ResourceCollection;

class NewznabCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
