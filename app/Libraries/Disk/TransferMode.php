<?php

namespace App\Libraries\Disk;

class TransferMode
{
    public const NONE = 0;
    public const MOVE = 1;
    public const COPY = 2;
    public const HARDLINK = 4;

    public const HARDLINK_OR_COPY = self::HARDLINK | self::COPY;
}