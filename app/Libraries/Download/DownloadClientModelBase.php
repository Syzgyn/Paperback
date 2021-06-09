<?php

namespace App\Libraries\Download;

use App\Libraries\Providers\ProviderModelBase;
use App\Libraries\Providers\ProviderSettingsCast;
use App\Libraries\Download\Clients\Sabnzbd\Sabnzbd;
use App\Libraries\Parser\RemoteIssue;
use Exception;
use Illuminate\Support\Facades\Log;

/**
 * App\Libraries\Download\DownloadClientModelBase
 *
 * @property int $id
 * @property string $name
 * @property string $implementation
 * @property $settings
 * @property string|null $settings_schema
 * @property bool|null $enable
 * @property int $priority
 * 
 * @method static \Illuminate\Database\Eloquent\Builder whereEnable($value)
 */
abstract class DownloadClientModelBase extends ProviderModelBase
{
    const PROTOCOL = null;

    protected $casts = [
        'settings' => ProviderSettingsCast::class,
        'priority' => 'integer',
        'enable' => 'boolean',
    ];

    public $timestamps = false;
    protected $guarded = [
        'protocol',
    ];
    protected $table = 'download_clients';

    public $attributes = [
        'priority' => 1,
        'enable' => true,
    ];

    public function getChildClasses(): array
    {
        return [
            Sabnzbd::class,
        ];
    }

    public abstract function download(RemoteIssue $remoteIssue): string;
    /** @return DownloadClientItem[] */
    public abstract function getItems(): array;
    public abstract function removeItem(DownloadClientItem $item, bool $deleteData): void;
    public abstract function getStatus(): DownloadClientInfo;
    public abstract function test(): void;

    public function getImportItem(DownloadClientItem $item, DownloadClientItem $previousImportAttempt = null): DownloadClientItem
    {
        return $item;
    }

    protected function deleteItemData(DownloadClientItem $item): void
    {
        if (empty($item->outputPath)) {
            Log::debug(sprintf("'%s' doesn't have an outputPath, skipping delete data.", $item->title ?? "Unknown Title"));
            return;
        }

        try {
            if (is_dir((string)$item->outputPath)) {
                Log::debug(sprintf("[%s] deleting folder '%s'.", $item->title ?? "Unknown Title", (string) $item->outputPath));
                resolve('FileManager')->removeDir((string) $item->outputPath);
            } elseif (is_file((string)$item->outputPath)) {
                Log::debug(sprintf("[%s] deleting file '%s'.", $item->title ?? "Unknown Title", (string) $item->outputPath));
                unlink((string)$item->outputPath);
            } else {
                Log::debug(sprintf("[%s] file or folder '%s' doesn't exist, skipping cleanup.", $item->title ?? "Unknown Title", (string) $item->outputPath));
            }
        } catch (Exception $e) {
            Log::warning(
                sprintf("[%s] Error occured when trying to delete data from '%s'.", $item->title ?? "Unknown Title", (string) $item->outputPath),
                ['exception' => $e]
            );
        }
    }

    protected function testFolder(string $folder, string $propertyName, bool $mustBeWritable = true): void
    {
        if (!is_dir($folder)) {
            throw new Exception("Folder does not exist");
        }

        if ($mustBeWritable && !resolve('FileManager')->folderIsWritable($folder)) {
            throw new Exception("Unable to write to folder");
        }
    }
    
    public function markItemAsImported(DownloadClientItem $item): void
    {
        throw new Exception($this->name . " does not support marking items as imported");
    }

}
