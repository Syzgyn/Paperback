<?php

namespace App\Events;

use App\Models\Comic;
use App\Models\Issue;

class IssueInfoRefreshedEvent
{
    /**
     * @param Issue[] $added 
     * @param Issue[] $updated 
     * @param Issue[] $removed 
     */
    public function __construct(
        public Comic $comic,
        public array $added,
        public array $updated,
        public array $removed,
    )
    {
    }
}