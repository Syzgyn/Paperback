<?php

namespace App\Dto;

use Illuminate\Support\Str;
use Spatie\DataTransferObject\FlexibleDataTransferObject;

final class SearchResult extends FlexibleDataTransferObject
{
    public $guid;
    public $title;
    public $date;
    public $raw_size;
    public $url;
    public $indexer_id;
    public $indexer;
    public $source;
    public $issue_id;
    public $comic_id;
    public $protocol;

    public function __get(string $name)
    {
        if (method_exists($this, 'get'.Str::studly($name).'Attribute')) {
            return $this->{'get'.Str::studly($name).'Attribute'}();
        }

        return $this->$name;
    }

    public function getDisplayTitleAttribute()
    {
        return $this->cleanupTitle($this->title);
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
}
