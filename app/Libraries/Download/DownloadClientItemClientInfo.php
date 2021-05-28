<?php

namespace App\Libraries\Download;

class DownloadClientItemClientInfo
{
    public string $protocol;
    public string $type;
    public int $id;
    public string $name;

    public static function FromDownloadClient(DownloadClientModelBase $downloadClient): DownloadClientItemClientInfo
    {
        $info = new DownloadClientItemClientInfo();
        $info->protocol = $downloadClient->getProtocol();
        $info->type = $downloadClient->implementation;
        $info->id = $downloadClient->id;
        $info->name = $downloadClient->name;

        return $info;
    }
}