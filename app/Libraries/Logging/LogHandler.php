<?php

namespace App\Libraries\Logging;

use App\Models\Log;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\Logger;
use Monolog\Processor\IntrospectionProcessor;

class LogHandler extends AbstractProcessingHandler
{
    protected $processor;

    public function __construct()
    {
        $this->processor = new IntrospectionProcessor(Logger::DEBUG, ["Illuminate\\"]);
    }

    protected function write(array $record): void
    {
        $record = ($this->processor)($record);

        $record['extra']['basename'] = class_basename($record['extra']['class']);

        $exception_type = null;
        $exception = null;

        if (isset($record['context']['exception'])) {
            $e = $record['context']['exception'];

            $exception_type = class_basename(get_class($e));
            $exception = sprintf('%s: "%s" at %s line %s', $exception_type, $e->getMessage(), $e->getFile(), $e->getLine());
        }

        $log = new Log();
        
        $log->fill([
            'level' => $record['level_name'],
            'message' => $record['message'],
            'exception_type' => $exception_type,
            'exception' => $exception,
            'logger' => $record['extra']['basename'],
        ]);

        $log->save();
    }
}