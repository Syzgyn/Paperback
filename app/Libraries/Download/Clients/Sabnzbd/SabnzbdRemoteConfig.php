<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Download\Clients\Sabnzbd\JsonTransformers\SabnzbdConfigTransformer;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdResponseInterface;
use Exception;
use PhpParser\Node\Expr\Cast\String_;

class SabnzbdRemoteConfig implements SabnzbdResponseInterface
{
    /** @var SabnzbdCategory[] */
    public array $categories = [];
    public ?string $completeDir = null;
    public ?array $tvCategories = null;
    public ?bool $enableTvSorting = null;
    public ?array $movieCategories = null;
    public ?bool $enableMovieSorting = null;
    public ?array $dateCategories = null;
    public ?bool $enableDateSorting = null;
    public ?string $preCheck = null;


    public static function getTransforms(): array
    {
        return [
            SabnzbdConfigTransformer::class,
        ];
    }

    public static function getRoot(): string
    {
        return "config";
    }
}