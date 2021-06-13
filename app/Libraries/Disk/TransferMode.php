<?php

namespace App\Libraries\Disk;

class TransferMode
{
    public const NONE = 0;
    public const MOVE = 1;
    public const COPY = 2;
    public const HARDLINK = 4;

    public const HARDLINK_OR_COPY = self::HARDLINK | self::COPY;

    public static function toString(int $mode): string
    {
        switch ($mode) {
            case self::NONE:
                return "None";
            case self::MOVE:
                return "Move";
            case self::COPY:
                return "Copy";
            case self::HARDLINK_OR_COPY:
                return "Hardlink or Copy";
            case self::HARDLINK:
                return "Hardlink";
            default:
                return "Unknown";
        }
    }
}