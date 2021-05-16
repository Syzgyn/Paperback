<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/** @package App\Http\Resources 
 * @mixin \App\Models\DownloadClient
*/
class Downloader extends JsonResource
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
            'enable' => (bool)$this->enable,
            'schema' => $this->schema,
        ];
    }
}
