<?php
namespace App\Models\Indexers;

use App\Models\Indexer;
use App\Models\TrackedDownload;
use App\Repositories\Indexers\GetComicsRepository;
use App\Http\Resources\Indexers\GetComicsCollection;
use App\Models\Downloaders\DDL\GetComics as GetComicsDownloader;

class GetComics extends Indexer
{
    const URL_ENDPOINT_BASE = '/api/';
    const PROTOCOL = 'ddl';

    public $repository;

    protected $fillable = [
        'name',
        'class',
        'enableSearch',
    ];

    protected static $singleTableType = self::class;

    protected $modelSchema = [
        'protocol' => 'ddl',
        'name' => 'GetComics.info',
        'fields' => [],
    ];

    public function searchCvid($comic, $issue = '', $year = '', $offset = 0)
    {
        $query = $comic;
        $result = $this->repository->search($query, $offset);

        return new GetComicsCollection($result);
    }

    protected static function booted()
    {
        static::creating(function ($indexer) {
            $indexer->class = self::class;
        });

        static::retrieved(function ($indexer) {
            $indexer->repository = new GetComicsRepository();
            $indexer->class = self::class;
        });
    }

    public function test()
    {
        //Manually create the repo if we're working with an unsaved model
        if (! $this->repository) {
            $this->repository = new GetComicsRepository();
        }

        return $this->repository->test();
    }

    public function getDownloader(TrackedDownload $download)
    {
        return new GetComicsDownloader($download);
    }
}
