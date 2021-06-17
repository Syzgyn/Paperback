<?php

namespace App\Libraries\Commands;

class RefreshComicCommand extends Command
{
    public ?int $comicId = null;
    public bool $isNewComic = false;

    protected function setValues(array $values): void
    {
        $this->comicId = $values['comicId'] ?? null;
        $this->isNewComic = $values['isNewComic'] ?? false;

        $this->sendUpdatesToClient = true;
        $this->updateScheduledTask = $this->comicId === null;
    }
}