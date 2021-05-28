<?php

namespace App\Libraries\Download\TrackedDownloads;

class TrackedDownloadState
{
    public const DOWNLOADING = 0;
    public const IMPORT_PENDING = 1;
    public const IMPORTING = 2;
    public const IMPORTED = 3;
    public const FAILED_PENDING = 4;
    public const FAILED = 5;
    public const IGNORED = 6;

    /** @param self::* $i */
    public static function toString(?int $i = null): string
    {
        switch ($i) {
            case self::DOWNLOADING:
                return "downloading";
            case self::IMPORT_PENDING:
                return "import pending";
            case self::IMPORTING:
                return "importing";
            case self::IMPORTED:
                return "imported";
            case self::FAILED_PENDING:
                return "failed pending";
            case self::FAILED:
                return "failed";
            case self::IGNORED:
                return "ignored";
            default:
                return "unknown status";
        }
    }
}