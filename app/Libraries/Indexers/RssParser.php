<?php

namespace App\Libraries\Indexers;

use App\Libraries\Http\HttpResponse;
use App\Libraries\Http\HttpUri;
use SimpleXMLElement;
use DateTime;
use App\Libraries\Parser\ReleaseInfo;
use App\Libraries\Indexers\Exceptions\UnsupportedFeedException;
use App\Libraries\Indexers\Exceptions\SizeParsingException;
use App\Libraries\Indexers\Exceptions\IndexerException;

class RssParser
{
    const NzbEnclosureMimeType = "application/x-nzb";
    const TorrentEnclosureMimeType = "application/x-bittorrent";
    const MagnetEnclosureMimeType = "application/x-bittorrent;x-scheme-handler/magnet";

    public static array $usenetEnclosureMimeTypes = [ self::NzbEnclosureMimeType ];
    public static array $torrentEnclosureMimeTypes = [ self::TorrentEnclosureMimeType, self::MagnetEnclosureMimeType ];

    // Use the 'guid' element content as InfoUrl
    public bool $useGuidInfoUrl = false;

    // Use the enclosure as download url and/or length
    public bool $useEnclosureUrl = false;
    public bool $useEnclosureLength = false;

    // Parse "Size: 1.3 GB" or "1.3 GB" parts in the description element and use that as Size.
    public bool $parseSizeInDescription = false;

    public array $preferredEnclosureMimeTypes = [];

    protected HttpResponse $response;

    public function __construct()
    {
    }

    public function parseResponse(HttpResponse $response): ?array
    {
        $this->response = $response;

        $results = [];

        if (!$this->preProcess()) {
            return $results;
        }

        $document = $this->loadXmlDocument();
        $items = $this->getItems($document);

        foreach($items as $item) {
            try {
                $reportInfo = $this->processItem($item);
                if ($reportInfo) {
                    $results[] = $reportInfo;
                }
            } catch (\Exception $e) {
                //TODO: Log error
                throw $e;
            }
        }

        if (!$this->postProcess($items, $results)) {
            return [];
        }

        return $results;
    }

    protected function preProcess(): bool
    {
        if ($this->response->statusCode !== 200) {
           throw new IndexerException("Indexer API call resulted in an unexpected StatusCode " . $this->response->statusCode);
        }

        // If we returned text/html and didn't request it...
        if (isset($this->response->headers['Content-Type']) && isset($this->response->request->headers['Accept'])) {
            $contentTypes = implode(',', $this->response->headers['Content-Type']);
            if (str_contains($contentTypes, 'text/html') && !str_contains($this->response->request->headers['Accept'], 'text/html')) {
                throw new IndexerException("Indexer responded with html content. Site is likely blocked or unavailable.");
            }
        }

        return true;
    }

    protected function postProcess(array &$items, array &$releases): bool
    {
        return true;
    }

    protected function loadXmlDocument(): SimpleXMLElement|false
    {
        //libxml_use_internal_errors(true);
        $content = $this->response->content;
        //Replace HTML entities
        //$content = html_entity_decode($content);
        //Remove unicode characters
        $content = preg_replace('/[\x00-\x1F\x7F]/u', '', $content);

        return simplexml_load_string($content);
    }

    protected function getItems(SimpleXMLElement $document)
    {
        $items = [];
        try {
            foreach($document->channel->item as $item) {
                $items[] = $item;
            }
        } catch (\ErrorException $e) {
        }
        return $items;
    }
    
    protected function processItem(SimpleXMLElement $item): ReleaseInfo
    {
        $releaseInfo = new ReleaseInfo();
        $releaseInfo->guid = $this->getGuid($item);
        $releaseInfo->title = $this->getTitle($item);
        $releaseInfo->publishDate = $this->getPublishDate($item);
        $releaseInfo->downloadUrl = $this->getDownloadUrl($item);
        $releaseInfo->infoUrl = $this->getInfoUrl($item);
        $releaseInfo->commentUrl = $this->getCommentUrl($item);

        try {
            $releaseInfo->size = $this->getSize($item);
        } catch (\Exception $e) {
            throw new SizeParsingException("Unable to parse size from: " . $releaseInfo->title);
        }

        return $releaseInfo;
    }

    protected function getGuid(SimpleXMLElement $item): ?string
    {
        return $item->guid ?? null;
    }

    protected function getTitle(SimpleXMLElement $item): ?string
    {
        return $item->title ?? null;
    }

    protected function getPublishDate(SimpleXMLElement $item): DateTime
    {
        $pubDate = $item->pubDate ?? null;

        if ($pubDate) {
            return new DateTime($pubDate);
        }

        throw new UnsupportedFeedException("Rss feed must have a pubDate element with a valid publish date.");
    }

    protected function getDownloadUrl(SimpleXMLElement $item): ?string
    {
        if ($this->useEnclosureUrl) {
            $enclosure = $this->getEnclosure($item);
            return $enclosure ? $this->parseUrl($enclosure['url']) : null;
        }

        return $this->parseUrl((string)$item->link);
    }

    protected function getInfoUrl(SimpleXMLElement $item): ?string
    {
        if ($this->useGuidInfoUrl) {
            return $this->parseUrl((string)$item->guid);
        }

        return null;
    }

    protected function getCommentUrl(SimpleXMLElement $item): ?string
    {
        return $this->parseUrl((string)$item->comments);
    }

    protected function getSize(SimpleXMLElement $item): int
    {
        if ($this->useEnclosureLength) {
            return $this->getEnclosureLength($item);
        }

        if ($this->parseSizeInDescription && !empty($item->description)) {
            return $this->parseSize((string)$item->description, true);
        }

        return 0;
    }

    protected function getEnclosureLength(SimpleXMLElement $item): int
    {
        $enclosure = $this->getEnclosure($item);

        if ($enclosure) {
            return $enclosure['length'];
        }

        return 0;
    }

    protected function getEnclosureType(SimpleXMLElement $item): ?string
    {
        $enclosure = $this->getEnclosure($item);

        if ($enclosure) {
            return $enclosure['type'];
        }

        return null;
    }

    protected function getEnclosures(SimpleXMLElement $item): array
    {
        return array_map(function($element) {
            return [
                'url' => (string)$element['url'] ?? null,
                'type' => (string)$element['type'] ?? null,
                'length' => (int)$element['length'] ?? 0,
            ];
        }, iterator_to_array($item->enclosure, false));
    }

    protected function getEnclosure(SimpleXMLElement $item, bool $enforceMimeType = true): ?array
    {
        $enclosures = $this->getEnclosures($item);

        if (count($enclosures) === 0) {
            return null;
        }

        if ($this->preferredEnclosureMimeTypes != null) {
            foreach ($this->preferredEnclosureMimeTypes as $mimeType) {
                $filteredEnclosures = array_filter($enclosures, function($enc) use ($mimeType) {
                    return $enc['type'] === $mimeType;
                });

                if (!empty($filteredEnclosures)) {
                    return $filteredEnclosures[0];
                }
            }

            if ($enforceMimeType) {
                return null;
            }
        }

        return $enclosures[0];
    }

    protected function parseUrl(string $value): ?string
    {
        if (empty($value)) {
            return null;
        }

        try {
            $url = $this->response->request->url->add(new HttpUri($value));
            return (string)$url;
        } catch(\Exception $e) {
            //TODO: log error
            return null;
        }
    }

    public function parseSize(string $sizeString, bool $defaultToBinaryPrefix): int
    {
        if (empty($sizeString)) {
            return 0;
        }

        if (is_numeric($sizeString)) {
            return (int)$sizeString;
        }

        $matches = [];
        
        //TODO: Parse size string

        return 0;
    }
}
