<?php

namespace App\Libraries\Download\TrackedDownloads;

use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Download\DownloadClientItemClientInfo;
use App\Libraries\Download\DownloadClientModelBase;
use App\Libraries\Download\DownloadItemStatus;
use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use bandwidthThrottle\tokenBucket\Rate;
use bandwidthThrottle\tokenBucket\TokenBucket;
use bandwidthThrottle\tokenBucket\storage\FileStorage;
use Exception;
use Illuminate\Events\Dispatcher;
use App\Libraries\Download\IssueGrabbedEvent;
use Illuminate\Database\Eloquent\Collection;

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

    protected function refresh(): void
    {
        $seconds = 0;
        if (!$this->bucket->consume(5, $seconds)) {
            return;
        }

        /** @var Collection */
        $downloadClients = DownloadClientModelBase::whereEnable(true)->get();
        /** TrackedDownload[] */
        $trackedDownloads = [];

        /** @var DownloadClientModelBase $client */
        foreach ($downloadClients as $client) {
            $clientTrackedDownloads = $this->processClientDownloads($client);
            $trackedDownloads += array_filter($clientTrackedDownloads, [$this, "downloadIsTrackable"]);
        }

        event(new TrackedDownloadRefreshedEvent($trackedDownloads));
        //TODO: Process downloads command
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
            //TODO: Log failure
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
            $trackedDownload = TrackedDownload::fromDownloadClient($client, $item);

            if ($trackedDownload->state == TrackedDownloadState::DOWNLOADING) {
                //TODO: Check for failed or completed download
            }

            return $trackedDownload;
        } catch (Exception $e) {
            //TODO: Log failure
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

        if (!$this->enableCompletedDownloadHanding && $trackedDownload->downloadItem != null && $trackedDownload->downloadItem->status == DownloadItemStatus::COMPLETED) {
            return false;
        }

        return true;
    }

    public function handleIssueGrabbedEvent(IssueGrabbedEvent $event): void
    {
        $this->refresh();
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueGrabbedEvent::class,
            [$this::class, 'handleIssueGrabbedEvent']
        );
    }
}