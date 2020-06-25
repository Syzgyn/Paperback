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
        $shortDesc = $this->processDescription($this->description);

        return [
            'name' => $this->name,
            'displayDescription' => $shortDesc,
            'description' => $this->description,
            'descriptionIsTruncated' => $this->description !== $shortDesc,
            'startYear' => $this->start_year,
            'url' => $this->url,
            'cvid' => $this->cvid,
            'image' => $this->image,
            'issues' => $this->issues,
            'numIssues' => count($this->issues),
            'downloadedIssues' => $this->downloadedIssuesCount,
        ];
    }

    protected function processDescription($text)
    {
        $text = $this->printTruncated($text, self::MAX_LENGTH, '...');

        $text = preg_replace(
            '/href\=\"\//',
            'target="_blank" href="' . self::URL_BASE,
            $text
        );

        return $text;
    }
}
