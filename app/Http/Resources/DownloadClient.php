<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DownloadClient extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $output = [
            'enable' => $this->enable,
            'protocol' => $this->getProtocol(),
            'priority' => (int) $this->priority,
            'name' => $this->name,
            'fields' => $this->settings->getSettings(),
            'implementationName' => $this->implementation,
            'implementation' => $this->implementation,
            'configContract' => $this->settings_schema,
            'tags' => [],
        ];

        if ($this->id) {
            $output['id'] = $this->id;
        }

        return $output;
    }
}

