<?php

namespace App\Libraries\Indexers\Newznab;

use App\Libraries\Indexers\RssParser;
use SimpleXMLElement;
use DateTime;
use App\Libraries\Parser\ReleaseInfo;
use App\Libraries\Indexers\Exceptions\ApiKeyException;
use App\Libraries\Indexers\Exceptions\RequestLimitReachedException;

class NewznabParser extends RssParser
{
    const NS = "{http://www.newznab.com/DTD/2010/feeds/attributes/}";

    public function __construct()
    {
        $this->preferredEnclosureMimeTypes = static::$usenetEnclosureMimeTypes;
        $this->useEnclosureUrl = true;
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

        assert($this->response != null);

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

    /** @param SimpleXMLElement[] $items */
    protected function postProcess(array &$items, array &$releases): bool
    {
        $enclosureTypes = array_filter(array_unique(array_map(function($item) {
            return $this->getEnclosureType($item);
        }, $items)));

        if (count($enclosureTypes) > 0 && count(array_intersect($enclosureTypes, $this->preferredEnclosureMimeTypes)) === 0) {
            if (count(array_intersect($enclosureTypes, $this->torrentEnclosureMimeTypes)) > 0) {
                //TODO
                //_logger.Warn("{0} does not contain {1}, found {2}, did you intend to add a Torznab indexer?", indexerResponse.Request.Url, NzbEnclosureMimeType, enclosureTypes[0]);
            } else {
                //TODO
                //_logger.Warn("{1} does not contain {1}, found {2}.", indexerResponse.Request.Url, NzbEnclosureMimeType, enclosureTypes[0]);
            }
        }
        
        return true;
    }

    protected function processItem(SimpleXMLElement $item): ReleaseInfo
    {
        $releaseInfo = parent::processItem($item);
        $releaseInfo->fileCount = $this->getFileCount($item);

        return $releaseInfo;
    }

    protected function getFileCount(SimpleXMLElement $item): ?int
    {
        $count = $this->tryGetNewznabAttribute($item, 'files');
        if (!empty($count)) {
            return (int) $count;
        }

        return null;
    }

    protected function getInfoUrl(SimpleXMLElement $item): ?string
    {
        return $this->parseUrl(preg_replace('/#comments$/', '', (string)$item->comments));
    }

    protected function getSize(SimpleXMLElement $item): int
    {
        $size = $this->tryGetNewznabAttribute($item, 'size');

        if (!empty($size) && is_numeric($size)) {
            return (int) $size;
        }

        return $this->getEnclosureLength($item);
    }

    protected function getPublishDate(SimpleXMLElement $item): DateTime
    {
        $date = $this->tryGetNewznabAttribute($item, 'usenetdate');

        if (!empty($date)) {
            return new DateTime($date);
        }

        return parent::getPublishDate($item);
    }

    protected function tryGetNewznabAttribute(SimpleXMLElement $item, string $attribute, string $defaultValue = ""): string
    {
        /** @var SimpleXMLElement */
        $elements = $item->children('newznab', true);

        /** @var SimpleXMLElement $element */
        foreach($elements->attr as $element) {
            if ((string)$element->attributes()['name'] === $attribute) {
                return (string)$element->attributes()['value'];
            }
        }
        
        return $defaultValue;
    }
}
