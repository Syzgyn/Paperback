<?php

namespace App\Libraries\Indexers;

use App\Libraries\Http\HttpRequest;
use Generator;

class IndexerPageableRequestChain
{
    /** @var array<Generator[]> $chain */
    protected array $chain = [];

    public function __construct()
    {
        $this->chain[] = [];
    }

    public function tierCount(): int
    {
        return count($this->chain);
    }

    /** @return Generator[] */
    public function getAllTiers(): array
    {
        return array_merge(...$this->chain);
    }

    /** @return Generator[] */
    public function getTier(int $index): array
    {
        return $this->chain[$index];
    }

    public function add(Generator $request): void
    {
        $this->chain[$this->tierCount() - 1][] = $request;
    }

    public function addToTier(int $index, Generator $request): void
    {
        $this->chain[$index][] = $request;
    }

    public function addTier(?Generator $request = null): void
    {
        if ($request === null) {
            if (count($this->chain[$this->tierCount() - 1]) === 0) {
                return;
            }

            $this->chain[] = [];
            return;
        }

        $this->addTier();
        $this->add($request);
    }
}
