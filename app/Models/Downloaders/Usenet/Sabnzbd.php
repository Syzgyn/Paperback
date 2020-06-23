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
        'port',
    ];

    protected $fillable = [
        'name',
        'class',
        'enable',
    ];

    protected $fillableMap = [
        'apikey' => 'settings.apikey',
        'url' => 'settings.url',
        'username' => 'settings.username',
        'port' => 'settings.port',
    ];

    protected $modelSchema = [
        'protocol' => 'usenet',
        'name' => 'SabNZBd',
        'fields' => [
            'port' => [
                'label' => 'Port',
                'type' => 'text',
                'validation' => ['required', 'numeric'],
            ],
            'apikey' => [
                'label' => 'API Key',
                'type' => 'text',
                'validation' => ['required', 'alpha_num'],
            ],
            'username' => [
                'label' => 'Username',
                'type' => 'text',
                'validation' => [],
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
        return $response = $this->getRepository()->test();
    }

    public function download($link)
    {
        $response = $this->repository->addUrl($link);

        return $response['nzo_ids'][0];
    }

    public function getDownloadStatus($nzoId)
    {
        return $this->repository->getDownloadStatus($nzoId);
    }

    public function getRepository()
    {
        if (! isset($this->repository)) {
            $this->repository = new SabnzbdRepository($this);
        }

        return $this->repository;
    }
}
