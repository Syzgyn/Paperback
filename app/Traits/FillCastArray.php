<?php

namespace App\Traits;

trait FillCastArray
{
    public function fill(array $attributes)
    {
        parent::fill($attributes);
        $this->createDto(!empty($attributes));
        $this->fillArray($attributes);
    }

    protected function createDto($hasAttributes)
    {
        if (!$hasAttributes)
        {
            return;
        }

        foreach ($this->casts as $key => $value)
        {
            if (is_null($this->$key))
            {
                $this->$key = new $value();
            }
        }
    }

    protected function fillArray($attributes, $baseAttr = null)
    {
        foreach ($attributes as $name => $value) {
            $fullName = ! is_null($baseAttr) ? "$baseAttr.$name" : $name;

            if (is_null($baseAttr)) {
                if (is_array($value)) {
                    $this->fillArray($value, $fullName);
                }

                //Single value, let parent::fill handle it
                continue;
            }

            if (! in_array($fullName, $this->fillable)) {
                //Ignore anything not marked as fillable
                continue;
            }

            //We should only be here with a nested value
            $path = explode('.', $fullName);
            $base = array_shift($path);

            if (empty($path)) {
                //Sanity check for now
                throw new \Exception("$fullName is not a nested attribute");
            }

            $root = &$this->$base;
            while (count($path) > 1) {
                $branch = array_shift($path);
                $root = &$root->$branch;
            }

            $root->{$path[0]} = $value;
        }
    }
}
