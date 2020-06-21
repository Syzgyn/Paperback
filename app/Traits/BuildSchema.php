<?php

namespace App\Traits;

trait BuildSchema
{
    abstract protected static function getChildTypes();

    public function getSchemaAttribute()
    {
        if (! isset($this->baseSchema)) {
            throw new \Exception('Base class must define $baseSchema');
        }

        if (! isset($this->modelSchema)) {
            throw new \Exception('Child class must define $modelSchema');
        }

        $schema = array_merge_recursive($this->baseSchema, $this->modelSchema);
        $output = [
            'protocol' => $schema['protocol'],
            'name' => $schema['name'],
            'type' => array_search(static::class, self::getChildTypes()),
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
        foreach (self::getChildTypes() as $key => $class) {
            $indexer = new $class();
            $schemas[] = $indexer->schema;
        }

        return $schemas;
    }
}
