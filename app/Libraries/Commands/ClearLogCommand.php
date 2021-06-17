<?php

namespace App\Libraries\Commands;

class ClearLogCommand extends Command
{
    protected function setValues(array $values): void
    {
        $this->sendUpdatesToClient = true;
    }
}