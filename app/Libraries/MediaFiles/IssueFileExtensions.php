<?php

namespace App\Libraries\MediaFiles;

final class IssueFileExtensions
{
    public static array $extensions = [
        '.cbr',
        '.cbz',
        '.cba',
        '.cb7',
        '.cbt',
    ];

    public static function pathIsIssueFile(?string $path): bool
    {
        if (!$path) {
            return false;
        }
        
        $extension = pathinfo($path, PATHINFO_EXTENSION);

        return in_array($extension, self::$extensions);
    }
}
