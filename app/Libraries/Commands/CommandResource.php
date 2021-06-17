<?php

namespace App\Libraries\Commands;

use DateTime;

class CommandResource
{
    /** 
     * @param CommandTrigger::* $trigger
     */
    public function __construct(
        public string $name,
        public string $commandName,
        public Command $body,
        public string $status,
        public DateTime $queued,
        public ?DateTime $started,
        public ?DateTime $ended,
        public ?int $duration,
        public int $trigger,
        public string $completionMessage,
    )
    {
    }

    public static function fromCommand(Command $command): self
    {
        return new self(
            $command->name,
            trim(implode(" ", preg_split('/(?=[A-Z])/', $command->name))),
            $command,
            CommandStatus::toString($command->status),
            $command->queuedAt ?? new DateTime(),
            $command->startedAt,
            $command->endedAt,
            $command->duration,
            $command->trigger,
            $command->completionMessage,
        );
    }
}