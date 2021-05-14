<?php

namespace App\Libraries\Download\Clients\Sabnzbd\JsonTransformers;

use App\Libraries\Download\Clients\Sabnzbd\SabnzbdCategory;
use App\Libraries\Download\Clients\Sabnzbd\SabnzbdRemoteConfig;
use Exception;
use Karriere\JsonDecoder\Bindings\ArrayBinding;
use Karriere\JsonDecoder\Bindings\CallbackBinding;
use Karriere\JsonDecoder\ClassBindings;
use Karriere\JsonDecoder\Transformer;

class SabnzbdConfigTransformer implements Transformer
{
    public function register(ClassBindings $classBindings): void
    {
        $classBindings->register(new ArrayBinding('categories', 'categories', SabnzbdCategory::class));
        $classBindings->register(new CallbackBinding('completedDir', fn(array $p) => $this->fromMisc($p, 'complete_dir')));
        $classBindings->register(new CallbackBinding('tvCategories', fn(array $p) => $this->fromMisc($p, 'tv_categories')));
        $classBindings->register(new CallbackBinding('movieCategories', fn(array $p) => $this->fromMisc($p, 'movie_categories')));
        $classBindings->register(new CallbackBinding('dateCategories', fn(array $p) => $this->fromMisc($p, 'date_categories')));
        $classBindings->register(new CallbackBinding('enableTvSorting', fn(array $p) => $this->fromMisc($p, 'enable_tv_sorting')));
        $classBindings->register(new CallbackBinding('enableMovieSorting', fn(array $p) => $this->fromMisc($p, 'enable_movie_sorting')));
        $classBindings->register(new CallbackBinding('enableDateSorting', fn(array $p) => $this->fromMisc($p, 'enable_date_sorting')));
        $classBindings->register(new CallbackBinding('preCheck', fn(array $p) => $this->fromMisc($p, 'pre_check')));
    }

    public function transforms(): string
    {
        return SabnzbdRemoteConfig::class;
    }

    protected function fromMisc(array $properties, string $key): string|bool|array
    {
        if (!is_array($properties['misc'])) {
            throw new Exception("Got malformed Sabnzbd config data");
        }

        /** @var string|bool|array */
        return $properties['misc'][$key];
    }
}
