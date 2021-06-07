<?php

namespace App\Models;

use App\Repositories\ComicVineRepository;
use App\Traits\ChangeComicLinks;
use App\Services\FileManager;
use App\Services\ParserService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Comic
 *
 * @property int $cvid
 * @property string $title
 * @property int $status
 * @property string|null $overview
 * @property array $images
 * @property string $path
 * @property bool $monitored
 * @property string|null $publisher
 * @property int|null $year
 * @property array $tags
 * @property \Illuminate\Support\Carbon $created_at
 * @property string $table
 * @property string $dateFormat
 * @property string|null $add_options
 * @property-read mixed $directory_name
 * @property-read mixed $full_directory_name
 * @property-read mixed $issue_file_count
 * @property-read mixed $total_issue_file_size
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\IssueFile[] $issueFiles
 * @property-read int|null $issue_files_count
 * @property-read \Illuminate\Database\Eloquent\Collection $issues
 * @property-read int|null $issues_count
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereAddOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereCvid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereMonitored($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereOverview($value)
 * @method static \Illuminate\Database\Eloquent\Builder wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic wherePublisher($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic create($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic find($value)
 * @method static Comic|null firstWhere($column, $value = null)
 * @mixin \Eloquent
 */
class Comic extends Model
{
    use ChangeComicLinks;

    const IMAGE_KEY = 'small_url';
    const UPDATED_AT = null;

    public $primaryKey = 'cvid';
    public $incrementing = false;

    protected $guarded = [
        'created_at',
    ];

    /** @var array<array-key, mixed> */
    protected $attributes = [
        'tags' => '[]',
    ];

    protected $casts = [
        'cvid' => 'integer',
        'year' => 'integer',
        'downloadedIssuesCount' => 'integer',
        'monitored' => 'boolean',
        'images' => 'array',
        'tags' => 'array',
    ];

    public function issues(): HasMany
    {
        /**
         * @var HasMany 
         * @psalm-suppress InvalidArgument
        */
        return $this->hasMany(Issue::class, 'comic_id', 'cvid')->orderBy('issue_num', 'DESC');
    }

    public function issueFiles(): HasMany
    {
        /** @var HasMany */
        return $this->hasMany(IssueFile::class, 'comic_id', 'cvid');
    }

    public function getIssueFileCountAttribute(): int
    {
        return (int)$this->issueFiles()->count();
    }

    public function getTotalIssueFileSizeAttribute(): int
    {
        return (int)($this->issueFiles()->sum('size'));
    }

    public function getImagesAttribute(): array
    {
        if (empty($this->attributes['images'])) {
            return [];
        }
        /** @var array<string[]> $images  */
        $images = json_decode((string)$this->attributes['images'], true);
        foreach($images as $k => $v) {
            /** @psalm-var array<string, string> $v */
            if ($v['coverType'] === 'poster') {
                $images[$k]['url'] = asset('/storage/comics/' . $this->cvid . '.jpg');
            }
        }
        return $images;
    }

    /*
    public static function createFromCvid($cvid, $grabImage = true, $searchIssues = false)
    {
        $repo = resolve('ComicVineRepository');
        $volume = $repo->volume($cvid);

        $comic = Comic::create($volume);
        resolve('FileManager')->getOrCreateComicDir($comic);

        if ($grabImage) {
            $imagePath = $volume['images'][self::IMAGE_KEY];
            $comic->downloadImage($imagePath);
        }

        if ($searchIssues) {
            //TODO: Add job to search issues
        }

        return $comic;
    }

    public function updateFromComicvine($grabImage = true, $fetchIssues = false)
    {
        $repo = resolve('ComicVineRepository');
        $volume = $repo->volume($this->cvid);

        $this->fill($volume);

        if ($grabImage) {
            $imagePath = $volume['images'][self::IMAGE_KEY];
            $this->downloadImage($imagePath);
        }

        if ($fetchIssues) {
            $this->fetchIssues();
        }

        return $this;
    }

    protected function downloadImage($path)
    {
        //TODO: Replace with Guzzle
        $contents = file_get_contents($path);
        Storage::disk('comics')->put($this->cvid . '.jpg', $contents);
    }
    */

    protected function fetchIssues(): void
    {
        /** @var ComicVineRepository */
        $repo = resolve('ComicVineRepository');
        $issues = $repo->volumeIssues($this->cvid);

        /** @var Issue $issue */
        foreach ($issues as $issue) {
            Issue::updateOrCreate(['cvid' => $issue['cvid']], $issue);
        }
    }

    protected static function booted()
    {
        static::created(function (Comic $comic) {
            /** @var FileManager */
            $fileManager = resolve('FileManager');
            $fileManager->getOrCreateComicDir($comic);
            $comic->fetchIssues();
        });
    }

    public function getOverviewAttribute(): string
    {
        return $this->changeComicLinks((string) $this->attributes['overview']);
    }

    public function importIssueFiles(): void
    {
        /** @var FileManager */
        $fileManager = resolve('FileManager');
        /** @var ParserService */
        $parser = resolve('OldParserService');
        $files = $fileManager->getIssuesInFolder($this->path);

        foreach ($files as $file) {
            $info = $parser->getIssueInfoFromFile($file);

            /** @var Issue $issue */
            foreach ($this->issues as $issue) {
                /** @var bool $issue->hasFile */
                if ($issue->hasFile) {
                    continue;
                }

                if ($issue->issue_num == $info['issueNum']) {
                    $size = filesize($this->path . DIRECTORY_SEPARATOR . $file);
                    /** @var IssueFile $issueFile */
                    $issueFile = IssueFile::create([
                        'comic_id' => $this->cvid,
                        'relative_path' => $file,
                        'size' => $size,
                    ]);
                    $issue->issue_file = $issueFile->id;
                    $issue->save();
                    break;
                }
            }
        }
    }
}
