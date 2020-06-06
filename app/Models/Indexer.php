<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Indexer extends Model
{
    use SingleTableInheritanceTrait;

    const INDEXER_TYPES = [
        'newznab' => \App\Indexers\Newznab::class,
    ];

    protected $table = "indexers";

    protected static $singleTableTypeField = 'class';
    protected static $singleTableSubclasses = self::INDEXER_TYPES;
    protected static $persisted = ['name', 'settings', 'enable_search'];

    protected $casts = ['settings' => 'array'];

    protected $fillable = [
        'name',
        'class',
        'settings',
        'enable_search',
    ];

    public static function createChild($attrs) {
        $type = $attrs['type'];
        $class = self::getClass($type);

        return $class::create($attrs);
    }

    public static function getClass(String $type) {
        return self::INDEXER_TYPES[$type];
    }

    protected static function booted() {
        static::saving(function($indexer) {
            if (get_class($indexer) == self::class) {
                throw new \Exception("Cannot save base indexer class");
                }
            });
    }
}
