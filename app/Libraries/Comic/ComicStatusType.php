<?php

namespace App\Libraries\Comic;

use Exception;

class ComicStatusType
{
    public const DELETED = -1;
    public const CONTINUING = 0;
    public const ENDED = 1;
    public const UPCOMING = 2;

    /** @return ComicStatusType::* */
    public static function fromString(string $status): int
    {
        switch ($status) {
            case "deleted":
                return self::DELETED;
            case "continuing":
                return self::CONTINUING;
            case "ended":
                return self::ENDED;
            case "upcoming":
                return self::UPCOMING;
        }

        throw new Exception("Unknown status type");
    }
}