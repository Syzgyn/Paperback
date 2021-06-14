<?php

namespace App\Libraries\MediaFiles\Events;

use App\Libraries\MediaFiles\ComicScanSkippedReason;
use App\Models\Comic;

class ComicScannedSkippedEvent
{
    /** @param ComicScanSkippedReason::* $reason */
    public function __construct(
        public Comic $comic,
        public int $reason,
    )
    {
    }
}