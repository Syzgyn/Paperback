<?php
namespace App\Indexers;

use App\Models\Indexer;
use App\Repositories\Indexers\NewznabRepository;

use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Newznab extends Indexer
{
    use SingleTableInheritanceTrait;

    const URL_ENDPOINT_BASE = '/api/';

    public $repository;

    protected $appends = [
        'apikey',
        'url',
    ];

    protected $fillable = [
        'name',
        'class',
        'settings',
        'settings.apikey' => 'apikey',
        'settings.url' => 'url',
        'enable_search' => 'enableSearch',
    ];

    protected static $singleTableType = self::class;

    protected $modelSchema = [
        'protocol' => 'usenet',
        'name' => 'Newznab',
        'fields' => [
            'apikey' => [
                'label' => 'API Key',
                'type' => 'text',
                'validation' => ['required', 'alpha_num'],
                'validationField' => 'settings.apikey',
            ],
        ],
    ];

    public function search($query, $offset = 0)
    {
        return $this->repository->search($query, $offset);
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
