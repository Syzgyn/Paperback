<?php

namespace App\Events;

class DownloadStarted
{
    public $data;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(array $downloadData)
    {
        $this->data = $downloadData;
    }
}
