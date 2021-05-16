<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\RootFolder
 *
 * @property int $id
 * @property string $path
 * @property-read mixed $accessible
 * @property-read mixed $formatted_free_space
 * @property-read mixed $free_space
 * @property-read mixed $unmapped_folders
 * @property-read mixed $unmapped_folders_count
 * @method static \Illuminate\Database\Eloquent\Builder|RootFolder newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RootFolder newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RootFolder query()
 * @method static RootFolder create($params)
 * @method static \Illuminate\Database\Eloquent\Builder|RootFolder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RootFolder wherePath($value)
 * @mixin \Eloquent
 */
class RootFolder extends Model
{
    public $timestamps = false;

    protected $table = 'root_folders';
    protected ?array $_unmappedFolders = null;
    protected $fillable = [
        'path',
    ];

    public function getAccessibleAttribute(): bool
    {
        return is_writable($this->path);;
    }

    public function getFreeSpaceAttribute(): float
    {
        return disk_free_space($this->path);
    }

    public function getFormattedFreeSpaceAttribute(): string
    {
        $bytes = disk_free_space($this->path);
        $si_prefix = ['B', 'KB', 'MB', 'GB', 'TB', 'EB', 'ZB', 'YB'];
        $base = 1024;
        $class = min((int)log($bytes, $base), count($si_prefix) - 1);

        return sprintf('%1.2f', $bytes / pow($base, $class)) . ' ' . $si_prefix[$class];
    }

    public function getUnmappedFoldersAttribute(): array
    {
        if (! isset($this->path) || ! is_string($this->path)) {
            Log::warning("RootFolder {$this->id} does not have a set path");
            return [];
        }
        
        if (!is_dir($this->path)) {
            Log::debug("{$this->path} does not exist");
            return [];
        }

        if (isset($this->_unmappedFolders)) {
            return $this->_unmappedFolders;
        }

        $listing = resolve('FileManager')->getDirectoryListing($this->path);
        $possibleDirs = $listing['directories'];
        $comicDirs = DB::table('comics')->pluck('path')->toArray();

        $this->_unmappedFolders = array_udiff($possibleDirs, $comicDirs, function(string|array $possible, string|array $comic) {
            /** @var string */
            $possible = is_array($possible) ? $possible['path'] : $possible;
            /** @var string */
            $comic = is_array($comic) ? $comic['path'] : $comic;

            if ($possible === $comic) {
                return 0;
            }
            return $possible > $comic ? 1 : -1;
        }); 

        return $this->_unmappedFolders;
    }

    public function getUnmappedFoldersCountAttribute(): int
    {
        return count($this->unmappedFolders);
    }
}
