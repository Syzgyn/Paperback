<?php

namespace App\Events;

use App\Libraries\Commands\Command;

class CommandUpdatedEvent
{
    public function __construct(
        public Command $command
    )
    {
    }
}