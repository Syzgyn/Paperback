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
            'title' => $this->title ?? "Issue #{$this->issue_num}",
            'comicId' => $this->comic_id,
            'overview' => $this->overview,
            'releaseDate' => $this->store_date,
            'releaseDateUtc' => $this->store_date,
            'storeDate' => $this->store_date,
            'coverDate' => $this->cover_date,
            'absoluteIssueNumber' => $this->issue_num,
            'issueNumber' => $this->issue_num,
            'id' => $this->cvid,
            //'trackedDownloads' => $this->trackedDownloads,
            //'activeDownloads' => $this->activeDownloads,
            //'status' => $this->status,
            'monitored' => $this->monitored,
            'hasFile' => $this->hasFile,
            'issueFileId' => $this->issue_file ?? 0,
            'seasonNumber' => 0, //TODO
            'unverifiedSceneNumbering' => false,
            'images' => $this->images,
        ];
    }
}
