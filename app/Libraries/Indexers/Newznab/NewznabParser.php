<?php

namespace App\Libraries\Indexers\Newznab;

use App\Libraries\Indexers\RssParser;
use SimpleXMLElement;
use App\Libraries\Indexers\Exceptions\ApiKeyException;
use App\Libraries\Indexers\Exceptions\RequestLimitReachedException;

class NewznabParser extends RssParser
{
    const NS = "{http://www.newznab.com/DTD/2010/feeds/attributes/}";

    public function __construct()
    {
        $this->preferredEnclosureMimeTypes = static::$usenetEnclosureMimeTypes;
        $this->useEnclosureUrl = true;
        $this->useEnclosureLength = true;
        $this->useGuidInfoUrl = true;
    }

    protected function preProcess(): bool
    {
        $document = $this->loadXmlDocument();

        $this->checkError($document);

        return true;
    }

    protected function checkError(SimpleXMLElement $document): void
    {
        $errors = $document->xpath('//error');

        if (empty($errors)) {
            return;
        }

        $error = array_shift($errors);
        $code = (string)$error['code'];
        $message = (string)$error['description'];

        if ($code >= 100 && $code <= 199) {
            throw new ApiKeyException($message);
        }

        if (!str_contains($this->response->request->url->getFullUrl(), "apikey=") && 
            ($message === "Missing parameter" || str_contains($message, "apikey"))
        ) {
            throw new ApiKeyException("Indexer requires an API key");
        }

        if ($message === "Request limit reached") {
            throw new RequestLimitReachedException("API limit reached");
        }

        throw new NewznabException($message);
    }
}
