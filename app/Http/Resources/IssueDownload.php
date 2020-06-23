<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IssueDownload extends JsonResource
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
            'url' => $this->url,
            'download_id' => $this->download_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'status' => $this->status,
            'percentComplete' => $this->percentComplete,
            'timeLeft' => $this->timeLeft,
            'comic_id' => $this->comic_id,
            'issue_id' => $this->issue_id,
            'download_client_id' => $this->download_client_id,
            'comic' => $this->comic,
            'issue' => $this->issue,
        ];
    }
}
