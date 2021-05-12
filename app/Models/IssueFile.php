<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\IssueFile
 *
 * @property int $id
 * @property int $comic_id
 * @property int $size
 * @property \Illuminate\Support\Carbon $created_at
 * @property string|null $relative_path
 * @property string|null $original_file_path
 * @property-read \App\Models\Comic $comic
 * @property-read mixed $file_type
 * @property-read mixed $path
 * @property-read \App\Models\Issue $issue
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile query()
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile where($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereComicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereOriginalFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereRelativePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile create($value)
 * @mixin \Eloquent
 */
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
