<?php

namespace App\Events;

use App\Libraries\Commands\Command;

class CommandExecutedEvent
{
    public function __construct(
        public Command $command
    )
    {
    }
}