<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ComicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'cvid' => 'required|integer',
            'title' => 'required',
            'status' => 'required',
            'images' => 'required|array',
            'folder' => 'required',
            'rootFolderPath' => 'required',
            'monitored' => 'required|boolean',
            'tags' => 'array',
            'path' => 'required',
            'overview' => 'string',
            'publisher' => 'string',
            'year' => 'integer',
            'add_options' => 'array',
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            'path' => $this->rootFolderPath . DIRECTORY_SEPARATOR . $this->folder,
        ]);
    }
}
