<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RootFolder extends JsonResource
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
            'id' => $this->resource->id,
            'path' => $this->resource->path,
            'freeSpace' => $this->resource->freeSpace,
            'unmappedFolders' => $this->resource->unmappedFolders,
            'accessible' => $this->resource->accessible,
            //'unmappedFoldersCount' => $this->resource->unmappedFoldersCount,
        ];
    }
}
