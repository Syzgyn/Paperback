<?php

namespace App\Libraries\History;

use App\Models\Comic;
use App\Models\Issue;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Query\Builder;
use Barryvdh\LaravelIdeHelper\Eloquent;
use DateTime;

/**
 * @property int $id
 * @property int $comic_id
 * @property int $issue_id
 * @property string $source_title
 * @property DateTime $date
 * @property array $data
 * @property int $event_type
 * @property string $download_id
 * @property Comic $comic
 * @property Issue $issue
 * 
 * @method IssueHistory first()
 * @method \Illuminate\Database\Eloquent\Collection get()
 * @method \Illuminate\Database\Eloquent\Builder|IssueHistory orderByDesc($column)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueHistory where($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueHistory whereIssueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueHistory whereDownloadId($value)
 * @method \Illuminate\Database\Eloquent\Builder|IssueHistory whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder whereComicId($value)
 * 
 * @mixin Eloquent
 */
class IssueHistory extends Model
{
    public $table = "history";
    public $guarded = [];
    public $timestamps = false;

    protected $casts = [
        'date' => 'datetime',
        'data' => 'array'
    ];

    public function comic(): BelongsTo
    {
        return $this->belongsTo(Comic::class, 'comic_id', 'cvid');
    }

    public function issue(): BelongsTo
    {
        return $this->belongsTo(Issue::class, 'issue_id', 'cvid');
    }

    public static function mostRecentForIssue(int $issueId): ?self
    {
        /** @var ?IssueHistory */
        return IssueHistory::whereIssueId($issueId)->orderByDesc("date")->first();
    }

    public static function findByIssueId(int $issueId): Collection
    {
        /** @var Collection<IssueHistory> */
        return IssueHistory::whereIssueId($issueId)->orderByDesc("date")->get();
    }

    public static function mostRecentForDownloadId(string $downloadId): ?self
    {
        /** @var ?IssueHistory */
        return IssueHistory::whereDownloadId($downloadId)->orderByDesc("date")->first();
    }

    public static function findByDownloadId(string $downloadId): Collection
    {
        /** @var Collection<IssueHistory> */
        return IssueHistory::whereDownloadId($downloadId)->get();
    }

    public static function findByComic(int $comicId, ?int $eventType = null): Collection
    {
        /** @var Builder $query */
        $query = IssueHistory::whereComicId($comicId);

        if ($eventType) {
            /** @var Builder $query */
            $query->whereEventType($eventType);
        }

        /** @var Collection<IssueHistory> */
        return $query->orderByDesc("date")->get();
    }

    public static function findDownloadHistory(int $comicId): Collection
    {
        return IssueHistory::whereComicId($comicId)
            ->where(function(Builder $query) {
                $query->where("event_type", IssueHistoryEventType::GRABBED)
                    ->orWhere("event_type", IssueHistoryEventType::DOWNLOAD_FAILED)
                    ->orWhere("event_type", IssueHistoryEventType::DOWNLOAD_FOLDER_IMPORTED);
            })->get();
    }

    public static function deleteForComic(int $comicId): void
    {
        IssueHistory::whereComicId($comicId)->delete();
    }

    public static function since(DateTime $date, ?int $eventType = null): Collection
    {
        $query = IssueHistory::where("date", ">=", $date);

        if ($eventType) {
            $query->whereEventType($eventType);
        }

        return $query->orderBy("date")->get();
    }
}