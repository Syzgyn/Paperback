<?php

namespace App\Libraries\Providers;

use Illuminate\Database\Eloquent\Model;
use App\Exceptions\TestException;
use App\Libraries\Http\HttpRequest;

abstract class ProviderModel extends Model
{
    protected $casts = [
        'settings' => ProviderSettingsCast::class,
        'priority' => 'integer',
    ];

    public $configContract;
    public $protocol;

    abstract function getParser();
    abstract function getRequestGenerator();
    abstract function getChildClasses(): array;

    public function getProtocol(): ?string
    {
        return static::PROTOCOL;
    }

    public function getFieldsAttribute(): array 
    {
        return $this->attributes['fields'] ?? $this->name ?? "";
    }

    public function getSettingsSchemaAttribute(): ?string
    {
        return $this->attributes['settings_schema'] ?? $this->settingsSchema ?? null;
    }

    public function newFromBuilder($attributes = [], $connection = null)
    {
        if (!is_array($attributes)) {
            $attributes = (array) $attributes;
        }

        $class = null;
        foreach($this->getChildClasses() as $className) {
            if (ucfirst($attributes['implementation']) === class_basename($className)) {
                $class = $className;
                break;
            }
        }
        
        if (!$class) {
            return parent::newFromBuilder($attributes, $connection);
        }

        //From http://oldblog.codebyjeff.com/blog/2014/07/single-table-inheritence-in-laravel
        $instance = new $class;
        $instance->prepareAttributes($attributes);
        
        if (isset($attributes['id'])) {
            $instance->exists = true;
        }
        //$instance->fill((array) $attributes);

        $instance->setRawAttributes((array) $attributes, true);
        
        return $instance;
    }

    public function saveOriginalOnly()
    {
        $dirty = $this->getDirty();

        foreach ($this->getAttributes() as $key => $value) {
            if(!in_array($key, array_keys($this->getOriginal()))) {
                unset($this->{$key});
            }
        }

        $isSaved = $this->save();
        foreach($dirty as $key => $value) {
            $this->setAttribute($key, $value);
        }

        return $isSaved;
    }


    protected function prepareAttributes(array &$attributes): void
    {
        if (isset($attributes['settings']) && gettype($attributes['settings']) === 'array') {
            $attributes['settings'] = json_encode($attributes['settings']);
        }
    }

    public function requestAction(string $action)
    {
        return null;
    }

    public function test()
    {
        try {
            $requestGenerator = $this->getRequestGenerator();

            $requests = $requestGenerator->getRecentRequests()->getAllTiers();
            $request = array_shift($requests)->current();

            if (!$request) {
                throw new TestException("No rss feed query available. This may be an issue with the indexer or your indexer category settings.");
            }

            $results = $this->fetchPage($request);

            if (empty($results)) {
                throw new TestException("Query successful, but no results were returned from your indexer. This may be an issue with the indexer or your indexer category settings.");
            }
        } catch(Exception $e)
        {
            throw $e;
        }
    }

    protected function fetchPage(HttpRequest $request): ?array
    {
        //TODO: Implement per-key rate limiting
        $request->rateLimitKey = "indexer-" . $this->id;

        $response = resolve("HttpClient")->execute($request);

        $parser = $this->getParser();

        return $parser->parseResponse($response);
    }

    public function getSettingsSchemaClassName(): ?string
    {
        if (!$this->settingsSchema) {
            throw new \Exception(sprintf("ProviderModel %s does not have a valid settingsSchema path", get_class($this)));
        }

        $classType = class_basename(get_parent_class($this)) . 's';
        $className = class_basename($this);

        return "App\\Libraries\\{$classType}\\{$className}\\{$this->settingsSchema}";

    }
}
