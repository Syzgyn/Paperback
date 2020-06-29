<?php

namespace App\Models;

use App\Traits\BuildSchema;
use App\Traits\CreateChild;
use App\Traits\FillCastArray;
use Illuminate\Database\Eloquent\Model;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Indexer extends Model
{
    use SingleTableInheritanceTrait;
    use FillCastArray;
    use BuildSchema;
    use CreateChild;

    const INDEXER_TYPES = [
        'newznab' => \App\Models\Indexers\Newznab::class,
    ];

    const CACHE_PREFIX = '.indexer';
    const CACHE_TIME = 1800; //30 Min

    protected $table = 'indexers';

    protected static $singleTableTypeField = 'class';
    protected static $singleTableSubclasses = self::INDEXER_TYPES;
    protected static $persisted = ['name', 'settings', 'enable_search'];

    protected $baseSchema = [
        'fields' => [
            'name' => [
                'label' => 'Name',
                'type' => 'text',
                'validation' => ['required', 'string'],
            ],
            'enableSearch' => [
                'label' => 'Enable Search',
                'type' => 'checkbox',
                'validation' => ['required', 'bool'],
            ],
            'settings.url' => [
                'label' => 'Base URL',
                'type' => 'text',
                'validation' => ['required', 'string'],
            ],
        ],
    ];

    public static function getClass(String $type)
    {
        return self::INDEXER_TYPES[$type];
    }

    protected static function getChildTypes()
    {
        return self::INDEXER_TYPES;
    }

    protected static function booted()
    {
        static::saving(function ($indexer) {
            if (get_class($indexer) == self::class) {
                throw new \Exception('Cannot save base indexer class');
            }
        });
    }

    public function getEnableSearchAttribute()
    {
        return isset($this->attributes['enable_search']) ? $this->attributes['enable_search'] : true;
    }

    public function setEnableSearchAttribute($value)
    {
        $this->attributes['enable_search'] = $value;
    }

    public function buildSearchQuery(int $cvid)
    {
        $comicvine = resolve('ComicVineRepository');
        $issue = $comicvine->issue($cvid);

        $releaseDate = $issue['release_date'];
        $year = date('Y', strtotime($releaseDate));

        $formatString = '%s %02d %d';

        if ($issue['issue_num'] === 0) {
            $formatString = '%s %03d %d';
        }

        return sprintf($formatString, $issue['volume']->name, $issue['issue_num'], $year);
    }

    public function getComic(int $cvid)
    {
        $comicvine = resolve('ComicVineRepository');
        $issue = $comicvine->issue($cvid);
        $comic = $comicvine->volume($issue['volume']->id);

        return $comic;
    }
}
