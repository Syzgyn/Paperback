<?php

namespace App\Libraries\Providers;

use Illuminate\Database\Eloquent\Model;
use App\Exceptions\TestException;
use App\Libraries\Http\HttpRequest;

/** 
 * @property ProviderSettings $settings
 * @property bool $enable
 * @property class-string<ProviderSettings> $settingsSchemaClassName
 * @property string $configContract
 * @property string $dateFormat
 * @psalm-consistent-constructor
 */
abstract class ProviderModelBase extends Model
{
    const PROTOCOL = "Unknown";
    
    protected $casts = [
        'settings' => ProviderSettingsCast::class,
        'priority' => 'integer',
    ];

    public string $configContract;

    /** @return class-string<ProviderModelBase>[] */
    abstract function getChildClasses(): array;
    abstract function test(): void;

    public function getProtocol(): string
    {
        /** @var string */
        return static::PROTOCOL;
    }

    public function getNameAttribute(): string
    {
        return (string) ($this->attributes['name'] ?? $this->name ?? "");
    }

    public function getImplementationAttribute(): string
    {
        return (string) ($this->attributes['implementation'] ?? $this->implementation ?? "");
    }

    public function getSettingsSchemaAttribute(): string
    {
        return (string) ($this->attributes['settings_schema'] ?? $this->settingsSchema);
    }

    /** 
     * @param array<array-key, mixed> $attributes 
     * @param string|null $connection
     * @return self
    */
    public function newFromBuilder($attributes = [], $connection = null)
    {
        /** @psalm-suppress RedundantCast */
        $attributes = (array) $attributes;
        if (gettype($attributes['implementation']) != "string") {
            return parent::newFromBuilder($attributes, $connection);
        }

        $class = null;
        /** @var class-string $className */
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
        /** @var ProviderModelBase $instance 
         * @psalm-suppress MixedMethodCall
        */
        $instance = new $class;
        $instance->prepareAttributes($attributes);
        
        if (isset($attributes['id'])) {
            $instance->exists = true;
        }

        $instance->setRawAttributes($attributes, true);
        
        return $instance;
    }

    protected function prepareAttributes(array &$attributes): void
    {
        if (isset($attributes['settings']) && gettype($attributes['settings']) === 'array') {
            $attributes['settings'] = json_encode($attributes['settings']);
        }
    }

    public function requestAction(string $action): mixed
    {
        return null;
    }
    
    abstract public function getSettingsSchemaClassNameAttribute(): string;
}
