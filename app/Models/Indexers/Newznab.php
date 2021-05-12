<?php
namespace App\Models\Indexers;

use App\Repositories\Indexers\NewznabRepository;
use App\Libraries\Indexers\IndexerModelBase;
use App\Libraries\Indexers\Newznab\NewznabSettings;
use App\Libraries\Indexers\Newznab\NewznabRequestGenerator;
use App\Libraries\Indexers\Newznab\NewznabParser;

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
 * @mixin \Eloquent
 */
class Newznab extends IndexerModelBase
{
    const URL_ENDPOINT_BASE = '/api/';
    const PROTOCOL = 'usenet';
    const PAGE_SIZE = 100;

    public $repository;
    protected $implementation = 'Newznab';
    protected $settingsSchema = 'NewznabSettings';

    public function getParser()
    {
        return new NewznabParser();
    }

    public function getRequestGenerator()
    {
        return new NewznabRequestGenerator($this->settings);
    }

    public function getSettingsSchemaClassNameAttribute(): string
    {
        return NewznabSettings::class;
    }


    public function requestAction(string $action)
    {
        if ($action === 'newznabCategories') {
            $categories = [
                7000 => 'Books',
                7010 => 'Mags',
                7020 => 'EBooks',
                7030 => 'Comics',
            ];

            $results = [];

            foreach($categories as $id => $name) {
                $item = [
                    'value' => $id,
                    'name' => $name,
                    'order' => 0,
                    'hint' => "($id)",
                ];

                if ($id !== 7000) {
                    $item['parentValue'] = 7000;
                }

                $results[] = $item;
            }

            return [
                'options' => $results,
            ];
        }

        return parent::requestAction($action);
    }
}
