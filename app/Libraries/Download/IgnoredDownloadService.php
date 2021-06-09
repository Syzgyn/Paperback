<?php

namespace App\Libraries\Download;

use App\Libraries\Download\TrackedDownloads\TrackedDownload;
use App\Models\Issue;
use Illuminate\Support\Facades\Log;

class IgnoredDownloadService
{
    public function ignoreDownload(TrackedDownload $trackedDownload): bool
    {
        $comic = $trackedDownload->remoteIssue?->comic;
        $issues = $trackedDownload->remoteIssue?->issues;

        if ($comic == null || $issues == null) {
            Log::warning("Unable to ignore download for unknown comic");
            return false;
        }

        $event = new DownloadIgnoredEvent();
        $event->comicId = $comic->cvid;
        $event->issueIds = array_map(fn(Issue $i) => $i->cvid, $issues);
        $event->sourceTitle = $trackedDownload->downloadItem?->title ?? "Unknown Title";
        $event->downloadClientInfo = $trackedDownload->downloadItem?->downloadClientInfo;
        $event->downloadId = $trackedDownload->downloadItem?->downloadId;
        $event->message = "Manually ignored";

        event($event);
        return true;
    }
}