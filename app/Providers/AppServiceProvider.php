<?php

namespace App\Providers;

use GuzzleHttp\Client;
use App\Services\FileManager;
use App\Services\ParserService as OldParserService;
use App\Libraries\IndexerSearch\SearchService;
use App\Libraries\DecisionEngine\DecisionService;
use App\Libraries\Parser\ParserService;
use App\Libraries\Download\DownloadService;
use App\Libraries\Http\HttpClient;
use App\Libraries\Download\NzbValidationService;
use Illuminate\Support\ServiceProvider;
use App\Repositories\ComicVineRepository;
use App\Repositories\AppSettingsRepository;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Libraries\Disk\RemotePathMappingService;
use App\Libraries\Download\History\DownloadHistoryService;
use App\Libraries\Download\IgnoredDownloadService;
use App\Libraries\Download\TrackedDownloads\TrackedDownloadService;
use App\Libraries\EventSource\EventSourceService;
use App\Libraries\History\HistoryService;
use App\Libraries\Queue\QueueService;
use Illuminate\Foundation\Application;

class AppServiceProvider extends ServiceProvider
{
    protected string $comicvineUrl = 'https://comicvine.gamespot.com/api/';

    public array $singletons = [
        'ComicVineRepository' => ComicVineRepository::class,
        'AppSettings' => AppSettingsRepository::class,
        'FileManager' => FileManager::class,
        'DownloadService' => DownloadService::class,
        'OldParserService' => OldParserService::class, //TODO: Replace
        'HttpClient' => HttpClient::class,
        'SearchService' => SearchService::class,
        'DecisionService' => DecisionService::class,
        'ParserService' => ParserService::class,
        'NzbValidationService' => NzbValidationService::class,
        'RemotePathMappingService' => RemotePathMappingService::class,
        'DownloadHistoryService' => DownloadHistoryService::class,
        'HistoryService' => HistoryService::class,
        'EventSourceService' => EventSourceService::class,
        'QueueService' => QueueService::class,
        'TrackedDownloadService' => TrackedDownloadService::class,
        'IgnoredDownloadService' => IgnoredDownloadService::class,
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('Guzzle\ComicVine', function (Application $app) {
            return new Client([
                'base_uri' => $this->comicvineUrl,
            ]);
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        JsonResource::withoutWrapping();
    }
}
