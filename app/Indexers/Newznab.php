<?php
namespace App\Indexers;

use App\Indexer;

class Newznab extends Indexer
{
    protected static function booted() {
        static::creating(function($indexer) {
            $indexer->class = static::class;
        });
    }
}
