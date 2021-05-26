<?php

namespace App\Libraries\EventSource;

use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\Redis;
use \Closure;

class EventSourceResponse extends StreamedResponse
{
    protected EventSourceService $service;

    public function __construct()
    {
        parent::__construct();

        /** @var EventSourceService */
        $this->service = resolve("EventSourceService");

        $this->headers->set('Content-Type', 'text/event-stream');
        $this->headers->set('Cache-Control', 'no-cache');
        $this->headers->set('Connection', 'keep-alive');
        $this->headers->set('X-Accel-Buffering', 'no');
        $this->headers->set("Content-Encoding", "none");

        $this->setCallback([$this, "responseCallback"]);
    }

    protected function responseCallback(): void
    {
        $this->sendComment("connected");

        while(true) {
            try {
                Redis::subscribe("events", Closure::fromCallable([$this, "sendData"]));
            } catch (\RedisException $e) {
            }

            $this->sendComment("ping");
        }
    }

    protected function sendComment(string $content): void
    {
        echo sprintf(": %s\n\n", $content);
        ob_flush();
        flush();
    }

    protected function sendData(string $content): void
    {
        echo sprintf("data: %s\n\n", $content);
        ob_flush();
        flush();
    }
}