<?php

namespace App\Libraries\Http;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ConnectionException;
use GuzzleHttp\HandlerStack;
use Spatie\GuzzleRateLimiterMiddleware\RateLimiterMiddleware;

class HttpClient
{
    const MAX_REDIRECTS = 5;

    protected $client;
    
    public function __construct()
    {
        $stack = HandlerStack::create();
        $stack->push(RateLimiterMiddleware::perSecond(1, new RateLimiterStore()));

        $this->client = new Client([
            'handler' => $stack,
        ]);
    }

    public function execute(HttpRequest $request): HttpResponse
    {
        $response = $this->client->request($request->method, (string)$request->url, [
            'headers' => $request->headers,
            'http_errors' => false,
        ]);

        return new HttpResponse($request, $response);
    }
}
