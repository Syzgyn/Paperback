<?php

namespace App\Libraries\History;

use Illuminate\Events\Dispatcher;
use App\Libraries\Download\IssueGrabbedEvent;
use DateTimeInterface;
use Exception;

class HistoryService
{
    public function handleIssueGrabbedEvent(IssueGrabbedEvent $event): void
    {
        if ($event->issue->release == null) {
            throw new Exception("Attempting to handle download with no release");
        }

        foreach ($event->issue->issues as $issue) {
            $history = new IssueHistory([
                'event_type' => IssueHistoryEventType::GRABBED,
                'date' => now(),
                'source_title' => $event->issue->release->title,
                'comic_id' => $issue->comic_id,
                'issue_id' => $issue->cvid,
                'download_id' => $event->downloadId,
            ]);

            $history->data = [
                'Indexer' => $event->issue->release->indexer,
                'NzbInfoUrl' => $event->issue->release->infoUrl,
                'Age' => (string) $event->issue->release->getAge(),
                'AgeHours' => (string) $event->issue->release->getAgeHours(),
                'AgeMinutes' => (string) $event->issue->release->getAgeMinutes(),
                'PublishedDate' => $event->issue->release->publishDate?->format(DateTimeInterface::ATOM),
                'DownloadClient' => $event->downloadClient,
                'DownloadClientName' => $event->downloadClientName,
                'Size' => (string) $event->issue->release->size,
                'DownloadUrl' => $event->issue->release->downloadUrl,
                'Guid' => $event->issue->release->guid,
            ];
            
            $history->save();
        }
    }
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueGrabbedEvent::class,
            [$this::class, 'handleIssueGrabbedEvent']
        );
    }
}