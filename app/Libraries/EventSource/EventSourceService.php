<?php

namespace App\Libraries\EventSource;

use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\Redis;

class EventSourceService
{
    public function handleModelEvent(ModelEvent $event): void
    {
        if ($event->action == ModelAction::DELETED || $event->action == ModelAction::SYNC) {
            $this->broadcast($event->action, $event->name);
        }
        $this->broadcast($event->action, $event->name, $event->model);
    }

    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            ModelEvent::class,
            [$this::class, 'handleModelEvent']
        );
    }

    /** @param ModelAction::* $action */
    public function broadcast(string $action, string $name, ?object $resource = null): int
    {
        $body = new ResourceChangeMessage($action, $resource);
        $message = new EventSourceMessage($name, $body, $action);

        return $this->sendMessage($message);
    }

    protected function sendMessage(EventSourceMessage $message): int
    {
        return (int) Redis::publish("events", json_encode($message));
    }
}