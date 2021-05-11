<?php

namespace App\Libraries\Http;

class HttpRequestBuilderFactory
{
    protected HttpRequestBuilder $rootBuilder;

    public function __construct(HttpRequestBuilder $builder)
    {
        $this->rootBuilder = clone $builder;
    }

    public function create(): HttpRequestBuilder
    {
        return clone $this->rootBuilder;
    }
}

