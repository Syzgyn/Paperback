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
            'title' => $this->name,
            'sortTitle' => $this->getSortName(),
            'titleSlug' => \Slugify::slugify($this->name),
            //'displayDescription' => $this->truncatedDescription,
            'overview' => $this->description,
            //'descriptionIsTruncated' => $this->description !== $this->truncatedDescription,
            'year' => $this->start_year,
            'id' => $this->cvid,
            'cvid' => $this->cvid, //TODO: consolidate with id
            'images' => [
                ['coverType' => 'poster', 'url' => $this->image],
            ],
            //'issues' => $this->issues,
            'statistics' => [
                'issueCount' => count($this->issues),
                'totalIssueCount' => count($this->issues),
                'issueFileCount' => $this->downloadedIssuesCount,
                'seasonCount' => 0,
            ],
            'monitored' => $this->monitored,
            'status' => 'ended',
            'comicType' => 'standard',
            'qualityProfile' => ['name' => 'remove me'],
            'languageProfile' => ['name' => 'remove me'],
            'path' => 'temp',
            'ratings' => ['value' => 5],
            'useSceneNumbering' => false,
        ];
    }

    protected function getSortName()
    {
        $name = strtolower($this->name);
        $name = preg_replace('/[^a-z\d ]+/i', '', $name);
        if (substr($name, 0, 3) == 'the') {
            $name = substr($name, 3);
        }

        return trim($name);
    }
}
