<?php

namespace App\Libraries\Commands;

use App\Events\CommandExecutedEvent;
use App\Events\CommandUpdatedEvent;
use DateTime;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class Command implements ShouldQueue
{
    use Dispatchable, Queueable, InteractsWithQueue;

    public bool $sendUpdatesToClient = false;
    public bool $updateScheduledTask = true;
    public bool $requiresDiskAccess = false;
    public bool $isExclusive = false;
    public string $completionMessage = "Completed";
    public ?DateTime $lastExecutionTime = null;
    /** @var CommandTrigger::* */
    public int $trigger = CommandTrigger::SCHEDULED;
    /** @var CommandStatus::* */
    public int $status = 0;
    public ?DateTime $queuedAt = null;
    public ?DateTime $startedAt = null;
    public ?DateTime $endedAt = null;
    public ?int $duration = null;
    public string $name;

    final public function __construct(array $params = [])
    {
        $this->name = str_replace("Command", "", class_basename($this));
        $this->lastExecutionTime = new DateTime(Cache::get("Task_" . $this->name));
        $this->setValues($params);
    }

    protected function setValues(array $params): void
    {
    }

    public function handle()
    {
        $this->status = CommandStatus::STARTED;
        $this->startedAt = new DateTime();
        event(new CommandUpdatedEvent($this));

        try {
            Log::debug("Running " . $this->name);
            event($this);
            $this->status = CommandStatus::COMPLETED;
        } catch (Exception $e) {
            $this->completionMessage = "Failed";
            $this->status = CommandStatus::FAILED;
        } finally {
            $this->endedAt = new DateTime();
            $this->duration = $this->endedAt->getTimestamp() - $this->startedAt->getTimestamp();
            event(new CommandUpdatedEvent($this));
            event(new CommandExecutedEvent($this));
        }
    }
}