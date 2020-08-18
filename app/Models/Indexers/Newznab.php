<?php
namespace App\Models\Indexers;

use App\Models\Indexer;
use App\Dto\Indexers\NewznabSettings;
use App\Repositories\Indexers\NewznabRepository;
use App\Http\Resources\Indexers\NewznabCollection;

class Newznab extends Indexer
{
    const URL_ENDPOINT_BASE = '/api/';
    const PROTOCOL = 'usenet';

    public $repository;

    protected $casts = [
        'settings' => NewznabSettings::class,
    ];

    protected $fillable = [
        'name',
        'class',
        'enableSearch',
        'settings.url',
        'settings.apikey',
    ];

    protected static $singleTableType = self::class;

    protected $modelSchema = [
        'protocol' => 'usenet',
        'name' => 'Newznab',
        'fields' => [
            'settings.url' => [
                'label' => 'Base URL',
                'type' => 'text',
                'validation' => ['required', 'string'],
            ],
            'settings.apikey' => [
                'label' => 'API Key',
                'type' => 'text',
                'validation' => ['required', 'alpha_num'],
            ],
        ],
    ];

    public function searchCvid($comic, $issue = '', $year = '', $offset = 0)
    {
        $query = "$comic $issue $year";
        $result = $this->repository->search($query, $offset);

        return new NewznabCollection($result);
    }

    protected static function booted()
    {
        static::creating(function ($indexer) {
            $indexer->class = self::class;
        });

        static::retrieved(function ($indexer) {
            $indexer->repository = new NewznabRepository($indexer);
            $indexer->class = self::class;
        });
    }

    public function test()
    {
        //Manually create the repo if we're working with an unsaved model
        if (! $this->repository) {
            $this->repository = new NewznabRepository($this);
        }

        return $this->repository->test();
    }
}
