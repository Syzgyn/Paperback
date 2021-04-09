<?php

namespace App\Repositories;

class AppSettingsRepository
{
    const FILE_PATH = '/storage/app/paperback.ini';
    const DEFAULT_PATH = '/storage/app/paperback.default.ini';

    protected $config;
    protected $inTransaction = false;

    public function __construct()
    {
        $this->loadConfig(true);
    }

    public function startTransaction()
    {
        $this->inTransaction = true;

        return $this;
    }

    public function commitTransaction()
    {
        $this->inTransaction = false;

        return $this->writeConfig();
    }

    public function get(string $section = '', string $property = '')
    {
        if (! $section) {
            return $this->config;
        }

        if (! isset($this->config[$section])) {
            throw new \Exception("Invalid config section: $section");
        }

        if (! $property) {
            return $this->config[$section];
        }

        if (! isset($this->config[$section][$property])) {
            throw new \Exception("Invalid config property: [$section] $property");
        }

        return $this->config[$section][$property];
    }

    public function set(string $section, string $property, $value)
    {
        if (! isset($this->config[$section]) || ! isset($this->config[$section][$property])) {
            throw new \Exception('Trying to update a nonexistent property or section');
        }

        $this->config[$section][$property] = $value;

        if (! $this->inTransaction) {
            $this->writeConfig();
        }

        return $this;
    }

    public function bulkSet(array $data)
    {
        $this->startTransaction();

        foreach ($data as $category => $properties) {
            //To ensure it exists;
            $this->get($category);

            foreach ($properties as $key => $value) {
                $this->set($category, $key, $value);
            }
        }

        return $this->commitTransaction();
    }

    protected function filePath()
    {
        return base_path() . self::FILE_PATH;
    }

    protected function defaultPath()
    {
        return base_path() . self::DEFAULT_PATH;
    }

    protected function loadConfig($force = false)
    {
        if ($force || ! $this->config) {
            if (! file_exists($this->filePath())) {
                if (! file_exists($this->defaultPath())) {
                    throw new \Exception('Missing default config file');
                }

                $this->config = parse_ini_file($this->defaultPath(), true, INI_SCANNER_TYPED);

                return $this;
            }
            $this->config = parse_ini_file($this->filePath(), true, INI_SCANNER_TYPED);
        }

        return $this;
    }

    //Sourced from https://stackoverflow.com/a/36997282
    protected function writeConfig()
    {
        $content = '';
        foreach ($this->config as $section => $properties) {
            $sectionArray = array_map(
                function ($value, $key) {
                    if (is_bool($value)) {
                        $value = $value ? 'true' : 'false';

                        return "$key = $value";
                    }

                    if (is_numeric($value)) {
                        return "$key = $value";
                    }

                    return "$key = '$value'";
                },
                array_values($properties),
                array_keys($properties)
            );

            $sectionContent = implode("\n", $sectionArray);
            $content .= "[$section]\n$sectionContent\n";
        }

        $result = file_put_contents($this->filePath(), $content);

        return $result !== false;
    }
}
