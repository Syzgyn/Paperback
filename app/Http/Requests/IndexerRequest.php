<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

use App\Http\Requests\NewznabRequest;

class IndexerRequest extends FormRequest
{
    protected $types = [
        'newznab', 
    ];

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
            'type' => [
                'required',
                'string',
                Rule::in($this->types),
            ],
            'name' => 'required',
            'settings.apikey' => 'alpha_num',
            'settings.url' => 'url',
        ];
    }

    public function withValidator($validator) {
        $validator->sometimes(['settings.apikey', 'settings.url'], 'required', function($input) {
            return $input->type == 'newznab';
        });
    }
}
