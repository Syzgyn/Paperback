<?php

namespace App\Libraries\Download;

use App\Events\DownloadCanBeRemovedEvent;
use App\Libraries\Commands\ProcessMonitoredDownloadsCommand;
use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadState;
use Exception;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Log;

class DownloadProcessingService
{
    protected function removeCompletedDownloads(): void
    {
        /** @var TrackedDownload[] */
        $trackedDownloads = resolve("TrackedDownloadService")->getTrackedDownloads();

        foreach ($trackedDownloads as $trackedDownload) {
            if (!$trackedDownload->downloadItem?->removed && 
                $trackedDownload->downloadItem?->canBeRemoved && 
                $trackedDownload->state == TrackedDownloadState::IMPORTED
            )
            {
                event(new DownloadCanBeRemovedEvent($trackedDownload));
            }
        }
    }

    public function handleProcessMonitoredDownloadsCommand(ProcessMonitoredDownloadsCommand $command): void
    {
        Log::debug("Processing downloads");

        $appSettings = resolve("AppSettings");
        $enableCompletedDownloadHanding = (bool) $appSettings->get("downloadclient", "enableCompletedDownloadHandling");
        $removeCompletedDownloads = (bool) $appSettings->get("downloadclient", "removeCompletedDownloads");

        /** @var TrackedDownload[] */
        $trackedDownloads = resolve("TrackedDownloadService")->getTrackedDownloads();
        $trackedDownloads = array_filter($trackedDownloads, fn(TrackedDownload $t): bool => $t->isTrackable ?? false);

        $failedDownloadService = resolve("FailedDownloadService");
        $completedDownloadService = resolve("CompletedDownloadService");
        foreach ($trackedDownloads as $trackedDownload) {
            try {
                if ($trackedDownload->state == TrackedDownloadState::FAILED_PENDING) {
                    $failedDownloadService->processFailed($trackedDownload);
                } elseif ($enableCompletedDownloadHanding && $trackedDownload->state == TrackedDownloadState::IMPORT_PENDING) {
                    $completedDownloadService->import($trackedDownload);
                }
            } catch (Exception $e) {
                Log::error("Failed to process download: " . ($trackedDownload->downloadItem->title ?? "Unknown Title"), ['exception' => $e]);
            }
        }

        if ($removeCompletedDownloads) {
            $this->removeCompletedDownloads();
        }

        //TODO: event(new DownloadsProcessingEvent());
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            ProcessMonitoredDownloadsCommand::class,
            [$this, 'handleProcessMonitoredDownloadsCommand']
        );
    }
}