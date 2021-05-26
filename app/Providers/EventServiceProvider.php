<?php

namespace App\Providers;

use App\Libraries\Download\History\DownloadHistoryService;
use App\Libraries\History\HistoryService;
use App\Libraries\EventSource\EventSourceService;
use Illuminate\Support\Facades\Event;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Redis;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
    ];

    protected $subscribe = [
        DownloadHistoryService::class,
        HistoryService::class,
        EventSourceService::class,
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        /**
         * Send all non-framework events to Redis, to be picked up by Server-sent Events
         */
        Event::listen('App*', function(string $eventName, array $data) {
            Redis::publish('events', json_encode([
                'event' => class_basename($eventName),
                'data' => $data,
            ]));
        });
    }
}
