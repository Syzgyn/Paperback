<?php

namespace App\Listeners;

use App\Events\DownloadFailed;
use App\Events\DownloadStarted;
use App\Events\DownloadImported;
use Illuminate\Support\Facades\Cache;
use App\Models\Indexer;
use App\Models\History;

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
        $indexerResult = Cache::get(Indexer::CACHE_PREFIX . '.' . $event->guid);
        $data = [
            'comic_id' => $event->comic_id,
            'issue_id' => $event->issue_id,
            'download_id' => $event->download_id,
            'source_title' => $indexerResult['title'],
            'event_type' => 1,
            'data' => [
                'download_client_id' => $event->download_client_id,
                'indexer' => $indexerResult['indexer'],
                'indexer_id' =>$indexerResult['indexer_id'],
                'publish_date' => $indexerResult['date'],
                'source' => $indexerResult['source'],
                'download_url' => $indexerResult['url'],
                'size' =>$indexerResult['size'],
                'guid' => $event->guid,
            ],
        ];

        $history = History::create($data);
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
