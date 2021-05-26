<?php

namespace App\Libraries\EventSource;

use Illuminate\Database\Eloquent\Model;

class ModelEvent
{
    public Model $model;
    public string $name;
    /** @var ModelAction::* $action */
    public int $action;

    /** @param ModelAction::* $action */
    public function __construct(string $name, Model $model, int $action)
    {
        $this->model = $model;
        $this->name = $name;
        $this->action = $action;
    }
}