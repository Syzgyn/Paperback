<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrackedDownloadRequest extends FormRequest
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
            'guid' => 'required|string',
            'comic_id' => 'required|integer',
            'issue_id' => 'required|integer',
            'indexer_id' => 'required|integer',
            'protocol' => 'required',
            'url' => 'required',
        ];
    }
}
