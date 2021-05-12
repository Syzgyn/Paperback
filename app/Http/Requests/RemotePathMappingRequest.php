<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/** @package App\Http\Requests 
 * @property string $localPath
 * @property string $remotePath
*/
class RemotePathMappingRequest extends FormRequest
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

    protected function prepareForValidation()
    {
        $this->merge([
            'local_path' => $this->localPath,
            'remote_path' => $this->remotePath,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'host' => 'required|string',
            'local_path' => 'required|string',
            'remote_path' => 'required|string',
        ];
    }
}
