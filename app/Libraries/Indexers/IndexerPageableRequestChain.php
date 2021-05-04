<?php

namespace App\Libraries\Indexers;

use App\Libraries\Http\HttpRequest;
use Generator;

class IndexerPageableRequestChain
{
    protected array $chain = [];

    public function __construct()
    {
        $this->chain[] = [];
    }

    public function tierCount(): int
    {
        return count($this->chain);
    }

    public function getAllTiers(): array
    {
        return array_merge(...$this->chain);
    }

    public function getTier(int $index): array
    {
        return $this->chain[$index];
    }

    public function add(Generator $request): void
    {
        if ($request == null) {
            return;
        }

        $this->chain[$this->tierCount() - 1][] = $request;
    }

    public function addToTier(int $index, Generator $request): void
    {
        if ($request == null) {
            return;
        }
        
        $this->chain[$index][] = $request;
    }

    public function addTier(Generator|null $request = null)
    {
        if ($request === null) {
            if (count($this->chain[$this->tierCount() - 1] === 0)) {
                return;
            }

            $this->chain[] = [];
            return;
        }

        $this->addTier();
        $this->add($request);
    }
}
