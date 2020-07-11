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
            'fields' => [],
            'initialValues' => [],
        ];

        foreach ($schema['fields'] as $name => $field) {
            $output['fields'][] = [
                'name' => $name,
                'label' => $field['label'],
                'type' => $field['type'],
                //'value' => $this->getSchemaFieldValue($name, $field),
                'required' => in_array('required', is_array($field['validation']) ? $field['validation'] : [$field['validation']]),
            ];

            $path = explode('.', $name);
            $basePath = array_shift($path);
            $output['initialValues'][$basePath] = $this->castFieldValue($this->$basePath, $field);
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

    protected function getSchemaFieldValue(string $name, array $field = [])
    {
        $path = explode('.', $name);
        $base = array_shift($path);

        if (empty($path)) {
            if (isset($this->$base)) {
                return $this->castFieldValue($this->$base, $field);
            }

            //Default these fields to true
            if ($base === 'enable' || $base === 'enable_search') {
                return true;
            }

            return '';
        }

        $root = $this->$base;
        while (count($path)) {
            $branch = array_shift($path);
            $root = $root->$branch;
        }

        return $this->castFieldValue($root, $field);

        $root->{$path[0]} = $value;
        $key = array_search($name, $this->fillable);
        if (is_numeric($key)) {
            $key = $name;
        }

        if ($key === false && isset($this->fillableMap)) {
            $key = $name;
        }

        $keys = explode('.', $key);
        $base = array_shift($keys);

        //Single attribute
        if (empty($keys)) {
            if (isset($this->$base)) {
                return $this->castFieldValue($this->$base, $field);
            }

            //Default these fields to true
            if ($base === 'enable' || $base === 'enable_search') {
                return true;
            }

            return '';
        }

        //Nested attribute
        $root = $this->$base;
        if (! is_array($root)) {
            $root = json_decode($root, true);
        }

        while (count($keys)) {
            $branch = array_shift($keys);

            if (! isset($root[$branch])) {
                return '';
            }

            $root = $root[$branch];
        }

        return $this->castFieldValue($root, $field);
    }

    protected function castFieldValue($value, $field = [])
    {
        if (empty($field) || ! isset($field['type'])) {
            return $value;
        }

        if ($field['type'] === 'checkbox') {
            return $value ? true : false;
        }

        if ($field['type'] === 'text') {
            return $value ?: "";
        }

        return $value;
    }
}
