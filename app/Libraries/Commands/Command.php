<?php

namespace App\Libraries\Commands;

use DateTime;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;

class Command implements ShouldQueue
{
    use Dispatchable;

    public bool $sendUpdatesToClient = false;
    public bool $updateScheduledTask = true;
    public bool $requiresDiskAccess = false;
    public bool $isExclusive = false;
    public string $completionMessage = "Completed";
    public ?DateTime $lastExecutionTime = null;
    public int $trigger = 0;

    public string $name;

    public function __construct()
    {
        $this->name = str_replace("Command", "", class_basename($this));
    }
}