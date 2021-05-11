<?php

namespace App\Libraries\Providers;

use Illuminate\Database\Eloquent\Model;
use App\Exceptions\TestException;
use App\Libraries\Http\HttpRequest;

abstract class ProviderModelBase extends Model
{
    protected $casts = [
        'settings' => ProviderSettingsCast::class,
        'priority' => 'integer',
    ];

    public $configContract;
    public $protocol;

    abstract function getChildClasses(): array;
    abstract function test(): void;

    public function getProtocol(): ?string
    {
        return static::PROTOCOL;
    }

    public function getNameAttribute(): string
    {
        return $this->attributes['name'] ?? $this->name ?? "";
    }

    public function getFooAttribute($val)
    {
        dd($val);
        return 'abcd';
    }

    public function getImplementationAttribute(): string
    {
        return $this->attributes['implementation'] ?? $this->implementation ?? "";
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

        $instance->setRawAttributes((array) $attributes, true);
        
        return $instance;
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
    
    abstract public function getSettingsSchemaClassNameAttribute(): string;
}
