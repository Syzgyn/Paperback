<?php

namespace App\Libraries;

use Closure;
use Illuminate\Support\Facades\Redis;

class SSE
{
    public static function processEvent(string $content): string
    {
        $data = json_decode($content, true);

        if (!is_array($data)) {
            return "";
        }

        $output = [];

        if (isset($data['comment']) && is_string($data['comment'])) {
            $output[] = sprintf(": %s", $data['comment']);
        }

        if (isset($data['id']) && is_string($data['id'])) {
            $output[] = sprintf("id: %s", $data['id']);
        }

        if (isset($data['retry']) && is_string($data['retry'])) {
            $output[] = sprintf("retry: %s", $data['retry']);
        }

        if (isset($data['event']) && is_string($data['event'])) {
            $output[] = sprintf("event: %s", $data['event']);
        }

        if (isset($data['data']) && is_string($data['data'])) {
            $output[] = sprintf("data: %s", $data['data']);
        }

        return implode("\n", $output) . "\n\n";
    }

    public static function redisCallback(string $content): void
    {
        $output = self::processEvent($content);
        if (!empty($output)) {
            echo $output;
            ob_flush();
            flush();
        }
    }

    public static function responseCallback(): void
    {
        while(true) {
            try {
                Redis::subscribe("events", Closure::fromCallable([self::class, "redisCallback"]));
            } catch (\RedisException $e) {
            }

            echo ": ping\n\n";
            ob_flush();
            flush();
        }
    }
}