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
        'enable_search' => 'enableSearch',
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

    public function fill(array $attributes)
    {
        parent::fill($attributes);
        if (count($attributes)) {
            $this->moveAttributes();
        }
    }

    protected function moveAttributes()
    {
        foreach ($this->fillable as $key => $val) {
            if (! isset($this->attributes[$val])) {
                continue;
            }

            if (is_numeric($key) || $key === $val) {
                //attribute doesn't move, dont do anything
                continue;
            }

            $keys = explode('.', $key);
            $base = array_shift($keys);

            if (empty($keys)) {
                //Not a nested attribute, set and move on
                $this->attributes[$base] = $this->attributes[$val];
                continue;
            }

            //Nested attribute
            $root = &$this->attributes[$base];
            if (! is_array($root)) {
                $root = json_decode($root, true);
            }
            while (count($keys) > 1) {
                $branch = array_shift($path);

                $root = &$root[$branch];
            }

            $root[$keys[0]] = $this->attributes[$val];
        }

        //This is to cast the array to JSON data
        //TODO: Put this somewhere else
        $this->settings = $this->settings;
    }

    protected function castAttribute($key, $value)
    {
        $type = $this->getCastType($key);
        if (gettype($value) === $type) {
            return $value;
        }

        return parent::castAttribute($key, $value);
    }

    public static function createChild($attrs, $save = true)
    {
        $type = $attrs['type'];
        $class = self::getClass($type);

        if ($save) {
            return $class::create($attrs);
        } else {
            $obj = new $class();
            $obj->fill($attrs);

            return $obj;
        }
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

    public function getSchemaAttribute()
    {
        $schema = array_merge_recursive($this->baseSchema, $this->modelSchema);
        $output = [
            'protocol' => $schema['protocol'],
            'name' => $schema['name'],
            'type' => array_search(static::class, self::INDEXER_TYPES),
            'enableSearch' => isset($this->enable_search) ? (bool)$this->enable_search : true,
            'fields' => [],
        ];

        foreach ($schema['fields'] as $name => $field) {
            $output['fields'][] = [
                'name' => $name,
                'label' => $field['label'],
                'type' => $field['type'],
                'value' => '',
                'required' => in_array('required', is_array($field['validation']) ?$field['validation'] : [$field['validation']]),
            ];
        }

        return $output;
    }

    public static function buildSchemas()
    {
        $schemas = [];
        foreach (self::INDEXER_TYPES as $key => $class) {
            $indexer = new $class();
            $schemas[] = $indexer->schema;
        }

        return $schemas;
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
