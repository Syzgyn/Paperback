<?php
namespace App\Models\Indexers;

use App\Models\Indexer;
use App\Models\TrackedDownload;
use App\Repositories\Indexers\GetComicsRepository;
use App\Http\Resources\Indexers\GetComicsCollection;
use App\Models\Downloaders\DDL\GetComics as GetComicsDownloader;

/**
 * App\Models\Indexers\GetComics
 *
 * @property int $id
 * @property string $name
 * @property string $implementation
 * @property |null $settings
 * @property string|null $settings_schema
 * @property bool|null $enable_rss
 * @property bool|null $enable_automatic_search
 * @property bool $enable_interactive_search
 * @property int $priority
 * @property-read bool $enable
 * @property-read array $fields
 * @property-read mixed $foo
 * @property-read string $settings_schema_class_name
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics query()
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics whereEnableAutomaticSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics whereEnableInteractiveSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics whereEnableRss($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics whereImplementation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GetComics whereSettingsSchema($value)
 * @mixin \Eloquent
 */
class GetComics extends Indexer
{
    const URL_ENDPOINT_BASE = '/api/';
    const PROTOCOL = 'ddl';

    public $repository;

    protected $fillable = [
        'name',
        'class',
        'enableSearch',
    ];

    protected static $singleTableType = self::class;

    protected $modelSchema = [
        'protocol' => 'ddl',
        'name' => 'GetComics.info',
        'fields' => [],
    ];

    public function searchCvid($comic, $issue = '', $year = '', int $comicYear = null, $offset = 0)
    {
        $query = $comic;
        $result = $this->repository->search($query, $offset);

        return new GetComicsCollection($result);
    }

    protected static function booted()
    {
        static::creating(function ($indexer) {
            $indexer->class = self::class;
        });

        static::retrieved(function ($indexer) {
            $indexer->repository = new GetComicsRepository();
            $indexer->class = self::class;
        });
    }

    public function test(): void
    {
        //Manually create the repo if we're working with an unsaved model
        if (! $this->repository) {
            $this->repository = new GetComicsRepository();
        }

        $this->repository->test();
    }

    public function getDownloader(TrackedDownload $download)
    {
        return new GetComicsDownloader($download);
    }
}
