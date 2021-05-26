<?php

namespace App\Libraries\EventSource;

use JsonSerializable;

class ResourceChangeMessage implements JsonSerializable
{
    public ?object $resource = null;
    /** @var ModelAction::* */
    public string $action;

    /** @param ModelAction::* $action */
    public function __construct(string $action, ?object $resource = null)
    {
        if ($resource == null && $action != ModelAction::DELETED && $action != ModelAction::SYNC) {
            throw new \Exception("Resource message without a resource needs to have Delete or Sync as action");
        }

        $this->action = $action;
        $this->resource = $resource;
    }

    public function jsonSerialize()
    {
        $arr = [
            'action' => $this->action,
        ];

        if ($this->resource != null) {
            $arr['resource'] = $this->resource;
        }

        return $arr;
    }
}