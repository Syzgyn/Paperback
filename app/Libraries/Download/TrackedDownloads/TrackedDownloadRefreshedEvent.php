<?php

namespace App\Libraries\Download\TrackedDownloads;

class TrackedDownloadRefreshedEvent
{
    /** @param TrackedDownload[] $trackedDownloads */
    public function __construct(public array $trackedDownloads)
    {
    }
}