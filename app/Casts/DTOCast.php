<?php
//Found at https://sandulat.com/mapping-json-columns-to-dtos-with-laravels-new-custom-casts/

namespace App\Casts;

use Spatie\DataTransferObject\DataTransferObject;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

abstract class DTOCast implements CastsAttributes
{
    abstract protected function dtoClass();

    /**
     * Cast the given value.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  mixed  $value
     * @param  array  $attributes
     * @return DataTransferObject|null
     */
    public function get($model, $key, $value, $attributes)
    {
        if (! $value) {
            return null;
        }

        $dtoClass = $this->dtoClass();

        return new $dtoClass(json_decode($value, true));
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @param  string  $key
     * @param  array  $value
     * @param  array  $attributes
     * @return string
     */
    public function set($model, $key, $value, $attributes)
    {
        $dtoClass = $this->dtoClass();

        if (! $value instanceof $dtoClass) {
            throw new \Exception('The provided value must be an instance of '.$dtoClass);
        }

        return json_encode($value->toArray());
    }
}
