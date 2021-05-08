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
use Illuminate\Support\ServiceProvider;
use App\Repositories\ComicVineRepository;
use App\Repositories\AppSettingsRepository;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    protected $comicvineUrl = 'https://comicvine.gamespot.com/api/';

    public $singletons = [
        'ComicVineRepository' => ComicVineRepository::class,
        'AppSettings' => AppSettingsRepository::class,
        'FileManager' => FileManager::class,
        'DownloadService' => DownloadService::class,
        'OldParserService' => OldParserService::class, //TODO: Replace
        'HttpClient' => HttpClient::class,
        'SearchService' => SearchService::class,
        'DecisionService' => DecisionService::class,
        'ParserService' => ParserService::class,
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('Guzzle\ComicVine', function ($app) {
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
