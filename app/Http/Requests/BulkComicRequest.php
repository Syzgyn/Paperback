<?php

namespace App\Http\Requests;

use App\Http\Requests\ComicRequest;

class BulkComicRequest extends ComicRequest 
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = parent::rules();
        unset($rules['folder']);
        unset($rules['rootFolderPath']);

        foreach($rules as $k => $v) {
            $rules['*.' . $k] = $v;
            unset($rules[$k]);
        }

        return $rules;
    }

    public function prepareForValidation()
    {
    }
}

