<?php
namespace App\Downloaders\Usenet;

use App\Models\Downloader;
use App\Repositories\Downloaders\SabnzbdRepository;

use Nanigans\SingleTableInheritance\SingleTableInheritanceTrait;

class Sabnzbd extends Downloader
{
    use SingleTableInheritanceTrait;

    const URL_ENDPOINT_BASE = '/api/';

    public $repository;

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
