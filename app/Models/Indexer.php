<?php

namespace App\Models;

use App\Traits\BuildSchema;
use App\Traits\CreateChild;
use App\Traits\MoveAttributes;
use Illuminate\Database\Eloquent\Model;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Indexer extends Model
{
    use SingleTableInheritanceTrait;
    use MoveAttributes;
    use BuildSchema;
    use CreateChild;

    const INDEXER_TYPES = [
        'newznab' => \App\Models\Indexers\Newznab::class,
    ];

    protected $table = 'indexers';

    protected static $singleTableTypeField = 'class';
    protected static $singleTableSubclasses = self::INDEXER_TYPES;
    protected static $persisted = ['name', 'settings', 'enable_search'];

    protected $casts = ['settings' => 'array'];

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

    public function buildSearchQuery(int $cvid)
    {
        $comicvine = resolve('ComicVineRepository');
        $issue = $comicvine->issue($cvid);

        $releaseDate = $issue['release_date'];
        $year = date('Y', strtotime($releaseDate));

        return sprintf('%s %02d %d', $issue['volume']->name, $issue['issue_num'], $year);
    }
}
