<?php
namespace App\Indexers;

use App\Indexer;
use App\Repositories\NewznabRepository;

use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Newznab extends Indexer
{
    use SingleTableInheritanceTrait;

    const URL_ENDPOINT_BASE = "/api/";

    public $repository;

    protected static $singleTableType = self::class;

    protected static function booted() {
        static::creating(function($indexer) {
            $indexer->class = self::class;
        });

        static::retrieved(function($indexer) {
            $indexer->repository = new NewznabRepository($indexer);
        });
    }
}
