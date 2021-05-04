<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Indexer extends JsonResource
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
            'enableRss' => $this->enable_rss,
            'enableAutomaticSearch' => $this->enable_automatic_search,
            'enableInteractiveSearch' => $this->enable_interactive_search,
            'supportsRss' => true,
            'supportsSearch' => true,
            'protocol' => $this->getProtocol(),
            'priority' => $this->priority,
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
