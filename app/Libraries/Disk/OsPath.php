<?php

namespace App\Libraries\Disk;

class OsPath
{
    protected string $path;
    protected string $osType;

    public function __construct(?string $path = null, ?string $osType = null)
    {
        if (empty($path)) {
            if (empty($osType)) {
                $this->osType = "Unknown";
            } else {
                $this->osType = $osType;
            }
            $this->path = "";
        } else {
            if (empty($osType)) { 
                $this->osType = $this->detectOsType($path);
            } else {
                $this->osType = $osType;
            }
            $this->path = $this->fixSlashes($path, $this->osType);
        }
    }

    protected function detectOsType(string $path): string
    {
        if (str_starts_with($path, '/')) {
            return "Unix";
        }

        if ($this->hasWindowsDriveLetter($path) || str_contains($path, '\\')) {
            return "Windows";
        }

        if (str_contains($path, '/')) {
            return "Unix";
        }

        return "Unknown";
    }

    protected function hasWindowsDriveLetter(string $path): bool
    {
        if (strlen($path) < 2) {
            return false;
        }

        if (!ctype_alpha(substr($path, 0, 1)) || substr($path, 1, 1) != ":") {
            return false;
        }
        
        if (strlen($path) > 2 && substr($path, 2, 1) != '\\' && substr($path, 2, 1) != '/') {
            return false;
        }

        return true;
    }

    protected function fixSlashes(string $path, string $osType): string
    {
        switch ($osType) {
            case "Windows":
                return str_replace('/', '\\', $path);
            case "Unix":
                $path = str_replace('\\', '/', $path);
                while(str_contains($path, '//')) {
                    $path = str_replace('//', '/', $path);
                }
                return $path;
        }

        return $path;
    }

    public function getOsType(): string
    {
        return $this->osType;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function isWindowsPath(): bool
    {
        return $this->osType == "Windows";
    }

    public function isUnixPath(): bool
    {
        return $this->osType == "Unix";
    }

    public function isEmpty(): bool
    {
        return empty($this->path);
    }

    public function isRooted(): bool
    {
        if ($this->isWindowsPath()) {
            return str_starts_with($this->path, '\\\\') || $this->hasWindowsDriveLetter($this->path);
        }
        
        if ($this->isUnixPath()) {
            return str_starts_with($this->path, '/');
        }

        return false;
    }

    public function getDirectory(): OsPath
    {
        $index = $this->getFilenameIndex();

        if ($index == -1) {
            return new OsPath(null);
        }

        $path = new OsPath(substr($this->path, 0, $index), $this->osType);
        return $path->asDirectory();
    }

    public function getFilename(): ?string
    {
        $index = $this->getFilenameIndex();

        if ($index == -1) {
            $path = trim($this->path, '/\\');

            if (strlen($path) == 0) {
                return null;
            }

            return $path;
        }

        return trim(substr($this->path, $index), '/\\');
    }

    protected function getFilenameIndex(): int
    {
        if (strlen($this->path) < 2) {
            return -1;
        }

        $index = -1;
        foreach(['/', '\\'] as $char) {
            $index = max($index, strrpos($this->path, $char, -2));
        }

        if ($index == -1) {
            return -1;
        }

        if (str_starts_with($this->path, "\\\\") && $index < 2) {
            return -1;
        }

        if (str_starts_with($this->path, '/') && $index == 0) {
            $index++;
        }

        return $index;
    }

    protected function getFragments(): array
    {
        return array_filter(preg_split('+/|\\+', $this->path));
    }

    public function __tostring()
    {
        return $this->path;
    }

    public function asDirectory(): OsPath
    {
        if ($this->isEmpty()) {
            return $this;
        }

        switch($this->osType) {
            case "Windows":
                return new OsPath(rtrim($this->path, '\\') . '\\', $this->osType);
            case "Unix":
                return new OsPath(rtrim($this->path, '/') . '/', $this->osType);
        }

        return $this;
    }

    public function contains(OsPath $other): bool
    {
        if (!$this->isRooted() || !$other->isRooted()) {
            return false;
        }

        $leftFragments = $this->getFragments();
        $rightFragments = $other->getFragments();

        if (count($rightFragments) < count($leftFragments)) {
            return false;
        }

        $comparisonFunc = ($this->osType == "Windows" || $other->getOsType() == "Windows") ? "strcasecmp" : "strcmp";

        for ($i = 0; $i < count($leftFragments); $i++) {
            if ($comparisonFunc($leftFragments[$i], $rightFragments[$i]) != 0) {
                return false;
            }
        }

        return true;
    }

    public function add(string|OsPath $right): OsPath
    {
        if (gettype($right) == "string") {
            $right = new OsPath($right);
        }

        if ($this->osType != $right->getOsType() && $right->getOsType != "Unknown") {
            throw new \Exception(sprintf("Cannot combine OsPaths of different platforms(%s + %s)", $this, $right));
        }

        if ($right->isEmpty()) {
            return $this;
        }

        if ($right->isRooted()) {
            return $right;
        }

        if ($this->osType == "Windows" || $right->getOsType() == "Windows") {
            return new OsPath(rtrim($this->path, '\\') . '\\' . ltrim($right->getPath(), '\\'), "Windows");
        }

        if ($this->osType == "Unix" || $right->getOsType() == "Unix") {
            return new OsPath(rtrim($this->path, '/') . '/' . ltrim($right->getPath(), '/'), "Unix");
        }

        return new OsPath($this->path . '/' . $right->getPath(), "Unknown");
    }

    public function sub(string|OsPath $right): OsPath
    {
        if (gettype($right) == "string") {
            $right = new OsPath($right);
        }

        if (!$this->isRooted() || !$right->isRooted()) {
            throw new \Exception("Cannot determine relative path for unrooted paths");
        }

        $leftFragments = $this->getFragments();
        $rightFragments = $right->getFragments();

        $comparisonFunc = ($this->osType == "Windows" || $right->getOsType() == "Windows") ? "strcasecmp" : "strcmp";

        $i = 0;
        for ($i; $i < count($leftFragments) && $i < count($rightFragments); $i++) {
            if ($comparisonFunc($leftFragments[$i], $rightFragments[$i]) != 0) {
                break;
            }
        }

        if ($i == 0) {
            return $right;
        }
        
        $newFragments = [];
        for($j = $i; $j < count($rightFragments); $j++) {
            $newFragments[] = "..";
        }

        for($j = $i; $j < count($leftFragments); $j++) {
            $newFragments[] = $leftFragments[$j];
        }

        if (str_ends_with($this->path, '\\') || str_ends_with($this->path, '/')) {
            $newFragments[] = "";
        }

        if ($this->osType == "Windows" || $right->getOsType() == "Windows") {
            return new OsPath(implode('\\', $newFragments), "Unknown");
        }

        return new OsPath(implode('/', $newFragments), "Unknown");
    }
}
