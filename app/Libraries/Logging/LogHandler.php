<?php

namespace App\Libraries\Logging;

use App\Models\Log;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\Logger;
use Monolog\Processor\IntrospectionProcessor;

class LogHandler extends AbstractProcessingHandler
{
    protected IntrospectionProcessor $processor;

    public function __construct(string $level = "debug")
    {
        parent::__construct($level);
        $this->processor = new IntrospectionProcessor($level, ["Illuminate\\"]);
    }

    protected function write(array $record): void
    {
        /** @var array{extra: array{class: string}, level_name: string, message: string} */
        $record = ($this->processor)($record);

        $record['extra']['basename'] = class_basename($record['extra']['class']);

        $exception_type = null;
        $exception = null;

        if (isset($record['context']['exception'])) {
            /** @var \Exception */
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