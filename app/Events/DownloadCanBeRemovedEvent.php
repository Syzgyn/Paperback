<?php

namespace App\Events;

use App\Libraries\Download\TrackedDownloads\TrackedDownload;

class DownloadCanBeRemovedEvent
{
    public function __construct(public TrackedDownload $trackedDownload)
    {   
    }
}