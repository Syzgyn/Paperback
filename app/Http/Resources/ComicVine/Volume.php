<?php

namespace App\Http\Resources\ComicVine;

use App\Libraries\Organizer\FileNameBuilder;
use App\Models\Comic;
use App\Traits\TruncateHtml;
use App\Traits\ChangeComicLinks;
use Illuminate\Http\Resources\Json\JsonResource;

class Volume extends JsonResource
{
    use TruncateHtml;
    use ChangeComicLinks;

    const URL_BASE = 'https://comicvine.gamespot.com/';
    const MAX_LENGTH = 600;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $comic = new Comic([
            'cvid' => $this->resource->id,
            'title' => $this->resource->name,
            'year' => $this->resource->start_year,
        ]);

        return [
            'title' => $this->resource->name,
            'sortName' => $this->getSortName(),
            'titleSlug' => \Slugify::slugify($this->resource->name),
            'overview' => $this->resource->description,
            'year' => (Int)$this->resource->start_year,
            'numIssues' => $this->resource->count_of_issues,
            'cvid' => $this->resource->id,
            'images' => [
                ['coverType' => 'poster', 'url' => $this->resource->image->{Comic::IMAGE_KEY}],
            ],
            'publisher' => ($this->resource->publisher) ? $this->resource->publisher->name : null,
            'inLibrary' => $this->checkLibrary($this->resource->id),
            'issueCount' => $this->resource->count_of_issues,
            'status' => $this->getStatus(),
            'folder' => FileNameBuilder::getComicFolder($comic),
            'comicType' => 'standard',
        ];
    }

    protected function getStatus()
    {
        $lastIssue = $this->resource->last_issue_resource ?? null;

        if (!$lastIssue) {
            //No issues, if it's in the future it must be ongoing
            if ($this->resource->start_year > date('Y')) {
                return 'continuing';
            }

            return 'ended';
        }

        $dates = [
            strtotime($this->resource->start_year . '-01-01'),
            strtotime($lastIssue['store_date']),
            strtotime($lastIssue['cover_date']),
        ];

        //Get the most recent date from the comic and last issue
        $latestDate = max($dates);

        //Most recent date is within 55 days of today
        if (time() - $latestDate < (60*60*24*55)) {
            return 'continuing';
        }

        return 'ended';
    }

    protected function checkLibrary(Int $cvid)
    {
        return (Comic::find($cvid) instanceof Comic);
    }

    protected function getSortName()
    {
        $name = strtolower($this->resource->name);
        $name = preg_replace('/[^a-z\d ]+/i', '', $name);
        if (substr($name, 0, 3) == 'the') {
            $name = substr($name, 3);
        }

        return trim($name);
    }

    protected function getFolderName()
    {
        $patterns = [
            '/: ?/',
            '/[\\<>"\/\|\?\*\.]/',
        ];
        $replacements = [
            ' - ',
            '',
        ];

        return preg_replace($patterns, $replacements, $this->resource->name);

    }
}
