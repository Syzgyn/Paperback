<?php

namespace App\Libraries\Indexers\Exceptions;

class IndexerException extends \Exception
{
    public function __construct(protected HttpResponse $response, $message = null, $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
