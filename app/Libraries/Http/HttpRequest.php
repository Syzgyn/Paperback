<?php

namespace App\Libraries\Http;

class HttpRequest
{
    public HttpUri $url;
    public string $method = 'GET';
    /** @var array<string, string> */
    public array $headers = [];
    /** @var array<string, string> */
    public array $cookies = [];
    public ?string $contentData = null;
    /** @var HttpFormData[] */
    public array $formData = [];
    public bool $isMultipartData = false;
    public ?string $contentSummary = null;
    public bool $suppressHttpError = false;
    public bool $useSimplifiedUserAgent = false;
    public bool $allowAutoRedirect = true;
    public bool $logResponseContent = false;
    public bool $logHttpError = false;
    public ?int $rateLimit = null;
    public ?string $rateLimitKey = null;

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
