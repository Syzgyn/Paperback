<?php
namespace App\Models\Indexers;

use App\Repositories\Indexers\NewznabRepository;
use App\Libraries\Indexers\IndexerModelBase;
use App\Libraries\Indexers\Newznab\NewznabSettings;
use App\Libraries\Indexers\Newznab\NewznabRequestGenerator;
use App\Libraries\Indexers\Newznab\NewznabParser;

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
