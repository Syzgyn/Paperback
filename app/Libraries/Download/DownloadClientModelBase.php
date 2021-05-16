<?php

namespace App\Libraries\Download;

use App\Libraries\Providers\ProviderModelBase;
use App\Libraries\Providers\ProviderSettingsCast;
use App\Libraries\Download\Clients\Sabnzbd\Sabnzbd;
use App\Libraries\Parser\RemoteIssue;
use Exception;

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
    public abstract function getItems(): array;
    public abstract function removeItem(DownloadClientItem $item, bool $deleteData): void;
    public abstract function getStatus(): DownloadClientInfo;
    public abstract function test(): void;

    public function getImportItem(DownloadClientItem $item, DownloadClientItem $previousImportAttempt): DownloadClientItem
    {
        return $item;
    }

    protected function deleteItemData(DownloadClientItem $item): void
    {
        if (empty($item->outputPath)) {
            return;
        }

        try {
            if (is_dir((string)$item->outputPath)) {
                //TODO: log
                resolve('FileManager')->removeDir($item->outputPath);
            } elseif (is_file((string)$item->outputPath)) {
                //TODO: log
                unlink((string)$item->outputPath);
            } else {
                //TODO: log
            }
        } catch (Exception $e) {
            //TODO: log
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
