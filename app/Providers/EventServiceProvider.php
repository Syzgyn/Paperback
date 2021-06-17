<?php

namespace App\Providers;

use App\Events\Listeners\ComicListener;
use App\Events\Listeners\CommandListener;
use App\Events\Listeners\DownloadListener;
use App\Events\Listeners\IssueFileListener;
use App\Events\Listeners\IssueListener;
use App\Events\Listeners\LogListener;
use App\Libraries\Download\DownloadProcessingService;
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
        //Services
        DownloadHistoryService::class,
        DownloadMonitoringService::class,
        DownloadProcessingService::class,
        HistoryService::class,
        EventSourceService::class,
        QueueService::class,

        //Listeners
        IssueListener::class,
        IssueFileListener::class,
        DownloadListener::class,
        CommandListener::class,
        LogListener::class,
        ComicListener::class,
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
