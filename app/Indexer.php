<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Indexer extends Model
{
    const INDEXER_TYPES = [
        'newznab' => \App\Indexers\Newznab::class,
    ];

    protected $table = "indexers";
    protected $casts = ['settings' => 'array'];

    protected $fillable = [
        'name',
        'class',
        'settings',
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

        static::retrieved(function($indexer) {
        });

        static::saving(function($indexer) {
        });
    }
}
