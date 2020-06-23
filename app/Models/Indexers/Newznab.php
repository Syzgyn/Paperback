<?php
namespace App\Models\Indexers;

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
        'enable_search',
    ];

    protected $fillableMap = [
        'apikey' => 'settings.apikey',
        'url' => 'settings.url',
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
            ],
        ],
    ];

    public function searchCvid($cvid, $offset = 0)
    {
        $query = $this->buildSearchQuery($cvid);

        $result = $this->repository->search($query, $offset);
        $source = $this->schema['protocol'] == 'usenet' ? 'nzb' : 'torrent';

        array_walk($result, function (&$item, $key) use ($source) {
            $item['indexer'] = $this->name;
            $item['source'] = $source;
        });

        return $result;
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
