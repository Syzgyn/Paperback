<?php
namespace App\Traits;

trait CreateChild
{
    abstract public static function getClass(String $type);

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
}
