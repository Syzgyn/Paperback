<?php

namespace App\Libraries\Download;

use App\Libraries\Parser\RemoteIssue;
use App\Libraries\Http\HttpRequest;
use GuzzleHttp\Exception\TransferException;

abstract class UsenetClientModelBase extends DownloadClientModelBase
{
    const PROTOCOL = "usenet";

    protected abstract function addFromNzbFile(RemoteIssue $remoteIssue, string $filename, string $fileContent): string;

    public function download(RemoteIssue $remoteIssue): string
    {
        $url = $remoteIssue->release->downloadUrl;
        $filename = $remoteIssue->release->title . ".nzb"; //TODO: Implement fileNameBuilder

        $fileContent = null;

        try {
            $request = new HttpRequest($url);
            $request->rateLimitKey = $remoteIssue->release?->indexerId;
            $fileContent = resolve('HttpClient')->get($request)->content;

            //TODO: log
        } catch (TransferException $e) {
            //TODO: log and expand error catching
            throw $e;
        }

        resolve('NzbValidationService')->validate($filename, $fileContent);
        //TODO: log
        return $this->addFromNzbFile($remoteIssue, $filename, $fileContent);
    }
}
