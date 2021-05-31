<?php

namespace App\Libraries\Download;

use App\Libraries\Download\TrackedDownloads\TrackedDownload;

class DownloadFailedEvent
{
    public function __construct(
        public int $comicId,
        public array $issueIds,
        public string $sourceTitle,
        public string $downloadClient,
        public string $downloadId,
        public string $message,
        public array $data,
        public ?TrackedDownload $trackedDownload = null,
    )
    {
    }
}