<?php

namespace App\Libraries\Http;

use GuzzleHttp\Psr7\Response;

class HttpResponse
{
    public int $statusCode;
    public array $headers;
    public HttpRequest $request;
    public string $content;

    public function __construct(HttpRequest $request, Response $response)
    {
        $this->request = $request;
        $this->headers = $response->getHeaders();
        $this->statusCode = $response->getStatusCode();
        $this->content = $response->getBody()->getContents();
    }
}
