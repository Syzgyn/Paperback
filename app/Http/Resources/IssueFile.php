<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IssueFile extends JsonResource
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
            'comicId' => $this->comic_id,
            'relativePath' => $this->relative_path,
            'path' => $this->path,
            'size' => $this->size,
            'fileType' => $this->fileType,
            'dateAdded' => $this->created_at,
            'id' => $this->id,
        ];
    }
}
