<?php

namespace App\Http\Controllers;

use App\Libraries\Commands\Command;
use App\Libraries\Commands\CommandResource;
use App\Libraries\Commands\CommandTrigger;
use DateTime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Queue;

class CommandController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json();
    }

    public function get(int $id): JsonResponse
    {
        return response()->json();
    }

    public function start(Request $request): JsonResponse
    {
        $params = $request->all();
        $name = (string) $params['name'];

        if ($name == null) {
            return response()->json(["error" => "missing command"], 402);
        }

        $commandName = "\App\Libraries\Commands\\{$name}Command";

        if (!class_exists($commandName)) {
            return response()->json(["error" => "command not found"], 402);
        }

        if (!is_subclass_of($commandName, Command::class)) {
            return response()->json(["error" => "command not valid"], 402);
        }

        /** 
         * @var class-string<Command> $commandName 
         * @var Command $command
         */
        $command = new $commandName($params);
        $command->trigger = CommandTrigger::MANUAL;
        $command->queuedAt = new DateTime();
        
        Queue::push($command);

        return response()->json(CommandResource::fromCommand($command));
    }
    
    public function cancel(string $id): void
    {
        
    }
}
