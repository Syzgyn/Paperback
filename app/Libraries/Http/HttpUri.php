<?php

namespace App\Libraries\Http;

class HttpUri
{
    public ?string $scheme = null;
    public ?string $host = null;
    public ?int    $port = null;
    public ?string $path = null;
    public ?string $query = null;
    public ?string $fragment = null;

    protected string $uri;

    public function __construct(string $uri)
    {
        $this->uri = $uri;
        $this->parse();
    }

    public static function fromParts(string $scheme, string $host, ?int $port, ?string $path = null, ?string $query, ?string $fragment): self
    {
		$scheme   = $scheme . '://';
		$port     = isset($port) ? ':' . $port : '';
		$path     = isset($path) ? $path : '';
		$query    = isset($query) ? '?' . $query : '';
		$fragment = isset($fragment) ? '#' . $fragment : '';

		$uri = "$scheme$host$port$path$query$fragment";
		
		return new self($uri);
	}

    protected function parse(): void
    {
        $parsedData = parse_url($this->uri);

        if ($parsedData === false) {
            throw new \Exception("Uri is malformed {$this->uri}");
        }
        
        $objectProperties = ['scheme', 'host', 'port', 'path', 'query', 'fragment'];

        foreach($objectProperties as $part) { 
            $this->$part = $parsedData[$part] ?? null;
        }
    }

    public function __tostring()
    {
        return $this->uri;
    }

    public function getFullUrl(): string
    {
        return $this->uri;
    }

    public function combineWithPath(string $path): HttpUri
    {
        return HttpUri::fromParts($this->scheme ?? "", $this->host ?? "", $this->port, self::combinePath($this->path ?? "", $path), $this->query, $this->fragment);
    }

    public static function combinePath(string $basePath, ?string $relativePath = ""): string 
    {
        if (empty($relativePath)) {
            return $basePath;
        }

        if (empty($basePath))
        {
            return $relativePath;
        }
        
        return rtrim($basePath, '/') . '/' . ltrim($relativePath, '/');

    }

    public function setQuery(string $query): HttpUri
    {
        return self::fromParts($this->scheme ?? "", $this->host ?? "", $this->port, $this->path, $query, $this->fragment);
    }

    public function addQueryParam(string $key, mixed $val): HttpUri
    {
        $data = [$key => $val];
        $newQuery = http_build_query($data);

        if (!empty($this->query)) {
            $newQuery = $this->query . '&' . $newQuery;
        }

        return $this->setQuery($newQuery);
    }

    public function addQueryParams(array $params): HttpUri
    {
        $newQuery = http_build_query($params);

        if (!empty($this->query)) {
            $newQuery = $this->query . '&' . $newQuery;
        }

        return $this->setQuery($newQuery);
    }

    protected static function combineRelativePath(string $basePath, string $relativePath): string
    {
        if (empty($relativePath)) {
            return $basePath;
        }

        if (str_starts_with($relativePath, '/')) {
            return $relativePath;
        }

        $baseSlashIndex = strrpos($basePath, '/');

        if ($baseSlashIndex !== false && $baseSlashIndex >= 0) {
            return substr($basePath, 0, $baseSlashIndex) . '/' . $relativePath;
        }

        return $relativePath;
    }

    public function add(HttpUri $relativeUri): HttpUri
    {
        if (!empty($relativeUri->scheme)) {
            return $relativeUri;
        }

        if (!empty($relativeUri->host)) {
            return self::fromParts($this->scheme ?? "", $relativeUri->host, $relativeUri->port, $relativeUri->path, $relativeUri->query, $relativeUri->fragment);
        }

        if (!empty($relativeUri->path)) {
            return self::fromParts($this->scheme ?? "", $this->host ?? "", $this->port, self::combineRelativePath($this->path ?? "", $relativeUri->path), $relativeUri->query, $relativeUri->fragment);
        }

        return self::fromParts($this->scheme ?? "", $this->host ?? "", $this->port, $this->path, $relativeUri->query, $relativeUri->fragment);
    }
}
