<?php

namespace App\Dto;

use Spatie\DataTransferObject\DataTransferObjectCollection;

/**
 * @method SearchResult current
 */
class SearchResultCollection extends DataTransferObjectCollection
{
    public static function create(array $data)
    {
        return new static(SearchResult::arrayOf($data));
    }
}
