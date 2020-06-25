<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handleDownloadStarted(\App\Events\DownloadStarted $event)
    {
    }

    public function handleDownloadImported(\App\Events\DownloadImported $event)
    {
    }

    public function handleDownloadFailed(\App\Events\DownloadFailed $event)
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
