<?php

namespace App\Libraries\Download\TrackedDownloads;

class TrackedDownloadStatusMessage
{
    public string $title;
    /** @var string[] */
    public array $messages;

    /** @param string|string[] $messages */
    public function __construct(string $title, string|array $messages)
    {
        $this->title = $title;
        $this->messages = is_array($messages) ? $messages : [$messages];
    }
}