<?php

namespace App\Libraries\Indexers;

use App\Exceptions\TestException;
use App\Libraries\Http\HttpClient;
use App\Libraries\Providers\ProviderModelBase;
use App\Models\Indexers\Newznab;
use App\Libraries\Providers\ProviderSettingsCast;
use App\Libraries\IndexerSearch\SearchCriteriaBase;
use App\Libraries\Parser\ReleaseInfo;
use App\Libraries\Http\HttpRequest;
use App\Libraries\Http\HttpResponse;
use App\Libraries\Indexers\Exceptions\IndexerException;
use Exception;
use Generator;
use Illuminate\Contracts\Container\BindingResolutionException;
use GuzzleHttp\Exception\GuzzleException;

/**
 * App\Libraries\Indexers
 *
 * @property int $id
 * @property string $name
 * @property string $implementation
 * @property mixed|null $settings
 * @property string|null $settings_schema
 * @property bool|null $enable_rss
 * @property bool|null $enable_automatic_search
 * @property bool $enable_interactive_search
 * @property int $priority
 * @property-read bool $enable
 * @property-read array $fields
 * @property-read mixed $foo
 * @property-read string $settings_schema_class_name
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereEnableAutomaticSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereEnableInteractiveSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereEnableRss($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereImplementation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereSettingsSchema($value)
 * @mixin \Eloquent
 */
abstract class IndexerModelBase extends ProviderModelBase
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

    protected abstract function getParser(): RssParser;
    protected abstract function getRequestGenerator(): IndexerRequestGeneratorInterface;

    public function getChildClasses(): array
    {
        return [
            Newznab::class,
        ];
    }

    public function getEnableAttribute(): bool
    {
        return $this->enable_rss || $this->enable_interactive_search || $this->enable_automatic_search;
    }

    public function getSettingsSchemaClassNameAttribute(): string
    {
        return "";
    }

    public function test(): void
    {
        try {
            $requestGenerator = $this->getRequestGenerator();

            /** @var Generator<HttpRequest>[] */
            $requests = $requestGenerator->getRecentRequests()->getAllTiers();
            $request = array_shift($requests)->current();

            if (!$request) {
                throw new TestException("No rss feed query available. This may be an issue with the indexer or your indexer category settings.");
            }

            $results = $this->fetchPage($request);

            if (empty($results)) {
                throw new TestException("Query successful, but no results were returned from your indexer. This may be an issue with the indexer or your indexer category settings.");
            }
        } catch(Exception $e)
        {
            throw $e;
        }
    }

    protected function fetchPage(HttpRequest $request): array
    {
        //TODO: Implement per-key rate limiting
        $request->rateLimitKey = "indexer-" . $this->id;

        /** @var HttpClient $client 
         *  @var HttpResponse $response
        */
        $client = resolve("HttpClient");
        $response = $client->execute($request);

        $parser = $this->getParser();

        return $parser->parseResponse($response);
    }

    /**
     * @param SearchCriteriaBase $searchCriteria 
     * @param bool $isRecent 
     * @return ReleaseInfo[] 
     * @throws BindingResolutionException 
     * @throws GuzzleException 
     * @throws IndexerException 
     * @throws Exception 
     */
    public function fetch(SearchCriteriaBase $searchCriteria, bool $isRecent = false): array
    {
        //TODO: Check for search support
        $generator = $this->getRequestGenerator();
        $requestChain = $generator->getSearchRequests($searchCriteria);

        /** @var ReleaseInfo[] */
        $releases = [];

        //TODO:Add recurring RSS search 

        for ($tier = 0; $tier < $requestChain->tierCount(); $tier++) {
            $requestTier = $requestChain->getTier($tier);

            foreach ($requestTier as $requestGenerator) {
                $pagedReleases = [];

                /** @var HttpRequest $request */
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
                /** @var ReleaseInfo[] $pagedReleases */
                $releases += array_filter($pagedReleases, [$this, 'isValidRelease']); 
            }

            if (!empty($releases)) {
                break;
            }
        }

        return $this->cleanupReleases($releases);
    }

    /**
     * @param ReleaseInfo[] $releases 
     * @return ReleaseInfo[]
     */
    protected function cleanupReleases(array $releases): array
    {
        $results = array_filter($releases, function($release) {
            /** @var string[] */
            static $guidList = [];
            if (in_array($release->guid, $guidList)) {
                return false;
            }
            $guidList[] = $release->guid;
            return true;
        });

        array_walk($results, function(ReleaseInfo $release) {
            $release->indexerId = $this->id;
            $release->indexer = $this->name;
            $release->downloadProtocol = (string)static::PROTOCOL;
            $release->indexerPriority = $this->priority;
        });

        /** @var ReleaseInfo[] */
        return $results;
    }

    protected function isValidRelease(ReleaseInfo $release): bool
    {
        return !empty($release->downloadUrl);
    }

    protected function isFullPage(array $page): bool
    {
        return static::PAGE_SIZE != 0 && count($page) >= static::PAGE_SIZE; 
    }
}
