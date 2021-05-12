<?php

namespace App\Http\Resources\Indexers;

use App\Models\Indexer;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Resources\Json\JsonResource;

class GetComics extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $arr = [
            'guid' => $this->resource['id'],
            'displayTitle' => $this->resource['title'],
            'title' => $this->resource['title'],
            'date' => $this->resource['date'],
            'ago' => $this->getTimeAgo($this->resource['date']),
            'size' => $this->resource['size'],
            'raw_size' => $this->resource['size'],
            'url' => $this->resource['link'],
        ];
        
        return $arr;
    }

    protected function getTimeAgo($dateString)
    {
        $datetime1 = new \DateTime($dateString);
        $datetime2 = new \DateTime();
        $interval = $datetime1->diff($datetime2);

        return $interval->format('%a days');
    }
}
