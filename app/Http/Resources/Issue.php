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
            'issue_name' => $this->getName(),
            'comic_name' => $this->comic->name,
            'comic_id' => $this->comic_id,
            'description' => $this->description,
            'release_date' => $this->release_date,
            'issue_num' => $this->issue_num,
            'url' => $this->url,
            'cvid' => $this->cvid,
            'trackedDownloads' => $this->trackedDownloads,
            'activeDownloads' => $this->activeDownloads,
            'status' => $this->status,
            'monitored' => $this->monitored,
            'downloadedFile' => $this->downloadedFile,
            'displayName' => $this->displayName,
        ];
    }

    protected function getName()
    {
        if ($this->name) {
            return $this->name;
        }

        return 'Issue #' . $this->issue_num;
    }
}
