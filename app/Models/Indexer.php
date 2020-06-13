<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Indexer extends Model
{
    use SingleTableInheritanceTrait;

    //TODO: Move other submodels to correct folder under /Models
    const INDEXER_TYPES = [
        'newznab' => \App\Indexers\Newznab::class,
    ];

    protected $table = 'indexers';

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

    protected $baseSchema = [
        'fields' => [
            'url' => [
                'label' => 'Base URL',
                'type' => 'text',
                'validation' => 'string',
                'validationField' => 'settings.url',
            ],
        ],
    ];

    public static function createChild($attrs)
    {
        $type = $attrs['type'];
        $class = self::getClass($type);

        return $class::create($attrs);
    }

    public static function getClass(String $type)
    {
        return self::INDEXER_TYPES[$type];
    }

    protected static function booted()
    {
        static::saving(function ($indexer) {
            if (get_class($indexer) == self::class) {
                throw new \Exception('Cannot save base indexer class');
            }
        });
    }

    public function buildSchema()
    {
        $schema = array_merge_recursive($this->baseSchema, $this->schema);
        $output = [
            'protocol' => $schema['protocol'],
            'name' => $schema['name'],
            'type' => array_search(static::class, self::INDEXER_TYPES),
            'enableSearch' => $this->enable_search || true,
            'fields' => [],
        ];

        foreach ($schema['fields'] as $name => $field) {
            $output['fields'][] = [
                'name' => $name,
                'label' => $field['label'],
                'type' => $field['type'],
                'value' => '',
                'required' => in_array('required', $field['validation']),
            ];
        }

        return $output;
    }

    public static function buildSchemas()
    {
        $schemas = [];
        foreach (self::INDEXER_TYPES as $key => $class) {
            $indexer = new $class();
            $schemas[] = $indexer->buildSchema();
        }

        return $schemas;
    }
}
