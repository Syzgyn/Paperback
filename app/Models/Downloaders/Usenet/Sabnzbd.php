<?php
namespace App\Models\Downloaders\Usenet;

use App\Models\Downloader;
use App\Repositories\Downloaders\SabnzbdRepository;

use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Sabnzbd extends Downloader
{
    use SingleTableInheritanceTrait;

    const URL_ENDPOINT_BASE = '/api/';

    public $repository;

    protected $appends = [
        'apikey',
        'url',
        'username',
    ];

    protected $fillable = [
        'name',
        'class',
        'enable',
        'settings',
        'settings.apikey' => 'apikey',
        'settings.url' => 'url',
        'settings.username' => 'username',
    ];

    protected $modelSchema = [
        'protocol' => 'usenet',
        'name' => 'SabNZBd',
        'fields' => [
            'apikey' => [
                'label' => 'API Key',
                'type' => 'text',
                'validation' => ['required', 'alpha_num'],
                'validationField' => 'settings.apikey',
            ],
            'username' => [
                'label' => 'Username',
                'type' => 'text',
                'validation' => [],
                'validationField' => 'settings.username',
            ],
        ],
    ];

    protected static $singleTableType = self::class;

    protected static function booted()
    {
        static::creating(function ($downloader) {
            $downloader->class = self::class;
        });

        static::retrieved(function ($downloader) {
            $downloader->class = self::class;
            $downloader->getRepository();
        });
    }

    public function test()
    {
        return $response = $this->getRepository()->getCats();
    }

    public function download($link)
    {
        return $this->repository->addUrl($link);
    }

    public function getRepository()
    {
        if (! isset($this->repository)) {
            $this->repository = new SabnzbdRepository($this);
        }

        return $this->repository;
    }
}
