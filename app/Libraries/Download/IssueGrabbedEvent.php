<?php

namespace App\Libraries\Download;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Libraries\Parser\RemoteIssue;

class IssueGrabbedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public RemoteIssue $issue;
    public int $downloadClientId;
    public string $downloadClient;
    public string $downloadClientName;
    public string $downloadId;

    public function __construct(RemoteIssue $issue)
    {
        $this->issue = $issue;
    }
}
