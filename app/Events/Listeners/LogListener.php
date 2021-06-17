<?php

namespace App\Events\Listeners;

use App\Libraries\Commands\ClearLogCommand;
use App\Models\Log;
use Illuminate\Events\Dispatcher;

class LogListener
{
    public function subscribe(Dispatcher $events): void
    {
        $events->listen(
            ClearLogCommand::class,
            [$this, 'handleClearLogCommand']
        );
    }

    public function handleClearLogCommand(ClearLogCommand $command)
    {
        Log::query()->delete();
    }
}