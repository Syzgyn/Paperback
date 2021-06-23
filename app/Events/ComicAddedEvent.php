<?php

namespace App\Events;

use App\Models\Comic;

class ComicAddedEvent
{
    public function __construct(
        public Comic $comic,
    )
    {
    }
}