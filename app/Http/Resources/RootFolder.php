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
            'id' => $this->id,
            'path' => $this->path,
            'freeSpace' => $this->freeSpace,
            'unmappedFolders' => $this->unmappedFolders,
            'accessible' => $this->accessible,
            //'unmappedFoldersCount' => $this->resource->unmappedFoldersCount,
        ];
    }
}
