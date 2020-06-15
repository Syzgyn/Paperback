<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

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
            'enableSearch' => 'required|boolean',
            'name' => 'required',
            'apikey' => 'alpha_num',
            'url' => 'string',
        ];
    }

    public function withValidator($validator)
    {
        $validator->sometimes(['apikey', 'url'], 'required', function ($input) {
            return $input->type == 'newznab';
        });
    }
}
