<?php

namespace App\Traits;

trait MoveAttributes
{
    protected $mappedAttributes;

    protected function castAttribute($key, $value)
    {
        $type = $this->getCastType($key);
        if (gettype($value) === $type) {
            return $value;
        }

        return parent::castAttribute($key, $value);
    }

    public function __isset($key)
    {
        if (! is_null($this->getMapAttribute($key))) {
            return true;
        }

        return parent::__isset($key);
    }

    public function __get($key)
    {
        if (! is_null($this->getMapAttribute($key))) {
            return $this->getMapAttribute($key);
        }

        return parent::__get($key);
    }

    protected function getMapAttribute($key)
    {
        if (! isset($this->fillableMap)) {
            return null;
        }

        if (isset($this->mappedAttributes[$key])) {
            return $this->mappedAttributes[$key];
        }

        if (array_key_exists($key, $this->fillableMap)) {
            $path = $this->fillableMap[$key];
            $paths = explode('.', $path);
            $base = array_shift($paths);

            if (empty($paths)) {
                return $this->attributes[$base];
            }

            //Nested attribute
            $arrayAttrs[$base] = true;
            $root = $this->attributes[$base];
            if (! is_array($root)) {
                $root = json_decode($root, true);
            }
            while (count($paths) > 1) {
                $branch = array_shift($path);

                $root = $root[$branch];
            }

            if (isset($root[$paths[0]])) {
                $this->mappedAttributes[$key] = $root[$paths[0]];

                return $this->mappedAttributes[$key];
            }
        }

        return null;
    }

    public function fill(array $attributes)
    {
        parent::fill($attributes);
        $this->mapAttributes($attributes);
    }

    protected function mapAttributes(array $attributes = [])
    {
        if (! isset($this->fillableMap)) {
            return;
        }

        $arrayAttrs = [];

        foreach ($attributes as $key => $value) {
            if (! isset($this->fillableMap[$key])) {
                continue;
            }

            $path = $this->fillableMap[$key];
            $paths = explode('.', $path);
            $base = array_shift($paths);

            if (empty($paths)) {
                //Not a nested attribute, set and move on
                $this->attributes[$base] = $attributes[$key];
                continue;
            }

            //Nested attribute
            $arrayAttrs[$base] = true;
            $root = &$this->attributes[$base];
            if (! is_array($root)) {
                $root = json_decode($root, true);
            }
            while (count($paths) > 1) {
                $branch = array_shift($path);

                $root = &$root[$branch];
            }

            $root[$paths[0]] = $attributes[$key];
        }

        //This is to cast the array to JSON data
        //TODO: Put this somewhere else
        foreach ($arrayAttrs as $attr => $v) {
            $this->$attr = $this->$attr;
        }
    }
}
