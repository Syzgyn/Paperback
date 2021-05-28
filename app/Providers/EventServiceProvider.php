<?php

namespace App\Providers;

use App\Events\Listeners\IssueListener;
use App\Libraries\Download\History\DownloadHistoryService;
use App\Libraries\Download\TrackedDownloads\DownloadMonitoringService;
use App\Libraries\History\HistoryService;
use App\Libraries\EventSource\EventSourceService;
use App\Libraries\Queue\QueueService;
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
        DownloadMonitoringService::class,
        HistoryService::class,
        EventSourceService::class,
        IssueListener::class,
        QueueService::class,
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
    }
}
