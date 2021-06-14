<?php

namespace App\Events\Listeners;

use App\Libraries\Download\IssueGrabbedEvent;
use App\Libraries\EventSource\EventSourceService;
use App\Libraries\EventSource\ModelAction;
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
    }

    public function handleIssueGrabbedEvent(IssueGrabbedEvent $event): void
    {
        foreach ($event->issue->issues as $issue) {
            $this->service->broadcast(ModelAction::UPDATED, 'issue', $issue);
        }
    }
}