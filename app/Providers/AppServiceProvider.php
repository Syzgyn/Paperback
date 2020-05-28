<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use GuzzleHttp\Client;
use App\Repositories\ComicVineRepository;

class AppServiceProvider extends ServiceProvider
{

	protected $comicvineUrl = "https://comicvine.gamespot.com/api/";

    public $singletons = [
        'ComicVineRepository' => ComicVineRepository::class,
    ];

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

	    $this->app->singleton('Guzzle\ComicVine', function($app){
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
