<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class DownloaderRequest extends FormRequest
{
    protected $types = [
        'sabnzbd',
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
            'enable' => 'required|boolean',
            'name' => 'required',
            'apikey' => 'alpha_num',
            'url' => 'string',
            'port' => 'numeric',
        ];
    }

    public function withValidator(Validator $validator)
    {
        $validator->sometimes(['apikey', 'url', 'port'], 'required', function ($input) {
            return $input->type == 'sabnzbd';
        });
    }
}
