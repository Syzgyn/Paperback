<?php

namespace App\Libraries\Commands;

class CommandStatus
{
    public const QUEUED = 0;
    public const STARTED = 1;
    public const COMPLETED = 2;
    public const FAILED = 3;
    public const ABORTED = 4;
    public const CANCELLED = 5;
    public const ORPHANED = 6;

    public static function toString(int $status): string
    {
        switch ($status) {
            case self::QUEUED:
                return "queued";
            case self::STARTED:
                return "started";
            case self::COMPLETED:
                return "completed";
            case self::FAILED:
                return "failed";
            case self::ABORTED:
                return "aborted";
            case self::CANCELLED:
                return "cancelled";
            case self::ORPHANED:
                return "orphaned";
            default:
                return "invalid status";
        }
    }
}