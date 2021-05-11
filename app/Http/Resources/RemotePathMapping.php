<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RemotePathMapping extends JsonResource
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
            'host' => $this->host,
            'localPath' => $this->local_path,
            'remotePath' => $this->remote_path,
            'id' => $this->id,
        ];
    }
}
