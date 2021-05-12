<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Libraries\Download\Clients\Sabnzbd{
/**
 * App\Libraries\Download\Clients\Sabnzbd\Sabnzbd
 *
 * @property int $id
 * @property string $name
 * @property string $implementation
 * @property $settings
 * @property string|null $settings_schema
 * @property bool|null $enable
 * @property int $priority
 * @property-read array $fields
 * @property-read mixed $foo
 * @property-read string $settings_schema_class_name
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereEnable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereImplementation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd whereSettingsSchema($value)
 */
	class Sabnzbd extends \Eloquent {}
}

namespace App\Models{
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
 * @property string|null $add_options
 * @property-read mixed $directory_name
 * @property-read mixed $full_directory_name
 * @property-read mixed $issue_file_count
 * @property-read mixed $total_issue_file_size
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\IssueFile[] $issueFiles
 * @property-read int|null $issue_files_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Issue[] $issues
 * @property-read int|null $issues_count
 * @method static \Illuminate\Database\Eloquent\Builder|Comic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Comic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Comic query()
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereAddOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereCvid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereMonitored($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereOverview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic wherePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic wherePublisher($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comic whereYear($value)
 */
	class Comic extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DownloadClient
 *
 * @property int $id
 * @property string $name
 * @property string $implementation
 * @property $settings
 * @property string|null $settings_schema
 * @property bool|null $enable
 * @property int $priority
 * @property-read array $fields
 * @property-read mixed $foo
 * @property-read string $settings_schema_class_name
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient query()
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient whereEnable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient whereImplementation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DownloadClient whereSettingsSchema($value)
 */
	class DownloadClient extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Downloader
 *
 * @property-read mixed $enable
 * @property-read mixed $protocol
 * @property-read mixed $schema
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TrackedDownload[] $trackedDownloads
 * @property-read int|null $tracked_downloads_count
 * @method static \Illuminate\Database\Eloquent\Builder|Downloader newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Downloader newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Downloader query()
 */
	class Downloader extends \Eloquent {}
}

namespace App\Models\Downloaders\Usenet{
/**
 * App\Models\Downloaders\Usenet\Sabnzbd
 *
 * @property-read mixed $enable
 * @property-read mixed $protocol
 * @property-read mixed $schema
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TrackedDownload[] $trackedDownloads
 * @property-read int|null $tracked_downloads_count
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sabnzbd query()
 */
	class Sabnzbd extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\History
 *
 * @property int $id
 * @property int $comic_id
 * @property int $issue_id
 * @property string $source_title
 * @property \Illuminate\Support\Carbon $date
 * @property \App\Dto\HistoryData $data
 * @property int|null $event_type
 * @property string|null $download_id
 * @method static \Illuminate\Database\Eloquent\Builder|History newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|History newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|History query()
 * @method static \Illuminate\Database\Eloquent\Builder|History whereComicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereDownloadId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereEventType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereIssueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|History whereSourceTitle($value)
 */
	class History extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Indexer
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
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereEnableAutomaticSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereEnableInteractiveSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereEnableRss($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereImplementation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Indexer whereSettingsSchema($value)
 */
	class Indexer extends \Eloquent {}
}

namespace App\Models\Indexers{
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
 */
	class GetComics extends \Eloquent {}
}

namespace App\Models\Indexers{
/**
 * App\Models\Indexers\Newznab
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
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab query()
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab whereEnableAutomaticSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab whereEnableInteractiveSearch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab whereEnableRss($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab whereImplementation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newznab whereSettingsSchema($value)
 */
	class Newznab extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Issue
 *
 * @property int $cvid
 * @property int $comic_id
 * @property int $issue_num
 * @property string|null $title
 * @property string|null $overview
 * @property int|null $issue_file
 * @property bool|null $monitored
 * @property string|null $store_date
 * @property string|null $cover_date
 * @property array|null $images
 * @property-read \App\Models\Comic $comic
 * @property-read mixed $active_downloads
 * @property-read mixed $file_name
 * @property-read mixed $has_file
 * @property-read mixed $status
 * @property-read \App\Models\IssueFile|null $issueFile
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\TrackedDownload[] $trackedDownloads
 * @property-read int|null $tracked_downloads_count
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue query()
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereComicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereCoverDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereCvid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereIssueFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereIssueNum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereMonitored($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereOverview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereStoreDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Issue whereTitle($value)
 */
	class Issue extends \Eloquent {}
}

namespace App\Models{
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
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereComicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereOriginalFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereRelativePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|IssueFile whereSize($value)
 */
	class IssueFile extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\RemotePathMapping
 *
 * @property int $id
 * @property string $host
 * @property string $remote_path
 * @property string $local_path
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping query()
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping whereHost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping whereLocalPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping whereRemotePath($value)
 */
	class RemotePathMapping extends \Eloquent {}
}

namespace App\Models{
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
 * @method static \Illuminate\Database\Eloquent\Builder|RootFolder whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RootFolder wherePath($value)
 */
	class RootFolder extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Tag
 *
 * @property int $id
 * @property string $label
 * @method static \Illuminate\Database\Eloquent\Builder|Tag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tag whereLabel($value)
 */
	class Tag extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TrackedDownload
 *
 * @property-read \App\Models\Comic $comic
 * @property-read \App\Models\Downloader $downloadClient
 * @property-read mixed $download_data
 * @property-read \App\Models\Issue $issue
 * @method static \Illuminate\Database\Eloquent\Builder|TrackedDownload newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TrackedDownload newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TrackedDownload query()
 */
	class TrackedDownload extends \Eloquent {}
}

