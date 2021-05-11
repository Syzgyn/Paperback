<?php

namespace App\Libraries\Disk;

use App\Models\RemotePathMapping;

class RemotePathMappingService
{
    public function remapRemoteToLocal(string $host, OsPath $remotePath): OsPath
    {
        if ($remotePath->isEmpty()) {
            return $remotePath;
        }

        foreach (RemotePathMapping::all() as $mapping) {
            if (strcasecmp($mapping->host, $host) == 0 && new OsPath($mapping->remote_path)->contains($remotePath)) {
                $localPath = new OsPath($mapping->local_path)->add($remotePath->sub(new OsPath($mapping->remote_path)));

                return $localPath;
            }
        }

        return $remotePath;
    }

    public function remapLocalToRemote(string $host, OsPath $localPath): OsPath
    {
        if ($localPath->isEmpty()) {
            return $localPath;
        }

        foreach (RemotePathMapping::all() as $mapping) {
            if (strcasecmp($mapping->host, $host) == 0 && new OsPath($mapping->remote_path)->contains($remotePath)) {
                $remotePath = new OsPath($mapping->remote_path)->add($localPath->sub(new OsPath($mapping->local_path)));

                return $remotePath;
            }
        }

        return $localPath;
    }
}
