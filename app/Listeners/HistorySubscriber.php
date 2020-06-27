<?php

namespace App\Listeners;

use App\Events\DownloadFailed;
use App\Events\DownloadStarted;
use App\Events\DownloadImported;

class HistorySubscriber
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function handleDownloadStarted(DownloadStarted $event)
    {
    }

    public function handleDownloadImported(DownloadImported $event)
    {
    }

    public function handleDownloadFailed(DownloadFailed $event)
    {
    }

    public function subscribe($events)
    {
        $events->listen(
            'App\Events\DownloadStarted',
            self::class . '@handleDownloadStarted'
        );

        $events->listen(
            'App\Events\DownloadFailed',
            self::class . '@handleDownloadFailed'
        );

        $events->listen(
            'App\Events\DownloadImported',
            self::class . '@handleDownloadImported'
        );
    }
}
