<?php

namespace App\Models;

use Exception;
use App\Libraries\Download\DownloadClientModelBase;
use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Download\DownloadClientItem;
use App\Libraries\Download\DownloadClientInfo;

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
 * @mixin \Eloquent
 */
class DownloadClient extends DownloadClientModelBase
{
    public function download(RemoteIssue $remoteIssue): string
    {
        throw new Exception("Cannot call download of base download client");
    }

    public function getItems(): array
    {
        throw new Exception("Cannot call getItems of base download client");
    }

    public function removeItem(DownloadClientItem $item, bool $deleteData): void
    {
        throw new Exception("Cannot call removeItem of base download client");
    }

    public function getStatus(): DownloadClientInfo
    {
        throw new Exception("Cannot call getStatus of base download client");
    }
    
    public function test(): void
    {
        throw new Exception("Cannot call test of base download client");
    }

    public function getSettingsSchemaClassNameAttribute(): string 
    {
        throw new Exception("Cannot call getSettingSchemaClassNameAttribute of base download client");
    }

    public static function getDownloadClient(string $protocol): ?DownloadClientModelBase
    {
        $allProviders = DownloadClient::all();
        $availableProviders = [];

        foreach($allProviders as $provider) {
            if ($provider::PROTOCOL == $protocol) {
                $availableProviders[] = $provider;
            }
        }

        if (empty($availableProviders)) {
            return null;
        }

        //TODO: Download client status

        //Group by priority
        $groupedProviders = [];
        foreach($availableProviders as $provider) {
            $groupedProviders[$provider->priority][] = $provider;
        }

        //Sort by priority
        ksort($groupedProviders);

        //Get first priority group, then sort by id
        $availableProviders = array_shift($groupedProviders);
        usort($availableProviders, function($a, $b) {
            return $a->id < $b->id ? -1 : 1;
        });

        $provider = array_shift($availableProviders);

        return $provider;
    }
}
