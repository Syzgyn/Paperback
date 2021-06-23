<?php

namespace App\Events\Listeners;

use App\Events\ComicAddedEvent;
use App\Events\ComicDeletedEvent;
use App\Libraries\Commands\RefreshComicCommand;
use App\Libraries\EventSource\EventSourceService;
use App\Libraries\EventSource\ModelAction;
use App\Libraries\MediaFiles\Events\IssueImportedEvent;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Queue;

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

        $events->listen(
            ComicAddedEvent::class,
            [$this, 'handleComicAddedEvent']
        );

        $events->listen(
            ComicDeletedEvent::class,
            [$this, 'handleComicDeletedEvent']
        );
    }

    public function handleIssueImportedEvent(IssueImportedEvent $event): void
    {
        $this->service->broadcast(ModelAction::UPDATED, 'comic', $event->localIssue->comic);
    }

    public function handleComicDeletedEvent(ComicDeletedEvent $event): void
    {
        $this->service->broadcast(ModelAction::DELETED, 'comic', $event->comic);
    }


    public function handleComicAddedEvent(ComicAddedEvent $event): void
    {
        $command = new RefreshComicCommand(['comicId' => $event->comic->cvid, 'isNewComic' => true]);
        
        Queue::push($command);
    }
}