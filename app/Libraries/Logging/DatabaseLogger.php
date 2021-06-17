<?php

namespace App\Libraries\Logging;

use Monolog\Logger;

class DatabaseLogger
{
    public function __invoke(array $config)
    {
        $logger = new Logger("paperback");
        $logger->pushHandler(new LogHandler($config['level']));

        return $logger;
    }
}