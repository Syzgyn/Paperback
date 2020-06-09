<?php

namespace App\Http\Resources\ComicVine;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Comic;

class Volume extends JsonResource
{
    const URL_BASE = "https://comicvine.gamespot.com/";
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
		    'description' => $this->processDescription($this->resource->description),
		    'startYear' => $this->resource->start_year,
		    'numIssues' => $this->resource->count_of_issues,
		    'url' => $this->resource->site_detail_url,
		    'cvid' => $this->resource->id,
		    'image' => $this->resource->image->{Comic::IMAGE_KEY},
            'publisher' => $this->resource->publisher->name,
            'inLibrary' => $this->checkLibrary($this->resource->id),
	    ]; 
    }

    protected function processDescription($text) {
        $text = strlen($text) > self::MAX_LENGTH ? substr($text, 0, self::MAX_LENGTH) . "... <a target=\"_blank\" href='" . $this->resource->site_detail_url . "'>Read More</a>" : $text;

        $text = preg_replace(
            '/href\=\"\//',
            'target="_blank" href="' . self::URL_BASE,
            $text
        );

        $text = $this->closetags($text);

        return $text;
    }

    protected function closetags($html) {
        preg_match_all('#<([a-z]+)(?: .*)?(?<![/|/ ])>#iU', $html, $result);
        $openedtags = $result[1];

        preg_match_all('#</([a-z]+)>#iU', $html, $result);
        $closedtags = $result[1];
        $len_opened = count($openedtags);
        if (count($closedtags) == $len_opened) {
            return $html;
        }
        $openedtags = array_reverse($openedtags);
        for ($i=0; $i < $len_opened; $i++) {
            if (!in_array($openedtags[$i], $closedtags)){
                $html .= '</'.$openedtags[$i].'>';
            } else {
                unset($closedtags[array_search($openedtags[$i], $closedtags)]);
            }
        }
        return $html;
    }

    protected function checkLibrary(Int $cvid) {
        return (Comic::find($cvid) instanceof Comic);
    }
}
