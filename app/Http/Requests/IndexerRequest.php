<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use App\Libraries\Providers\ProviderRequest;

class IndexerRequest extends ProviderRequest 
{
    protected $types = [
        'newznab',
        'getcomics',
        'comicextra',
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
        return [];
        return [
            'type' => [
                'required',
                'string',
                Rule::in($this->types),
            ],
            'enableSearch' => 'required|boolean',
            'name' => 'required',
            'settings.apikey' => 'alpha_num',
            'settings.url' => 'string',
        ];
    }

    public function withValidator($validator)
    {
        $validator->sometimes(['settings.apikey', 'settings.url'], 'required', function ($input) {
            return $input->type == 'newznab';
        });
    }
}
