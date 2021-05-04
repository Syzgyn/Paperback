<?php

namespace App\Libraries\Indexers;

use App\Libraries\Http\HttpRequest;
use App\Libraries\Http\HttpAccept;

class IndexerRequest
{
    public HttpRequest $httpRequest;

    public function __construct(string|HttpAccept $url, HttpAccept $accept = null)
    {
        if (gettype($url) === "object" && get_class($url) === HttpAccept::class) {
            $this->httpRequest = $url;
        } else {
            $this->httpRequest = new HttpRequest($url, $accept);
        }
    }
}
