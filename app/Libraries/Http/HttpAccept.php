<?php

namespace App\Libraries\Http;

final class HttpAccept
{
    public function __construct(public string $value)
    {
    }

    public function __tostring()
    {
        return $this->value;
    }

    public static function Rss(): HttpAccept
    {
        return new self("application/rss+xml, text/rss+xml, application/xml, text/xml");
    }

    public static function Json(): HttpAccept
    {
        return new self("application/json");
    }

    public static function Html(): HttpAccept
    {
        return new self("text/html");
    }
}
