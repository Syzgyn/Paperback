<?php

namespace App\Libraries\DecisionEngine;

class Rejection
{
    public function __construct(public string $reason, public int $type = RejectionType::PERMANENT)
    {
    }

    public function __tostring()
    {
        return sprintf("[%s] %s", $this->type, $this->reason);
    }
}
