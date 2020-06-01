<?php
namespace App\Indexers;

use App\Indexer;
use App\Repositories\Indexers\NewznabRepository;

use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Newznab extends Indexer
{
    use SingleTableInheritanceTrait;

    const URL_ENDPOINT_BASE = "/api/";

    public $repository;

    protected static $singleTableType = self::class;

    public function search($query, $offset = 0) {
        return $this->repository->search($query, $offset);
    }

    protected static function booted() {
        static::creating(function($indexer) {
            $indexer->class = self::class;
        });

        static::retrieved(function($indexer) {
            $indexer->repository = new NewznabRepository($indexer);
            $indexer->class = self::class;
        });
    }
}
