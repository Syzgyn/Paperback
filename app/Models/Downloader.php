<?php

namespace App\Models;

use App\Traits\BuildSchema;
use App\Traits\CreateChild;
use App\Traits\MoveAttributes;
use Illuminate\Database\Eloquent\Model;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Downloader extends Model
{
    use SingleTableInheritanceTrait;
    use MoveAttributes;
    use BuildSchema;
    use CreateChild;

    const DOWNLOADER_TYPES = [
        'sabnzbd' => \App\Models\Downloaders\Usenet\Sabnzbd::class,
    ];

    protected $table = 'downloaders';

    protected static $singleTableTypeField = 'class';
    protected static $singleTableSubclasses = self::DOWNLOADER_TYPES;
    protected static $persisted = ['name', 'settings', 'enable'];

    protected $casts = ['settings' => 'array'];

    protected $fillable = [
        'name',
        'class',
        'settings',
        'enable',
    ];

    protected $baseSchema = [
        'fields' => [
            'url' => [
                'label' => 'Base URL',
                'type' => 'text',
                'validation' => ['required', 'string'],
                'validationField' => 'settings.url',
            ],
        ],
    ];

    public static function getClass(String $type)
    {
        return self::DOWNLOADER_TYPES[$type];
    }

    protected static function getChildTypes()
    {
        return self::DOWNLOADER_TYPES;
    }

    protected static function booted()
    {
        static::saving(function ($downloader) {
            if (get_class($downloader) == self::class) {
                throw new \Exception('Cannot save base downloader class');
            }
        });
    }
}
