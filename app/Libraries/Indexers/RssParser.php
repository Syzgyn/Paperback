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
use Illuminate\Support\Facades\Log;
use Traversable;

class RssParser
{
    const NzbEnclosureMimeType = "application/x-nzb";
    const TorrentEnclosureMimeType = "application/x-bittorrent";
    const MagnetEnclosureMimeType = "application/x-bittorrent;x-scheme-handler/magnet";

    /** @var string[] */
    public static array $usenetEnclosureMimeTypes = [ self::NzbEnclosureMimeType ];
    /** @var string[] */
    public static array $torrentEnclosureMimeTypes = [ self::TorrentEnclosureMimeType, self::MagnetEnclosureMimeType ];

    // Use the 'guid' element content as InfoUrl
    public bool $useGuidInfoUrl = false;

    // Use the enclosure as download url and/or length
    public bool $useEnclosureUrl = false;
    public bool $useEnclosureLength = false;

    // Parse "Size: 1.3 GB" or "1.3 GB" parts in the description element and use that as Size.
    public bool $parseSizeInDescription = false;

    /** @var string[] */
    public array $preferredEnclosureMimeTypes = [];

    protected ?HttpResponse $response = null;

    public function __construct()
    {
    }

    public function parseResponse(HttpResponse $response): array
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
                $results[] = $this->processItem($item);
            } catch (\Exception $e) {
                Log::error("An error occured while processing feed item from " . $response->request->url,
                    ['exception' => $e]);
            }
        }

        if (!$this->postProcess($items, $results)) {
            return [];
        }

        return $results;
    }

    protected function preProcess(): bool
    {
        if ($this->response == null) {
            throw new IndexerException("Indexer API call tried to process an empty response");
            
        }
        if ($this->response->statusCode !== 200) {
           throw new IndexerException("Indexer API call resulted in an unexpected StatusCode " . $this->response->statusCode);
        }

        // If we returned text/html and didn't request it...
        if (isset($this->response->headers['Content-Type']) && isset($this->response->request->headers['Accept'])) {
            if (gettype($this->response->headers['Content-Type']) != "string") {
                throw new IndexerException("Indexer responded with an unknown Content-Type, got: " . print_r($this->response->headers['Content-Type'], true));
            }

            if (str_contains($this->response->headers['Content-Type'], 'text/html') && !str_contains($this->response->request->headers['Accept'], 'text/html')) {
                throw new IndexerException("Indexer responded with html content. Site is likely blocked or unavailable.");
            }
        }

        return true;
    }

    /** @param SimpleXMLElement[] $items */
    protected function postProcess(array &$items, array &$releases): bool
    {
        return true;
    }

    protected function loadXmlDocument(): SimpleXMLElement
    {
        if ($this->response == null || $this->response->content == null) {
            throw new \Exception("Unable to parse XML: No content found");    
        }

        libxml_use_internal_errors(true);
        $content = $this->response->content;
        //Replace HTML entities
        //$content = html_entity_decode($content);
        //Remove unicode characters
        $content = preg_replace('/[\x00-\x1F\x7F]/u', '', $content);

        $xml = simplexml_load_string($content);

        if ($xml === false) {
            $errors = libxml_get_errors();
            $firstError = array_shift($errors);
            throw new \Exception(sprintf("Unable to parse XML: Issue %s on line %s, column %s", $firstError->code, $firstError->line, $firstError->column));
        }

        return $xml;
    }

    /** @return SimpleXMLElement[] */
    protected function getItems(SimpleXMLElement $document): array
    {
        $items = [];

        if (empty($document->channel) || !($document->channel instanceof SimpleXMLElement) || empty($document->channel->item)) {
            return [];
        }

        try {
            /** @var SimpleXMLElement $item */
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
        $releaseInfo->title = $this->getTitle($item) ?? "Unknown Title";
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
        if (empty($item->guid)) {
            return null;
        }
        return (string) $item->guid;
    }

    protected function getTitle(SimpleXMLElement $item): ?string
    {
        if (empty($item->title)) {
            return null;
        }
        return (string) $item->title;
    }

    protected function getPublishDate(SimpleXMLElement $item): DateTime
    {
        if (empty($item->pubDate)) {
            throw new UnsupportedFeedException("Rss feed must have a pubDate element with a valid publish date.");
        }

        $pubDate = (string) $item->pubDate;
        return new DateTime($pubDate);
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

    /** @return array<array-key, array{url: string, type: string, length: int}> */
    protected function getEnclosures(SimpleXMLElement $item): array
    {
        if (!($item->enclosure instanceof Traversable)) {
            return [];
        }

        return array_map(function(SimpleXMLElement $element) {
            return [
                'url' => (string)$element['url'],
                'type' => (string)$element['type'],
                'length' => (int)$element['length'],
            ];
        }, iterator_to_array($item->enclosure, false));
    }

    /** @return array{url: string, type: string, length: int}|null */
    protected function getEnclosure(SimpleXMLElement $item, bool $enforceMimeType = true): ?array
    {
        $enclosures = $this->getEnclosures($item);

        if (count($enclosures) === 0) {
            return null;
        }

        if ($this->preferredEnclosureMimeTypes != null) {
            foreach ($this->preferredEnclosureMimeTypes as $mimeType) {
                $filteredEnclosures = array_filter($enclosures, function(array $enc) use ($mimeType) {
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
        if (empty($value) || $this->response == null) {
            return null;
        }

        try {
            $url = $this->response->request->url->add(new HttpUri($value));
            return (string)$url;
        } catch(\Exception $e) {
            Log::debug(sprintf("Failed to parse url %s, ignoring.", $value), ['exception' => $e]);
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
