<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RootFolder extends Model
{
    protected $table = 'root_folders';
    protected $_unmappedFolders = null;
    protected $fillable = [
        'path',
    ];

    public function getFreeSpaceAttribute()
    {
        $bytes = disk_free_space($this->path);
        $si_prefix = ['B', 'KB', 'MB', 'GB', 'TB', 'EB', 'ZB', 'YB'];
        $base = 1024;
        $class = min((int)log($bytes, $base), count($si_prefix) - 1);

        return sprintf('%1.2f', $bytes / pow($base, $class)) . ' ' . $si_prefix[$class];
    }

    public function getUnmappedFoldersAttribute()
    {
        if (! isset($this->path)) {
            return [];
        }

        if (isset($this->_unmappedFolders)) {
            return $this->_unmappedFolders;
        }

        $parser = resolve('ParserService');
        $listing = resolve('FileManager')->getDirectoryListing($this->path);
        $dirs = $listing['directories'];

        $unmappedFolders = [];

        foreach ($dirs as $dir) {
            if ($parser->matchDirToComics($dir['path'])) {
                continue;
            }

            $unmappedFolders[] = $dir;
        }

        $this->_unmappedFolders = $unmappedFolders;

        return $this->_unmappedFolders;
    }

    public function getUnmappedFoldersCountAttribute()
    {
        return count($this->unmappedFolders);
    }

    public function import()
    {
        $output = [];
        $fileManager = resolve('FileManager');

        foreach ($this->unmappedFolders as $folder) {
            $count = count($fileManager->getComicsInFolder($folder['path']));
            $output[] = [
                'name' => $folder['name'],
                'path' => $folder['path'],
                'comicCount' => $count,
                'isLoading' => true,
                'isPopulated' => false,
                'error' => null,
                'items' => [],
                'monitor' => 'all',
                'checked' => false,
                'matchedComics' => [],
                'matchId' => 0,
            ];
        }

        return $output;
    }
}
