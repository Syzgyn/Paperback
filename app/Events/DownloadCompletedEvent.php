<?php

namespace App\Events;

use App\Libraries\Download\TrackedDownloads\TrackedDownload;

class DownloadCompletedEvent
{
    public function __construct(
        public TrackedDownload $trackedDownload,
        public int $comicId,
    )
    {
    }
}