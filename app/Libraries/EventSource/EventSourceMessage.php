<?php

namespace App\Libraries\EventSource;

use JsonSerializable;

class EventSourceMessage implements JsonSerializable
{
    public function __construct(
        public string $name,
        public object $body,
        /** @var ModelAction::* */
        public string $action,
    ) {}

    public function jsonSerialize()
    {
        return [
            'name' => $this->name,
            'body' => method_exists($this->body, 'toJson') ? $this->body->toJson() : $this->body,
        ];
    }
}