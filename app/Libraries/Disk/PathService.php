<?php

namespace App\Libraries\Disk;

use Exception;
use SplFileInfo;

class PathService
{
    public static function cleanFilePath(string $path): string
    {
        if (empty($path) || !self::isPathValid($path)) {
            throw new Exception("Invalid Path");
        }

        $info = new SplFileInfo(trim($path));

        if (PHP_OS_FAMILY == "Windows" && str_starts_with($info->getRealPath(), "\\")) {
            return rtrim($info->getRealPath(), "/\\ ");
        }

        return trim(rtrim($info->getRealPath(), "/"), "\\ ");
    }
    
    public static function combine(string ...$args): string
    {
        $paths = [];

        foreach ($args as $arg) {
            if ($arg !== '') {
                $paths[] = $arg; 
            }
        }

        $dirsep = DIRECTORY_SEPARATOR;
        $pattern = "#$dirsep+#";
        return preg_replace($pattern,$dirsep,join($dirsep, $paths));
    }

    public static function pathNotEquals(string $first, string $second): bool
    {
        return !self::pathEquals($first, $second);
    }

    public static function pathEquals(string $first, string $second): bool
    {
        $func = "strcmp";
        if (PHP_OS_FAMILY == "Windows") {
            $func = "strcasecmp";
        }

        if ($func($first, $second) === 0) {
            return true;
        }

        return $func(self::cleanFilePath($first), self::cleanFilePath($second)) == 0;
    }

    public static function getRelativePath(string $parentPath, string $childPath): string
    {
        if (!self::isParentPath($parentPath, $childPath)) {
            throw new Exception(sprintf("%s is not a child of %s", $childPath, $parentPath));
        }

        return trim(substr($childPath, strlen($parentPath)), DIRECTORY_SEPARATOR);
    }

    public static function isParentPath(string $parentPath, string $childPath): bool
    {
        if ($parentPath != '/' && !str_ends_with($parentPath, ":\\")) {
            $parentPath = rtrim($parentPath, DIRECTORY_SEPARATOR);
        }
        
        if ($childPath != '/' && !str_ends_with($childPath, ":\\")) {
            $childPath = rtrim($childPath, DIRECTORY_SEPARATOR);
        }

        $i = 0;

        //TODO: Implement for windows
        while (dirname($childPath) != "/" && dirname($childPath) != "." && $i < 100) {
            if (dirname($childPath) == $parentPath) {
                return true;
            }

            $childPath = dirname($childPath);
            $i++; //Safety check to prevent infinite loop
        }

        return false;
    }

    public static function getCleanPath(string $path): string
    {
        if (PHP_OS_FAMILY == "Windows") {
            return preg_replace("/(?<!:)\\$/", "", $path);
        }

        return rtrim($path, DIRECTORY_SEPARATOR);
    }

    public static function isPathValid(string $path): bool
    {
        if (empty($path)) {
            return false;
        }

        if (PHP_OS_FAMILY != "Windows") {
            return str_starts_with($path, DIRECTORY_SEPARATOR);
        }

        if (str_starts_with($path, "\\") || preg_match('/^[a-zA-Z]:\\\\/', $path)) {
            return true;
        }

        return false;
    }
}