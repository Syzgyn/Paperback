<?php
namespace App\Models\Indexers;

use App\Models\Indexer;
use App\Repositories\Indexers\NewznabRepository;
use App\Http\Resources\Indexers\NewznabCollection;
use App\Libraries\Indexers\Newznab\NewznabSettings;
use App\Libraries\Indexers\Newznab\NewznabRequestGenerator;
use App\Libraries\Indexers\Newznab\NewznabParser;

class Newznab extends Indexer
{
    const URL_ENDPOINT_BASE = '/api/';
    const PROTOCOL = 'usenet';

    public $repository;
    protected $implementation = 'Newznab';
    protected $settingsSchema = 'NewznabSettings';

    protected $modelSchema = [
        'protocol' => 'usenet',
        'name' => 'Newznab',
        'fields' => [
            'settings.url' => [
                'label' => 'Base URL',
                'type' => 'text',
                'validation' => ['required', 'string'],
            ],
            'settings.apikey' => [
                'label' => 'API Key',
                'type' => 'text',
                'validation' => ['required', 'alpha_num'],
            ],
        ],
    ];

    public function getParser()
    {
        return new NewznabParser();
    }

    public function getRequestGenerator()
    {
        return new NewznabRequestGenerator($this->settings);
    }

    public function searchCvid($comic, $issue = '', $year = '', $comicYear = null, $offset = 0)
    {
        $query = "$comic $issue $year";
        $result = $this->repository->search($query, $offset);

        return new NewznabCollection($result);
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
