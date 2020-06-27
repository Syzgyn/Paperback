<?php

namespace App\Events;

use App\Models\TrackedDownload;

class DownloadStarted
{
    public $comic_id;
    public $issue_id;
    public $download_client_id;
    public $download_id;
    public $guid;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(TrackedDownload $download)
    {
        $this->comic_id = $download->comic_id;
        $this->issue_id = $download->issue_id;
        $this->download_client_id = $download->download_client_id;
        $this->download_id = $download->download_id;
        $this->guid = $download->guid;
    }
}
