<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use stdClass;

class SabnzbdRemoteConfig
{
    public stdClass $misc;
    public array $categories;

    public function __construct()
    {
        $this->misc = new stdClass();
    }

    public static function fromArray(array $config)
    {
        $remoteConfig = new self();
        $remoteConfig->misc->complete_dir = $config['misc']['complete_dir'];
        $remoteConfig->misc->tv_categories = $config['misc']['tv_categories'];
        $remoteConfig->misc->enable_tv_sorting = $config['misc']['enable_tv_sorting'];
        $remoteConfig->misc->movie_categories = $config['misc']['movie_categories'];
        $remoteConfig->misc->enable_movie_sorting = $config['misc']['enable_movie_sorting'];
        $remoteConfig->misc->date_categories = $config['misc']['date_categories'];
        $remoteConfig->misc->enable_date_sorting = $config['misc']['enable_date_sorting'];
        $remoteConfig->misc->pre_check = $config['misc']['pre_check'];

        foreach($config['categories'] as $category) {
            $remoteConfig->categories[] = new SabnzbdCategory(...$category);
        }

        return $remoteConfig;
    }
}
