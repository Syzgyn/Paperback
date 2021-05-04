<?php

namespace App\Libraries\Providers;

use Illuminate\Support\Collection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Exceptions\TestException;

abstract class ProviderRepository implements ProviderRepositoryInterface
{
    public function __construct(
        protected ProviderModel $model,
        protected string $resource,
        protected string $collection
    )
    {
    }

    public function collection(Collection $models): ResourceCollection
    {
        return new ($this->collection)($models);
    }

    public function resource(ProviderModel $model): JsonResource
    {
        return new ($this->resource)($model);
    }

    public function validationRules(): array
    {
        $rules = [];

        if (method_exists($this, 'additionalValidationRules')) {
            $rules = array_merge($rules, $this->additionalValidationRules());
        }

        return $rules;
    }

    public function validationMessages(): array
    {
        return [
            'required' => "':attribute' must not be empty.",
            'url' => "must be valid URL that starts with http(s)://",
        ];
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function create(array $data): ?ProviderModel
    {
        $model = $this->make($data);
        if ($model) {
            $model->save();
            return $model;
        }

        return null;
    }

    public function make(array $data): ?ProviderModel
    {
        return $this->model->newFromBuilder($data);
    }


    public function test(array $data)
    {
        $model = $this->make($data);
        $model->settings->validate($this->validationMessages());
        try {
            $model->test();
        } catch (TestException $e) {
        }

        return [];
    }

    public function schema(): Collection
    {
        $classNames = $this->model->getChildClasses();
        $classes = [];
        
        foreach($classNames as $name) {
            $classes[] = new $name;
        }

        return new Collection($classes);
    }
}
