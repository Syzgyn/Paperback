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
            'sortName' => $this->getSortName(),
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
    
    protected function getSortName()
    {
        $name = strtolower($this->name);
        if (substr($name, 0, 3) == 'the') {
            $name = substr($name, 3); 
        } 

        return trim($name);
    }
}
