<?php

namespace App\Http\Resources;

use App\Libraries\History\IssueHistoryEventType;
use Illuminate\Http\Resources\Json\JsonResource;

class IssueHistoryResource extends JsonResource
{
    public function toArray($request)
    {
        $data = parent::toArray($request);

        /** @var int */
        $data['comicId'] = $data['comic_id'];
        /** @var int */
        $data['issueId'] = $data['issue_id'];
        $data['eventType'] = IssueHistoryEventType::toString($data['event_type']);
        $data['sourceTitle'] = $data['source_title'];

        foreach($data['data'] as $key => $value) {
            $data['data'][lcfirst($key)] = $value;
            unset($data['data'][$key]);
        }

        unset($data['comic_id']);
        unset($data['issue_id']);
        unset($data['event_type']);
        unset($data['source_title']);

        return $data;
    }
}