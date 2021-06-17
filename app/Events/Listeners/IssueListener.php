<?php

namespace App\Events\Listeners;

use App\Libraries\Download\IssueGrabbedEvent;
use App\Libraries\EventSource\EventSourceService;
use App\Libraries\EventSource\ModelAction;
use App\Libraries\MediaFiles\Events\IssueImportedEvent;
use Illuminate\Events\Dispatcher;

class IssueListener
{
    protected EventSourceService $service;

    public function __construct()
    {
        $this->service = resolve('EventSourceService');
    }
    
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueGrabbedEvent::class,
            [$this, 'handleIssueGrabbedEvent']
        );

        $events->listen(
            IssueImportedEvent::class,
            [$this, 'handleIssueImportedEvent']
        );
    }

    public function handleIssueGrabbedEvent(IssueGrabbedEvent $event): void
    {
        foreach ($event->issue->issues as $issue) {
            $this->service->broadcast(ModelAction::UPDATED, 'issue', $issue);
        }
    }

    public function handleIssueImportedEvent(IssueImportedEvent $event): void
    {
        if (!$event->newDownload) {
            return;
        }

        foreach ($event->localIssue->issues as $issue) {
            $this->service->broadcast(ModelAction::UPDATED, 'issue', $issue);
        }
    }
}