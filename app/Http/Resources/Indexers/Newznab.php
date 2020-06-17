<?php

namespace App\Http\Resources\Indexers;

use Illuminate\Http\Resources\Json\JsonResource;

class Newznab extends JsonResource
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
            'displayTitle' => $this->cleanupTitle($this->resource['title']),
            'title' => $this->resource['title'],
            'date' => $this->resource['pubDate'],
            'ago' => $this->getTimeAgo($this->resource['pubDate']),
            'size' => $this->formatSize($this->resource['enclosure']['@attributes']['length']),
            'link' => $this->resource['link'],
            'indexer' => $this->resource['indexer'],
            'source' => $this->resource['source'],
        ];
    }

    protected function formatSize(Int $bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= pow(1024, $pow);

        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    protected function cleanupTitle($title)
    {
        //If there are no spaces, they're usually replaced with '.'
        if (strpos($title, ' ') === false) {
            $title = str_replace('.', ' ', $title);
        }

        //Sometimes a few rounds of decoding are required
        for ($i = 0; $i < 5; $i++) {
            $title = html_entity_decode($title);
        }

        return $title;
    }

    protected function getTimeAgo($dateString)
    {
        $datetime1 = new \DateTime($dateString);
        $datetime2 = new \DateTime();
        $interval = $datetime1->diff($datetime2);

        return $interval->format('%a days');
    }
}
