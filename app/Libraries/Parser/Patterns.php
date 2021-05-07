<?php

namespace App\Libraries\Parser;

final class Patterns
{
    public static string$fileExtensionRegex = "/\.[a-z0-9]{2,4}$/i";

    public static array $rejectedHashedReleasesRegexes = [
        // Generic match for md5 and mixed-case hashes.
        "/^[0-9a-zA-Z]{32}/",

        // Generic match for shorter lower-case hashes.
        "/^[a-z0-9]{24}$/",

        // Format seen on some NZBGeek releases
        // Be very strict with these coz they are very close to the valid 101 ep numbering.
        "/^[A-Z]{11}\d{3}$/",
        "/^[a-z]{12}\d{3}$/",

        //Backup filename (Unknown origins)
        "/^Backup_\d{5,}S\d{2}-\d{2}$/",

        //123 - Started appearing December 2014
        "/^123$/",

        //abc - Started appearing January 2015
        "/^abc$/i",

        //abc - Started appearing 2020
        "/^abc[-_. ]xyz/i",

        //b00bs - Started appearing January 2015
        "/^b00bs$/i",

        // 170424_26 - Started appearing August 2018
        "/^\d{6}_\d{2}$/",

        // additional Generic match for mixed-case hashes. - Started appearing Dec 2020
        "/^[0-9a-zA-Z]{30}/",

        // additional Generic match for mixed-case hashes. - Started appearing Jan 2021
        "/^[0-9a-zA-Z]{26}/",

        // additional Generic match for mixed-case hashes. - Started appearing Jan 2021
        "/^[0-9a-zA-Z]{39}/",
        
        // additional Generic match for mixed-case hashes. - Started appearing Jan 2021
        "/^[0-9a-zA-Z]{24}/",
    ];

    public static string $cleanFileTypeRegex = "/\((?:cbr|cbz|cbt|cba|cb7)\)$/i";

    public static string $parseFileTypeRegex = "/\(?(?<type>cbr|cbz|cbt|cba|cb7)\)?$/i";

    public static string $requestInfoRegex = "/^(?:\[.+?\])+/";

    public static string $yearInTitleRegex = "/^(?<title>.+?)(?:\W|_)?(?<year>\d{4})/i";

    public static array $reportTitleRegexes = [
        "/^(?<title>.*?)[-_. ]+(?<issue>\d+)[-_. ]+\(?(?<year>\d{2,4})\)?/i"
    ];

    public static string $releaseGroupRegex = "/\.eBook-(?<releasegroup>[a-z0-9]+)|\.(?<releasegroup>[a-z0-9-]+)$|\((?<releasegroup>[a-z0-9- ]+)\)$/iJ";

    public static string $invalidReleaseGroupRegex = "/^([se]\d+|[0-9a-f]{8})$/i";

    public static string $percentRegex = "/(\b\d+)\K%/";

    public static string $normalizeRegex = "/((?:\b|_)(?<!^)(a(?!$)|an|the|and|or|of)(?!$)(?:\b|_))|\W|_/i";
}
