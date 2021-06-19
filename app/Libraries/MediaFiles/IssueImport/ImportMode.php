<?php

namespace App\Libraries\MediaFiles\IssueImport;

use Exception;

class ImportMode
{
    public const AUTO = 0;
    public const MOVE = 1;
    public const COPY = 2;

    public static function toString(?int $mode): ?string
    {
        switch($mode) {
            case self::AUTO:
                return "auto";
            case self::MOVE:
                return "move";
            case self::COPY:
                return "copy";
            default:
                return null;
        }
    }

    /** @return ?ImportMode::* */
    public static function fromString(?string $mode): ?int
    {
        switch (strtolower($mode ?? "")) {
            case "auto":
                return self::AUTO;
            case "move":
                return self::MOVE;
            case "copy":
                return self::COPY;
            default:
                return null;
        }
    }
}