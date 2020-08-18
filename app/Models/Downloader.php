<?php

namespace App\Models;

use App\Traits\BuildSchema;
use App\Traits\CreateChild;
use App\Traits\FillCastArray;
use Illuminate\Database\Eloquent\Model;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Downloader extends Model
{
    use SingleTableInheritanceTrait;
    use FillCastArray;
    use BuildSchema;
    use CreateChild;

    const PROTOCOL = null;
    const DOWNLOADER_TYPES = [
        'sabnzbd' => \App\Models\Downloaders\Usenet\Sabnzbd::class,
    ];

    protected $table = 'downloaders';

    protected static $singleTableTypeField = 'class';
    protected static $singleTableSubclasses = self::DOWNLOADER_TYPES;
    protected static $persisted = ['name', 'settings', 'enable'];

    protected $baseSchema = [
        'fields' => [
            'name' => [
                'label' => 'Name',
                'type' => 'text',
                'validation' => ['required', 'string'],
            ],
            'enable' => [
                'label' => 'Enable',
                'type' => 'checkbox',
                'validation' => ['required', 'bool'],
            ],
            'settings.url' => [
                'label' => 'Base URL',
                'type' => 'text',
                'validation' => ['required', 'string'],
                'validationField' => 'settings.url',
            ],
        ],
    ];

    public function trackedDownloads()
    {
        return $this->hasMany('App\Models\TrackedDownload');
    }

    public static function getClass(String $type)
    {
        return self::DOWNLOADER_TYPES[$type];
    }

    protected static function getChildTypes()
    {
        return self::DOWNLOADER_TYPES;
    }

    public function getEnableAttribute()
    {
        return isset($this->attributes['enable']) ? $this->attributes['enable'] : true;
    }

    public function getProtocolAttribute()
    {
        return self::PROTOCOL;
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
