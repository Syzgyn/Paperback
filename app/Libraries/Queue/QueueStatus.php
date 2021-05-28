<?php

namespace App\Libraries\Queue;

class QueueStatus
{
    public int $totalCount = 0;
    public int $count = 0;
    public int $unknownCount = 0;
    public bool $errors = false;
    public bool $warnings = false;
    public bool $unknownErrors = false;
    public bool $unknownWarnings = false;
}