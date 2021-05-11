<?php

namespace App\Libraries\Http;

class HttpUserAgentBuilder
{
    public static function getUserAgent(bool $simplified = false): string
    {
        //TODO: Proper versioning / system info
        if ($simplified) {
            return "Paperback/0.1";
        }

        return "Paperback/0.1 (" . PHP_OS . ")";
    }
}
