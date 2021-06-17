<?php

namespace App\Events\Listeners;

use App\Libraries\EventSource\EventSourceService;
use App\Libraries\EventSource\ModelAction;
use App\Libraries\MediaFiles\Events\IssueImportedEvent;
use Illuminate\Events\Dispatcher;

class ComicListener
{
    protected EventSourceService $service;

    public function __construct()
    {
        $this->service = resolve('EventSourceService');
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            IssueImportedEvent::class,
            [$this, 'handleIssueImportedEvent']
        );
    }

    public function handleIssueImportedEvent(IssueImportedEvent $event)
    {
        $this->service->broadcast(ModelAction::UPDATED, 'comic', $event->localIssue->comic);
    }
}