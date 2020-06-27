<?php

namespace App\Events;

use App\Models\TrackedDownload;

class DownloadStarted
{
    public $comic_id;
    public $issue_id;
    public $download_client_id;
    public $download_id;
    public $source_title;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(TrackedDownload $download)
    {
        $status = $download->downloadClient->getDownloadStatus($download->download_id);
    }
}
