<?php

namespace App\Libraries\Download\TrackedDownloads;

class TrackedDownloadStatus
{
    public const OK = 0;
    public const WARNING = 1;
    public const ERROR = 2;

    public static function toString(?int $i = null): string
    {
        switch ($i) {
            case self::OK:
                return "ok";
            case self::WARNING:
                return "warning";
            case self::ERROR:
                return "error";
            default:
                return "unknown status";
        }
    }
}