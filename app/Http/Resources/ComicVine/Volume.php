<?php

namespace App\Http\Resources\ComicVine;

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
            'status' => 'ended',
            'folder' => $this->getFolderName(),
            'comicType' => 'standard',
        ];
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
