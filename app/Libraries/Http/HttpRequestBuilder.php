<?php

namespace App\Libraries\Http;

use Exception;
use Closure;

class HttpRequestBuilder
{
    public string $method;
    public ?string $httpAccept = null;
    public HttpUri $baseUrl;
    public string $resourceUrl;
    public array $queryParams = [];
    public array $suffixQueryParams = [];
    /** @var array<array-key, float|int|string> */
    public array $segments = [];
    /** @var array<string, string> */
    public array $headers = [];
    public bool $suppressHttpError = false;
    public bool $logHttpError = false;
    public bool $useSimplifiedUserAgent = false;
    public bool $allowAutoRedirect = false;
    public int $rateLimit = -1; 
    public bool $logResponseContent = false;
    public ?string $username = null;
    public ?string $password = null;
    /** @var array<string, string> */
    public array $cookies = [];
    /** @var HttpFormData[] */
    public array $formData = [];
    public ?Closure $postProcess = null;

    public function __construct(string $baseUrl)
    {
        $this->baseUrl = new HttpUri($baseUrl);
        $this->resourceUrl = "";
        $this->method = HttpMethod::GET;
        $this->logHttpError = true;
    }

    public static function buildBaseUrl(bool $useHttps, string $host, int $port, ?string $urlBase = null): string
    {
        $protocol = $useHttps ? 'https' : 'http';

        if (!empty($urlBase) && !str_starts_with($urlBase, '/')) {
            $urlBase = '/' . $urlBase;
        }

        return sprintf("%s://%s:%s%s", $protocol, $host, $port, $urlBase ?? "");
    }

    protected function createUri(): HttpUri
    {
        $url = $this->baseUrl->combineWithPath($this->resourceUrl)->addQueryParams($this->queryParams + $this->suffixQueryParams);

        if (!empty($this->segments)) {
            $fullUri = $url->getFullUrl();

            $fullUri = str_replace(array_keys($this->segments), $this->segments, $fullUri);

            $url = new HttpUri($fullUri);
        }

        return $url;
    }

    protected function createRequest(): HttpRequest
    {
        return new HttpRequest($this->createUri()->getFullUrl(), $this->httpAccept);
    }

    protected function apply(HttpRequest &$request): void
    {
        $request->method = $this->method;
        $request->suppressHttpError = $this->suppressHttpError;
        $request->logHttpError = $this->logHttpError;
        $request->useSimplifiedUserAgent = $this->useSimplifiedUserAgent;
        $request->allowAutoRedirect = $this->allowAutoRedirect;
        $request->rateLimit = $this->rateLimit;
        $request->logResponseContent = $this->logResponseContent;

        if (isset($this->username) && isset($this->password)) {
            $request->addBasicAuthentication($this->username, $this->password);
        }

        foreach ($this->headers as $key => $val) {
            $request->headers[$key] = $val;
        }

        foreach ($this->cookies as $key => $val) {
            $request->cookies[$key] = $val;
        }

        $this->applyFormData($request);
    }

    public function build(): HttpRequest
    {
        $request = $this->createRequest();
        $this->apply($request);

        if ($this->postProcess != null) {
            ($this->postProcess)($request);
        }

        return $request;
    }

    public function __clone()
    {
        $this->baseUrl = clone $this->baseUrl;
        $this->formData = array_map(fn($o) => clone $o, $this->formData);
    }

    public function createFactory(): HttpRequestBuilderFactory
    {
        return new HttpRequestBuilderFactory($this);
    }

    protected function applyFormData(HttpRequest &$request): void
    {
        if (empty($this->formData)) {
            return;
        }

        if (!empty($request->contentData)) {
            throw new Exception("Cannot send HttpRequest Body and FormData simultaneously");
        }

        $isMultipartData = count(array_filter($this->formData, fn($c) => $c->contentType != null || $c->filename != null || strlen($c->contentData) > 1024)) > 0;

        $output = [];
        if ($isMultipartData) {
            foreach ($this->formData as $formData) {
                if (empty($formData->name)) {
                    throw new Exception("Missing FormData name for: " . $formData->contentData);
                }

                $data = [
                    'name' => $formData->name,
                    'contents' => !empty($formData->contentData) ? $formData->contentData : "",
                ];

                if (!empty($formData->filename)) {
                    $data['filename'] = $formData->filename;
                }

                if (!empty($formData->contentType)) {
                    $data['headers'] = ['Content-Type' => $formData->contentType];
                }

                $output[] = $data; 
            }
        } else {
            foreach ($this->formData as $formData) {
                $output[$formData->name] = $formData->contentData;
            }
        }
        
        $request->isMultipartData = $isMultipartData;
        $request->formData = $output; 
    }

    public function resource(string $resourceUrl): HttpRequestBuilder
    {
        if (empty($this->resourceUrl) || str_starts_with($resourceUrl, "/")) {
            $this->resourceUrl = ltrim($resourceUrl, '/');
        } else {
            $this->resourceUrl = sprintf("%s/%s", rtrim($this->resourceUrl, '/'), $resourceUrl);
        }

        return $this;
    }

    public function withRateLimit(int $seconds): HttpRequestBuilder
    {
        $this->rateLimit = $seconds;

        return $this;
    }

    public function post(): HttpRequestBuilder
    {
        $this->method = HttpMethod::POST; 
        
        return $this;
    }

    public function accept(string $accept): HttpRequestBuilder
    {
        $this->httpAccept = $accept;
        
        return $this;
    }

    public function setHeader(string $name, string $value): HttpRequestBuilder
    {
        $this->headers[$name] = $value;
        
        return $this;
    }

    public function addQueryParam(string $key, string $value, bool $replace = false): HttpRequestBuilder
    {
        if ($replace) {
            unset($this->queryParams[$key]);
            unset($this->suffixQueryParams[$key]);
        }

        $this->queryParams[$key] = $value;

        return $this;
    }

    public function addSuffixQueryParam(string $key, string $value, bool $replace = false): HttpRequestBuilder
    {
        if ($replace) {
            unset($this->queryParams[$key]);
            unset($this->suffixQueryParams[$key]);
        }

        $this->suffixQueryParams[$key] = $value;

        return $this;
    }

    public function setSegment(string $segment, string $value, bool $dontCheck = false): HttpRequestBuilder
    {
        $key = "{" . $segment . "}";

        if (!$dontCheck && ! str_contains((string) $this->createUri(), $key)) {
            throw new Exception("Segment $segment is not defined in Uri");
        }

        $this->segments[$key] = $value;

        return $this;
    }

    /** @param array<string, string> $cookies */
    public function setCookies(array $cookies): HttpRequestBuilder
    {
        foreach($cookies as $key => $value) {
            $this->cookies[$key] = $value;
        }

        return $this;
    }

    public function setCookie(string $key, string $value): HttpRequestBuilder
    {
        $this->cookies[$key] = $value;

        return $this;
    }

    public function addFormParameter(string $key, string $value): HttpRequestBuilder
    {
        if ($this->method != HttpMethod::POST) {
            throw new Exception("HttpRequest Method must be POST to add FormParameter");
        }

        $this->formData[] = new HttpFormData($key, $value);
        
        return $this;
    }

    public function addFormUpload(string $key, string $filename, string $data, string $contentType = "application/octet-stream"): HttpRequestBuilder
    {
        if ($this->method != HttpMethod::POST) {
            throw new Exception("HttpRequest Method must be POST to add FormParameter");
        }

        $this->formData[] = new HttpFormData($key, $data, $filename, $contentType);
        
        return $this;
    }
}
