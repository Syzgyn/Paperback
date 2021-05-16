<?php

namespace App\Libraries\Providers;

use Illuminate\Support\Collection;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

interface ProviderRepositoryInterface
{
    public function resource(ProviderModelBase $models): JsonResource;
    public function collection(Collection $models): ResourceCollection;
    public function validationRules(): array;

    public function all(): Collection;

    /** @param array<array-key, mixed> $data */
    public function create(array $data): ?ProviderModelBase;

    /** @param array<array-key, mixed> $data */
    public function make(array $data): ?ProviderModelBase;

    /** @param array<array-key, mixed> $data */
    public function test(array $data): array;

    public function schema(): Collection;
}
