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
            'title' => $this->displayName,
            'comicId' => $this->comic_id,
            'overview' => $this->description,
            'airDate' => $this->release_date,
            'airDateUtc' => $this->release_date,
            'absoluteEpisodeNumber' => $this->issue_num,
            'episodeNumber' => $this->issue_num,
            'url' => $this->url,
            'id' => $this->cvid,
            //'trackedDownloads' => $this->trackedDownloads,
            //'activeDownloads' => $this->activeDownloads,
            //'status' => $this->status,
            'monitored' => $this->monitored,
            'hasFile' => $this->hasDownloadedFile(),
            'issueFileId' => 0, //TODO
            'seasonNumber' => 0, //TODO
            'unverifiedSceneNumbering' => false,
        ];
    }
}
