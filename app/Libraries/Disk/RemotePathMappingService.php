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

        /** @var RemotePathMapping $mapping */
        foreach (RemotePathMapping::all() as $mapping) {
            $remotePath = new OsPath($mapping->remote_path);
            if (strcasecmp($mapping->host, $host) == 0 && $remotePath->contains($remotePath)) {
                $localPath = new OsPath($mapping->local_path);
                $localPath->add($remotePath->sub(new OsPath($mapping->remote_path)));

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

        /** @var RemotePathMapping $mapping */
        foreach (RemotePathMapping::all() as $mapping) {
            $remotePath = new OsPath($mapping->remote_path);
            if (strcasecmp($mapping->host, $host) == 0 && $remotePath->contains($remotePath)) {
                $remotePath->add($localPath->sub(new OsPath($mapping->local_path)));

                return $remotePath;
            }
        }

        return $localPath;
    }
}
