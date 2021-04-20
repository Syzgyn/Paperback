<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssueFile extends Model
{
    const UPDATED_AT = null;

    protected $guarded = [
        'id',
        'created_at',
    ];

    protected $casts = [
        'comic_id' => 'integer',
        'size' => 'integer',
    ];

    public function comic()
    {
        return $this->belongsTo('App\Models\Comic', 'comic_id', 'cvid');
    }

    public function issue()
    {
        return $this->belongsTo('App\Models\Issue', 'id', 'issue_file');
    }

    public function getPathAttribute()
    {
        return $this->comic->path . DIRECTORY_SEPARATOR . $this->relative_path;
    }

    public function getFileTypeAttribute()
    {
        return pathinfo($this->path, PATHINFO_EXTENSION);
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
}
