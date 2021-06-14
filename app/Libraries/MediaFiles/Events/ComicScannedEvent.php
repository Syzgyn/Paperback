<?php

namespace App\Libraries\MediaFiles\Events;

use App\Models\Comic;

class ComicScannedEvent
{
    public function __construct(
        public Comic $comic
    )
    {
    }
}