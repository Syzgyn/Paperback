<?php

namespace App\Libraries\DecisionEngine;

class Decision
{
    public function __construct(
        public bool $accepted,
        public string $reason = "",
    )
    {
    }

    public static function accept(): self
    {
        return new self(true);
    }

    public static function reject(string $reason): self
    {
        return new self(false, $reason);
    }
}