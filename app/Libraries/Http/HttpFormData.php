<?php

namespace App\Libraries\Http;

class HttpFormData
{
    public function __construct(
        public string $name,
        public string $contentData,
        public ?string $filename = null, 
        public ?string $contentType = null,
    )
    {
    }
}
