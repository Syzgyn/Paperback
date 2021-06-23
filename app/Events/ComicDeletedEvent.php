<?php

namespace App\Events;

use App\Models\Comic;

class ComicDeletedEvent
{
    public function __construct(
        public Comic $comic,
        public bool $deleteFiles,
    )
    {
    }
}