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
            'title' => $this->title,
            'sortTitle' => $this->getSortTitle(),
            'titleSlug' => \Slugify::slugify($this->title),
            'overview' => $this->overview,
            'year' => $this->year,
            'id' => $this->cvid,
            'cvid' => $this->cvid, //TODO: consolidate with id
            'images' => $this->images,
            'statistics' => [
                'issueCount' => count($this->issues),
                'totalIssueCount' => count($this->issues),
                'issueCount' => count($this->issues),
                'issueFileCount' => $this->issueFileCount,
                'seasonCount' => 0,
                'sizeOnDisk' => $this->totalIssueFileSize,
                'percentOfIssues' => round($this->downloadedIssueCount / max(1, count($this->issues)) * 100),
            ],
            'monitored' => $this->monitored,
            'status' => $this->getStatus(),
            'publisher' => $this->publisher,
            'comicType' => 'standard',
            'qualityProfile' => ['name' => 'remove me'],
            'languageProfile' => ['name' => 'remove me'],
            'path' => $this->path,
            'ratings' => ['value' => 5],
            'useSceneNumbering' => false,
            'tags' => $this->tags
        ];
    }

    protected function getStatus()
    {
        $lastIssue = $this->issues->last();

        if (!$lastIssue) {
            //No issues, if it's in the future it must be ongoing
            if ($this->year > date('Y')) {
                return 'continuing';
            }

            return 'ended';
        }

        $dates = [
            strtotime($this->year . '-01-01'),
            strtotime($lastIssue->releaseDate),
        ];

        //Get the most recent date from the comic and last issue
        $latestDate = max($dates);

        //Most recent date is within 55 days of today
        if (time() - $latestDate < (60*60*24*55)) {
            return 'continuing';
        }

        return 'ended';
    }

    protected function getSortTitle()
    {
        $title = strtolower($this->title);
        $title = preg_replace('/[^a-z\d ]+/i', '', $title);
        if (substr($title, 0, 3) == 'the') {
            $title = substr($title, 3);
        }

        return trim($title);
    }
}
