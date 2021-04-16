<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssueFile extends Model
{
    protected $fillable = [
        'comic_id',
        'relative_file_name',
        'original_file_name',
        'size',
    ];

    protected $casts = [
        'comic_id' => 'integer',
        'size' => 'integer',
    ];

    public $timestamps = false;

    protected $appends = [
        'readable_size',
    ];

    public function comic()
    {
        return $this->belongsTo('App\Models\Comic', 'comic_id', 'cvid');
    }

    public function issue()
    {
        return $this->belongsTo('App\Models\Issue', 'id', 'issue_file');
    }

    public static function createAndMove(array $attrs)
    {
        if ($match = self::where('issue_id', $attrs['issue_id'])->first()) {
            $match->delete();
        }

        $originalFileInfo = pathinfo($attrs['original_file_path']);
        $attrs['original_file_name'] = $originalFileInfo['basename'];
        $issue = Issue::with('comic')->find($attrs['issue_id']);

        resolve('FileManager')->getOrCreateComicDir($issue->comic);

        //TODO: Catch errors here, pass upstream
        $newFilePath = resolve('FileManager')->moveFile($attrs['original_file_path'], $issue->fullFileName);
        $newFileInfo = pathinfo($newFilePath);

        $attrs['relative_file_name'] = $newFileInfo['basename'];
        $attrs['size'] = filesize($newFilePath);

        self::create($attrs);
    }

    public function getReadableSizeAttribute()
    {
        return $this->formatSize($this->size);
    }

    protected function formatSize(Int $bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= pow(1024, $pow);

        return round($bytes, $precision) . ' ' . $units[$pow];
    }
}
