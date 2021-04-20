<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class RootFolder extends Model
{
    public $timestamps = false;

    protected $table = 'root_folders';
    protected $_unmappedFolders = null;
    protected $fillable = [
        'path',
    ];

    public function getAccessibleAttribute()
    {
        return is_writable($this->path);;
    }

    public function getFreeSpaceAttribute()
    {
        return disk_free_space($this->path);
    }

    public function getFormattedFreeSpaceAttribute()
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
            Log::warning("RootFolder {$this->id} does not have a set path");
            return [];
        }

        if (!is_dir($this->path)) {
            Log::debug("$path does not exist");
            return [];
        }

        if (isset($this->_unmappedFolders)) {
            return $this->_unmappedFolders;
        }

        $listing = resolve('FileManager')->getDirectoryListing($this->path);
        $possibleDirs = $listing['directories'];
        $comicDirs = DB::table('comics')->pluck('path')->toArray();

        $this->_unmappedFolders = array_udiff($possibleDirs, $comicDirs, function($possible, $comic) {
            $possible = is_array($possible) ? $possible['path'] : $possible;
            $comic = is_array($comic) ? $comic['path'] : $comic;

            if ($possible === $comic) {
                return 0;
            }
            return $possible > $comic ? 1 : -1;
        }); 

        return $this->_unmappedFolders;
    }

    public function getUnmappedFoldersCountAttribute()
    {
        return count($this->unmappedFolders);
    }
}
