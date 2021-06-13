<?php

namespace App\Models;

use App\Libraries\MediaFiles\DeleteIssueFileReason;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
 * @property-read \App\Models\Issue $issue
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile query()
 * @method static \Illuminate\Database\Eloquent\Builder where($column, $value)
 * @method static \Illuminate\Database\Eloquent\Builder whereComicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereOriginalFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder whereRelativePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile create($value)
 * @mixin \Eloquent
 */
class IssueFile extends Model
{
    const UPDATED_AT = null;
    
    public ?string $path = null;

    protected $guarded = [
        'id',
        'created_at',
    ];

    protected $casts = [
        'comic_id' => 'integer',
        'size' => 'integer',
    ];

    public function comic(): BelongsTo
    {
        return $this->belongsTo(Comic::class, 'comic_id', 'cvid');
    }

    public function issue(): BelongsTo
    {
        return $this->belongsTo(Issue::class, 'id', 'issue_file');
    }

    public function getFileTypeAttribute(): string
    {
        return pathinfo($this->path, PATHINFO_EXTENSION);
    }

    /** 
     * @param string[] $files
     * 
     * @return string[] 
     */
    public static function filterExistingFiles(array $files, Comic $comic)
    {
        $issueFiles = IssueFile::whereComicId($comic->cvid)->get(['relative_path'])->all();

        if (empty($issueFiles)) {
            return $files;
        }

        array_walk($issueFiles, fn(string &$path) => $comic->path . DIRECTORY_SEPARATOR . $path);

        return array_diff($files, $issueFiles);
    }

    /** @param DeleteIssueFileReason::* $reason */
    public function delete(?int $reason = null): ?bool
    {
        $return = parent::delete();
        //TODO: event(new IssueFileDeletedEvent($this, $reason));

        return $return;
    }

    /*
    /** @param array{original_file_path: string, issue_id: int} $attrs 
    public static function createAndMove(array $attrs): self
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
    */
}
