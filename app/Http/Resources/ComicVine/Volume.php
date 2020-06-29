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
            'name' => $this->resource->name,
            'displayDescription' => $this->processDescription($this->resource->description),
            'description' => $this->resource->description,
            'startYear' => (Int)$this->resource->start_year,
            'numIssues' => $this->resource->count_of_issues,
            'url' => $this->resource->site_detail_url,
            'cvid' => $this->resource->id,
            'image' => $this->resource->image->{Comic::IMAGE_KEY},
            'publisher' => ($this->resource->publisher) ? $this->resource->publisher->name : null,
            'inLibrary' => $this->checkLibrary($this->resource->id),
        ];
    }

    protected function processDescription($text)
    {
        $text = $this->truncateHtml($text, self::MAX_LENGTH, "... <a target=\"_blank\" href='" . $this->resource->site_detail_url . "'>Read More</a>");

        $text = $this->changeComicLinks($text);

        return $text;
    }

    protected function checkLibrary(Int $cvid)
    {
        return (Comic::find($cvid) instanceof Comic);
    }
}
