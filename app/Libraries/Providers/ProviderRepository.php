<?php

namespace App\Libraries\Providers;

use Illuminate\Support\Collection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Exceptions\TestException;
use Exception;

/** @package App\Libraries\Providers 
 * @property class-string<JsonResource> $resource
 * @property class-string<ResourceCollection> $collection
*/
abstract class ProviderRepository implements ProviderRepositoryInterface
{
    public function __construct(
        protected ProviderModelBase $model,
        protected string $resource,
        protected string $collection
    )
    {
    }

    public function collection(Collection $models): ResourceCollection
    {
        /** @psalm-suppress UnsafeInstantiation */
        return new ($this->collection)($models);
    }

    public function resource(ProviderModelBase $model): JsonResource
    {
        /** @psalm-suppress UnsafeInstantiation */
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

    public function additionalValidationRules(): array
    {
        return [];
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

    /** @param array<array-key, mixed> $data */
    public function create(array $data): ?ProviderModelBase
    {
        $model = $this->make($data);
        $model->save();
        return $model;
    }

    /** @param array<array-key, mixed> $data */
    public function make(array $data): ProviderModelBase
    {
        return $this->model->newFromBuilder($data);
    }


    /** @param array<array-key, mixed> $data */
    public function test(array $data): array
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
