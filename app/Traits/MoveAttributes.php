<?php

namespace App\Traits;

trait MoveAttributes
{
    protected function castAttribute($key, $value)
    {
        $type = $this->getCastType($key);
        if (gettype($value) === $type) {
            return $value;
        }

        return parent::castAttribute($key, $value);
    }

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
}
