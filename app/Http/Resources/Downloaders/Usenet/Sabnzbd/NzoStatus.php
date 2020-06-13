<?php

namespace App\Http\Resources\Downloaders\Usenet\Sabnzbd;

use Illuminate\Http\Resources\Json\JsonResource;

class NzoStatus extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'nzo_id' => null,
        ];
    }
}
