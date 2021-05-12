<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

class SabnzbdQueue
{
    public string $defaultRootFolder;
    public array $items;

    public function __construct(array $queue)
    {
        $this->defaultRootFolder = $queue['my_home'];
        $this->items = $queue['slots'];
    }
}