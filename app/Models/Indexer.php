<?php

namespace App\Models;

use Exception;
use App\Libraries\Indexers\IndexerModelBase;

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
 * @mixin \Eloquent
 */
class Indexer extends IndexerModelBase
{
    protected function getParser()
    {
        throw new Exception("Cannot call getParser of base Indexer");
    }

    protected function getRequestGenerator()
    {
        throw new Exception("Cannot call getRequestGenerator of base Indexer");
    }
}
