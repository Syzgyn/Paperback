<?php

namespace App\Libraries\Download\TrackedDownloads;

use App\Libraries\Commands\ProcessMonitoredDownloadsCommand;
use App\Libraries\Commands\RefreshMonitoredDownloadsCommand;
use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Download\DownloadClientModelBase;
use App\Libraries\Download\DownloadItemStatus;
use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use bandwidthThrottle\tokenBucket\Rate;
use bandwidthThrottle\tokenBucket\TokenBucket;
use bandwidthThrottle\tokenBucket\storage\FileStorage;
use Exception;
use Illuminate\Events\Dispatcher;
use App\Libraries\Download\IssueGrabbedEvent;
use App\Libraries\MediaFiles\Events\IssueImportedEvent;
use App\Models\DownloadClient;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class DownloadMonitoringService
{
    protected TokenBucket $bucket;
    protected bool $enableCompletedDownloadHanding;

    public function __construct()
    {
        $storage = new FileStorage(storage_path('app/api.bucket'));
        $rate = new Rate(1, Rate::SECOND);
        $this->bucket = new TokenBucket(5, $rate, $storage);
        $this->bucket->bootstrap(5); //TODO: Move to bootstrapping

        /** @var bool */
        $this->enableCompletedDownloadHanding = resolve('AppSettings')->get('downloadclient', 'enableCompletedDownloadHandling');
    }

    public function refresh(): void
    {
        $seconds = 0;
        if (!$this->bucket->consume(5, $seconds)) {
            return;
        }

        /** @var Collection */
        $downloadClients = DownloadClient::whereEnable(true)->get();
        /** TrackedDownload[] */
        $trackedDownloads = [];

        /** @var DownloadClientModelBase $client */
        foreach ($downloadClients as $client) {
            $clientTrackedDownloads = $this->processClientDownloads($client);
            $trackedDownloads += array_filter($clientTrackedDownloads, [$this, "downloadIsTrackable"]);
        }
        
        resolve("TrackedDownloadService")->updateTrackable($trackedDownloads);
        event(new TrackedDownloadRefreshedEvent($trackedDownloads));
        event(new ProcessMonitoredDownloadsCommand());
    }

    /** @return TrackedDownload[] */
    protected function processClientDownloads(DownloadClientModelBase $client): array
    {
        /** @var DownloadClientItem[] */
        $downloadClientItems = [];
        /** @var TrackedDownload[] */
        $trackedDownloads = [];

        try {
            $downloadClientItems = $client->getItems();
        } catch (Exception $e) {
            Log::warning("Unable to retrieve queue and history items from " . $client->name, ['exception' => $e]);
        }

        foreach ($downloadClientItems as $downloadItem) {
            $item = $this->processClientItem($client, $downloadItem);

            if ($item != null) {
                $trackedDownloads[] = $item;
            }
        }

        return $trackedDownloads;
    }

    protected function processClientItem(DownloadClientModelBase $client, DownloadClientItem $item): ?TrackedDownload
    {
        try {
            /** @var TrackedDownload */
            $trackedDownload = resolve("TrackedDownloadService")->trackDownload($client, $item);

            if ($trackedDownload->state == TrackedDownloadState::DOWNLOADING) {
                resolve("CompletedDownloadService")->check($trackedDownload);
                resolve("FailedDownloadService")->check($trackedDownload);
            }

            return $trackedDownload;
        } catch (Exception $e) {
            Log::error("Couldn't process tracked download " . ($item->title ?? "Unknown title"));
        }

        return null;
    }

    protected function downloadIsTrackable(TrackedDownload $trackedDownload): bool
    {
        if ($trackedDownload->state == TrackedDownloadState::IMPORTED ||
            $trackedDownload->state == TrackedDownloadState::FAILED ||
            $trackedDownload->state == TrackedDownloadState::IGNORED
        ){
            return false;
        }

        if (!$this->enableCompletedDownloadHanding && 
            $trackedDownload->downloadItem != null && 
            $trackedDownload->downloadItem->status == DownloadItemStatus::COMPLETED)
        {
            return false;
        }

        return true;
    }

    public function handleIssueGrabbedEvent(IssueGrabbedEvent $event): void
    {
        //TODO: replace with command call
        $this->refresh();
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueGrabbedEvent::class,
            [$this, 'handleIssueGrabbedEvent']
        );

        $events->listen(
            RefreshMonitoredDownloadsCommand::class,
            [$this, 'refresh']
        );

        $events->listen(
            IssueImportedEvent::class,
            [$this, 'refresh']
        );
    }
}