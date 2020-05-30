<?php
namespace App\Indexers;

use App\Indexer;
use App\Events\Indexers\NewznabRetrieved;
use GuzzleHttp\Client;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Newznab extends Indexer
{
    use SingleTableInheritanceTrait;

    const URL_ENDPOINT_BASE = "/api";

    public $client;

    protected static $singleTableType = self::class;

    protected static function booted() {
        static::creating(function($indexer) {
            $indexer->class = self::class;
        });

        static::retrieved(function($indexer) {
            $indexer->client = new Client([
                'base_uri' => trim($indexer->settings['url'], '/') . self::URL_ENDPOINT_BASE,
            ]);
        });
    }
}
