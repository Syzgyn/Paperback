<?php

namespace App\Libraries\Http;

class HttpRequest
{
    public HttpUri $url;
    public string $method = 'GET';
    public array $headers = [];
    public string $contentData;
    public string $contentSummary;
    public boolean $suppressHttpError;
    public DateTime $rateLimit;
    public string $rateLimitKey;

    public function __construct(string $url, ?HttpAccept $httpAccept = null)
    {
        $this->url = new HttpUri($url);

        if ($httpAccept) {
            $this->headers['Accept'] = $httpAccept->value;
        }
    }
}
