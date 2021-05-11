<?php

namespace App\Libraries\Http;

class HttpRequest
{
    public HttpUri $url;
    public string $method = 'GET';
    public array $headers = [];
    public string $contentData;
    public array $formData;
    public bool $isMultipartData = false;
    public string $contentSummary;
    public bool $suppressHttpError = false;
    public bool $useSimplifiedUserAgent = false;
    public bool $allowAutoRedirect = true;
    public bool $logResponseContent = false;
    public bool $logHttpError = false;
    public int $rateLimit;
    public string $rateLimitKey;

    public function __construct(string $url, ?string $httpAccept = null)
    {
        $this->url = new HttpUri($url);

        if ($httpAccept) {
            $this->headers['Accept'] = $httpAccept;
        }
    }

    public function addBasicAuthentication(string $username, string $password): void
    {
        $authInfo = $username . ":" . $password;
        $authInfo = base64_encode($authInfo);
        $this->headers["Authorization"] =  "Basic " . $authInfo;
    }
}
