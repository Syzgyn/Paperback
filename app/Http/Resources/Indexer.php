<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Indexer extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'class' => $this->class,
            'enableSearch' => (bool)$this->enable_search,
            'settings' => $this->settings,
            'schema' => $this->schema,
        ];
    }
}
