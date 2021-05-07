<?php

namespace App\Models;

use App\Libraries\Providers\ProviderModel;
use App\Libraries\Providers\ProviderSettingsCast;
use App\Libraries\IndexerSearch\SearchCriteriaBase;
use App\Libraries\Parser\ReleaseInfo;

class Indexer extends ProviderModel
{
    const PROTOCOL = null;
    const MAX_NUM_RESULTS_PER_QUERY = 1000;
    const PAGE_SIZE = 0;

    protected $casts = [
        'settings' => ProviderSettingsCast::class,
        'priority' => 'integer',
        'enable_rss' => 'boolean',
        'enable_interactive_search' => 'boolean',
        'enable_automatic_search' => 'boolean',
    ];

    public $timestamps = false;
    protected $guarded = [
        'protocol',
    ];
    protected $table = 'indexers';

    public $attributes = [
        'priority' => 25,
        'enable_rss' => true,
        'enable_interactive_search' => true,
        'enable_automatic_search' => true,
    ];

    public function getChildClasses(): array
    {
        return [
            Indexers\Newznab::class,
        ];
    }

    public function getNameAttribute(): string
    {
        return $this->attributes['name'] ?? $this->name ?? "";
    }

    public function getImplementationAttribute(): string
    {
        return $this->attributes['implementation'] ?? $this->implementation ?? "";
    }

    public function getParser()
    {
        throw new \Exception("Cannot call getParser from base Indexer class");
    }

    public function getRequestGenerator()
    {
        throw new \Exception("Cannot call getRequestGenerator from base Indexer class");
    }

    public function getEnableAttribute(): bool
    {
        return $this->enable_rss || $this->enable_interactive_search || $this->enable_automatic_search;
    }

    public function fetch(SearchCriteriaBase $searchCriteria, bool $isRecent = false): array
    {
        //TODO: Check for search support
        $generator = $this->getRequestGenerator();
        $requestChain = $generator->getSearchRequests($searchCriteria);
        $releases = [];

        //TODO:Add recurring RSS search 

        for ($tier = 0; $tier < $requestChain->tierCount(); $tier++) {
            $requestTier = $requestChain->getTier($tier);

            foreach ($requestTier as $requestGenerator) {
                $pagedReleases = [];

                foreach ($requestGenerator as $request) {
                    $page = $this->fetchPage($request);

                    $pagedReleases += $page;
                    
                    if ($isRecent && !empty($page)) {
                        break; //We do this to limit the results to the first page of each generator only
                               //since we don't need all the results for a regular search
                               //Change this once RSS tracking is implemented
                    } elseif (count($pagedReleases) > self::MAX_NUM_RESULTS_PER_QUERY) {
                        break;
                    }

                    if (!$this->isFullPage($page)) {
                        break;
                    }
                }

                $releases += array_filter($pagedReleases, [$this, 'isValidRelease']); 
            }

            if (!empty($releases)) {
                break;
            }
        }

        return $this->cleanupReleases($releases);
    }

    protected function cleanupReleases(array $releases): array
    {
        $results = array_filter($releases, function($release) {
            static $guidList = [];
            if (in_array($release->guid, $guidList)) {
                return false;
            }
            $guidList[] = $release->guid;
            return true;
        });

        array_walk($results, function($release) {
            $release->indexerId = $this->id;
            $release->indexer = $this->name;
            $release->downloadProtocol = static::PROTOCOL;
            $release->indexerPriority = $this->priority;
        });
        
        return $results;
    }

    protected function isValidRelease(ReleaseInfo $release): bool
    {
        return !empty($release->downloadUrl);
    }

    protected function isFullPage(array $page) {
        return static::PAGE_SIZE != 0 && count($page) >= static::PAGE_SIZE; 
    }
}
