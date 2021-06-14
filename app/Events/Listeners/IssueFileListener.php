<?php

namespace App\Events\Listeners;

use App\Libraries\EventSource\EventSourceService;
use App\Libraries\EventSource\ModelAction;
use App\Libraries\MediaFiles\Events\IssueFileAddedEvent;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Log;

class IssueFileListener
{
    protected EventSourceService $service;

    public function __construct()
    {
        $this->service = resolve('EventSourceService');
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueFileAddedEvent::class,
            [$this, 'handleIssueFileAddedEvent']
        );
    }

    public function handleIssueFileAddedEvent(IssueFileAddedEvent $event): void
    {
        foreach ($event->issueFile->issues as $issue) {
            $issue->issue_file = $event->issueFile->id;
            $issue->save();
            Log::debug(sprintf("Linking [%s] > [%s]", $event->issueFile->relative_path ?? "Unknown Path", $issue->title ?? "Unknown Title"));
        }
        
        $this->service->broadcast(ModelAction::UPDATED, 'issueFile', $event->issueFile);
    }
}