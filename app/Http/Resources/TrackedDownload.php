<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TrackedDownload extends JsonResource
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
            'date' => $this->date,
            'guid' => $this->guid,
            'download_id' => $this->download_id,
            'comic_id' => $this->comic_id,
            'issue_id' => $this->issue_id,
            'download_client_id' => $this->download_client_id,
        ];
    }
}
