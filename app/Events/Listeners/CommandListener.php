<?php

namespace App\Events\Listeners;

use App\Events\CommandExecutedEvent;
use App\Events\CommandUpdatedEvent;
use App\Libraries\Commands\CommandResource;
use App\Libraries\EventSource\EventSourceService;
use App\Libraries\EventSource\ModelAction;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Cache;

class CommandListener
{
    protected EventSourceService $service;

    public function __construct()
    {
        $this->service = resolve('EventSourceService');
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            CommandUpdatedEvent::class,
            [$this, 'handleCommandUpdatedEvent']
        );

        $events->listen(
            CommandExecutedEvent::class,
            [$this, 'handleCommandExecutedEvent']
        );
    }

    public function handleCommandExecutedEvent(CommandUpdatedEvent $event)
    {
        Cache::put("Task_" . $event->command->name, now()->format("U"));
        $this->service->broadcast(ModelAction::SYNC, "command", CommandResource::fromCommand($event->command));
    }

    public function handleCommandUpdatedEvent(CommandUpdatedEvent $event)
    {
        if ($event->command->sendUpdatesToClient) {
            $this->service->broadcast(ModelAction::UPDATED, "command", CommandResource::fromCommand($event->command));
        }
    }
}