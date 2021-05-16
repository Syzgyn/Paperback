<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use App\Repositories\ComicVineRepository;

trait ChangeComicLinks
{
    public function changeComicLinks(string $text): string
    {
        $ids = DB::table('comics')->pluck('cvid')->toArray();
        //Find all links
        $text = preg_replace_callback(
            '/<a.*?href="([^"]*)".*?>/',
            function (array $matches) use ($ids) {
                $match = $matches[1];
                if (substr($match, 0, 4) === 'http') {
                    return preg_replace(
                        '/a href/',
                        'a target="_blank" href',
                        $matches[0]
                    );
                }

                preg_match(
                    '/' . ComicVineRepository::VOLUME_PREFIX . '(\d+)/',
                    $match,
                    $comicId
                );

                if (isset($comicId[1]) && in_array($comicId[1], $ids)) {
                    return '<a href="/comic/' . $comicId[1] . '">';
                } else {
                    return preg_replace(
                        '/href\=\"\//',
                        'target="_blank" href="https://comicvine.gamespot.com/',
                        $matches[0]
                    );
                }
            },
            $text,
            -1
        );

        return $text;
    }
}
