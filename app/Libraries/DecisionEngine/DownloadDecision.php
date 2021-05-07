<?php

namespace App\Libraries\DecisionEngine;

use App\Libraries\Parser\RemoteIssue;

class DownloadDecision
{
    public array $rejections;
    public function __construct(public RemoteIssue $remoteIssue, array|Rejection $rejections)
    {
        if (!is_array($rejections)) {
            $rejections = [$rejections];
        }

        $this->rejections = $rejections;
    }

    public function isApproved(): bool
    {
        return empty($this->rejections);
    }

    public function isTemporarilyRejected(): bool
    {
        return !empty($this->rejections) && array_reduce($this->rejections, 
            fn($c, $r) => $c && $r->type === RejectionType::TEMPORARY, true);
    }

    public function isRejected(): bool
    {
        return !empty($this->rejections) && array_reduce($this->rejections, 
            fn($c, $r) => $c || $r->type === RejectionType::PERMANENT, false);
    }

    public function __tostring()
    {
        if ($this->isApproved()) {
            return "[OK] " . $this->remoteIssue;
        }

        return "[Rejected " . count($this->rejections) . "] " . $this->remoteIssue; 
    }
}

