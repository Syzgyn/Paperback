<?php

namespace App\Http\Resources;

use App\Traits\TruncateHtml;
use Illuminate\Http\Resources\Json\JsonResource;

class Comic extends JsonResource
{
    use TruncateHtml;

    const MAX_LENGTH = 600;
    const URL_BASE = 'https://comicvine.gamespot.com/';

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'displayDescription' => $this->truncatedDescription,
            'description' => $this->description,
            'descriptionIsTruncated' => $this->description !== $this->truncatedDescription,
            'startYear' => $this->start_year,
            'url' => $this->url,
            'cvid' => $this->cvid,
            'image' => $this->image,
            'issues' => $this->issues,
            'numIssues' => count($this->issues),
            'downloadedIssues' => $this->downloadedIssuesCount,
            'monitored' => $this->monitored,
        ];
    }
}
