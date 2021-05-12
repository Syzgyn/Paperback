<?php

namespace App\Libraries\Download;

class DownloadProtocol
{
    const UNKNOWN = 0;
    const USENET = 1;
    const TORRENT = 2;

    public static function fromStr(string $str): int
    {
        switch ($str) {
            case "usenet":
                return self::USENET;
            case "torrent":
                return self::TORRENT;
            default:
                return self::UNKNOWN;
        }
    }
}