<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

class SabnzbdHistory
{
    public bool $paused;
    public array $items;

    public function __construct(array $history)
    {
        $this->paused = $history['paused'];
        $this->items = $history['slots'];
    }
}