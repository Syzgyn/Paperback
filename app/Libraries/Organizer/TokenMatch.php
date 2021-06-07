<?php

namespace App\Libraries\Organizer;

class TokenMatch
{
    /**
     * Class constructor.
     */
    public function __construct(
        public array $match,
        public string $prefix,
        public string $separator,
        public string $suffix,
        public string $token,
        public string $customFormat,
    ) {}
}