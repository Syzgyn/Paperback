<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Downloader extends Model
{
    use SingleTableInheritanceTrait;

    const DOWNLOADER_TYPES = [
        'sabnzbd' => \App\Downloaders\Usenet\Sabnzbd::class, 
    ];

    protected $table = "downloaders";

    protected static $singleTableTypeField = 'class';
    protected static $singleTableSubclasses = self::DOWNLOADER_TYPES;
    protected static $persisted = ['name', 'settings', 'enable'];

    protected $casts = ['settings' => 'array'];

    protected $fillable = [
        'name',
        'class',
        'settings',
        'enable'
    ];

    public static function createChild($attrs) {
        $type = $attrs['type'];
        $class = self::getClass($type);

        $model = new $class;

        return $model->fill($attrs); 
    }

    public static function getClass(String $type) {
        return self::DOWNLOADER_TYPES[$type];
    }

    protected static function booted() {
        static::saving(function($downloader) {
            if (get_class($downloader) == self::class) {
                throw new \Exception("Cannot save base downloader class");
                }
            });
    }
}
