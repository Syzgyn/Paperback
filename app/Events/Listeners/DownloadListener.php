<?php

namespace App\Events\Listeners;

use App\Events\DownloadCanBeRemovedEvent;
use App\Events\DownloadCompletedEvent;
use App\Libraries\Download\DownloadItemStatus;
use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Models\DownloadClient;
use Exception;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Log;

class DownloadListener
{
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            DownloadCanBeRemovedEvent::class,
            [$this, 'handleDownloadCanBeRemoved']
        );

        $events->listen(
            DownloadCompletedEvent::class,
            [$this, 'handleDownloadCompleted']
        );
    }

    public function handleDownloadCompleted(DownloadCompletedEvent $event): void
    {
        $removeCompletdDownloads = (bool) resolve("AppSettings")->get("downloadclient", "removeCompletedDownloads");

        if ($removeCompletdDownloads &&
            !$event->trackedDownload->downloadItem?->removed &&
            $event->trackedDownload->downloadItem?->canBeRemoved &&
            $event->trackedDownload->downloadItem?->status != DownloadItemStatus::DOWNLOADING
        )
        {
            $this->removeFromDownloadClient($event->trackedDownload);
        } else {
            $this->markItemAsImported($event->trackedDownload);
        }
    }

    public function handleDownloadCanBeRemoved(DownloadCanBeRemovedEvent $event): void
    {
        $this->removeFromDownloadClient($event->trackedDownload);
    }


    protected function removeFromDownloadClient(TrackedDownload $trackedDownload): void
    {
        $downloadClient = DownloadClient::find($trackedDownload->downloadClient);

        if ($downloadClient == null) {
            Log::error("Can't remove download with unknown client");
            return;
        }

        if ($trackedDownload->downloadItem == null) {
            Log::error("Can't remove download with unknown item");
            return;
        }

        try {
            Log::debug(sprintf("[%s] Removing download from %s history",
                $trackedDownload->downloadItem->title ?? "Unknown Title",
                $downloadClient->name));

            $downloadClient->removeItem($trackedDownload->downloadItem, true);
            $trackedDownload->downloadItem->removed = true;
        } catch (Exception $e) {
            Log::error(sprintf("Couldn't remove item %s from client %s", 
                $trackedDownload->downloadItem->title ?? "Unknown Title",
                $downloadClient->name), ['exception' => $e]);
        }

        
    }

    protected function markItemAsImported(TrackedDownload $trackedDownload): void
    {
        $downloadClient = DownloadClient::find($trackedDownload->downloadClient);

        if ($downloadClient == null) {
            Log::error("Can't mark download with unknown client as imported");
            return;
        }

        if ($trackedDownload->downloadItem == null) {
            Log::error("Can't mark download with unknown item as imported");
            return;
        }

        try {
            Log::debug(sprintf("[%s] Marking download as imported from %s",
                $trackedDownload->downloadItem->title ?? "Unknown Title",
                $downloadClient->name));
                
            $downloadClient->markItemAsImported($trackedDownload->downloadItem);
        } catch (Exception $e) {
            Log::error(sprintf("Couldn't remove item %s from client %s", 
                $trackedDownload->downloadItem->title ?? "Unknown Title",
                $downloadClient->name), ['exception' => $e]);
        }
    }
}