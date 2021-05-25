<?php

namespace App\Libraries\Download;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Libraries\Parser\RemoteIssue;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class IssueGrabbedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public RemoteIssue $issue;
    public ?int $downloadClientId = null;
    public ?string $downloadClient = null;
    public ?string $downloadClientName = null;
    public ?string $downloadId = null;

    public function __construct(RemoteIssue $issue)
    {
        $this->issue = $issue;
    }
}
