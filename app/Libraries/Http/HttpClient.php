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
        //TODO: move this to per-request handler, using rate limiter key
        $stack = HandlerStack::create();
        $stack->push(RateLimiterMiddleware::perSecond(1, new RateLimiterStore()));

        $this->client = new Client([
            'handler' => $stack,
        ]);
    }

    public function execute(HttpRequest $request): HttpResponse
    {
        $options = $this->compileOptions($request);

        $response = $this->client->request($request->method, (string)$request->url, $options);

        return new HttpResponse($request, $response);
    }
    
    protected function compileOptions(HttpRequest $request): array
    {
        $options = [
            'http_errors' => $request->suppressHttpError,
            'allow_redirect' => $request->allowAutoRedirect,
        ];

        //TODO: user agent
        if (empty($request->headers['User-Agent'])) {
            $request->headers['User-Agent'] = HttpUserAgentBuilder::getUserAgent($request->useSimplifiedUserAgent);
        }

        if (!empty($request->headers)) {
            $options['headers'] = $request->headers;
        }

        if (isset($request->contentData)) {
            $options['body'] = $request->contentData;
        } elseif (isset($request->formData)) {
            $key = $request->isMultipartData ? "multipart" : "form_params";

            $options[$key] = $request->formData;
        }

        return $options;
    }

    public function get(HttpRequest $request): HttpResponse
    {
        $request->method = 'get';
        return $this->execute($request);
    }
}
