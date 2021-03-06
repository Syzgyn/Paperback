<?php

namespace App\Providers;

use GuzzleHttp\Client;
use App\Services\FileManager;
use App\Services\ParserService;
use App\Services\DownloadService;
use Illuminate\Support\ServiceProvider;
use App\Repositories\ComicVineRepository;
use App\Repositories\AppSettingsRepository;

class AppServiceProvider extends ServiceProvider
{
    protected $comicvineUrl = 'https://comicvine.gamespot.com/api/';

    public $singletons = [
        'ComicVineRepository' => ComicVineRepository::class,
        'AppSettings' => AppSettingsRepository::class,
        'FileManager' => FileManager::class,
        'DownloadService' => DownloadService::class,
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
        //
    }
}
