<?php
namespace App\Models\Indexers;

use App\Models\Indexer;
use App\Models\TrackedDownload;
use App\Http\Resources\IndexerResultCollection;
use App\Repositories\Indexers\ComicExtraRepository;
use App\Models\Downloaders\DDL\ComicExtra as ComicExtraDownloader;

class ComicExtra extends Indexer
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
        'name' => 'ComicExtra.com',
        'fields' => [],
    ];

    public function searchCvid(string $comic, string$issue = '', string $year = '', int $offset = 0)
    {
        $result = $this->repository->search($comic, (int) $issue);

        return new IndexerResultCollection($result);
    }

    protected static function booted()
    {
        static::creating(function ($indexer) {
            $indexer->class = self::class;
        });

        static::retrieved(function ($indexer) {
            $indexer->repository = new ComicExtraRepository();
            $indexer->class = self::class;
        });
    }

    public function test()
    {
        //Manually create the repo if we're working with an unsaved model
        if (! $this->repository) {
            $this->repository = new ComicExtraRepository();
        }

        return $this->repository->test();
    }

    public function getDownloader(TrackedDownload $download)
    {
        return new ComicExtraDownloader($download);
    }
}
