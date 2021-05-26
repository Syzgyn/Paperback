<?php

namespace App\Libraries\EventSource;

class ModelAction
{
    public const UNKNOWN = "unknown";
    public const CREATED = "created";
    public const UPDATED = "updated";
    public const DELETED = "deleted";
    public const SYNC = "sync";
}