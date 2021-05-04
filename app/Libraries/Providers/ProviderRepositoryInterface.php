<?php

namespace App\Libraries\Providers;

use Illuminate\Support\Collection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

interface ProviderRepositoryInterface
{
    public function resource(ProviderModel $models): JsonResource;
    public function collection(Collection $models): ResourceCollection;
    public function validationRules(): array;

    public function all(): Collection;
    public function create(array $data): ?ProviderModel;
    public function make(array $data): ?ProviderModel;

    public function test(array $data);
    public function schema(): Collection;
}
