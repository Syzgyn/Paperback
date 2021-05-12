<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Http\HttpRequestBuilder;
use App\Libraries\Http\HttpUri;
use App\Libraries\Http\HttpResponse;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdVersionResponse;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdConfigResponse;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdAddResponse;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdFullStatusResponse;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdRetryResponse;
use Exception;

class SabnzbdProxy
{
    public function getBaseUrl(SabnzbdSettings $settings, string $relativePath = null)
    {
        $baseUrl = HttpRequestBuilder::buildBaseUrl($settings->useSsl, $settings->host, $settings->port, $settings->urlBase);
        $baseUrl = HttpUri::combinePath($baseUrl, $relativePath);

        return $baseUrl;
    }

    public function downloadNzb(string $nzbData, string $filename, string $category, int $priority, SabnzbdSettings $settings): SabnzbdAddResponse
    {
        $request = $this->buildRequest("addfile", $settings)->post();

        $request->addQueryParam("cat", $category);
        $request->addQueryParam("priority", $priority);
        $request->addFormUpload("name", $filename, $nzbData, "application/x-nzb");

        $response = $this->processRequest($request, $settings, SabnzbdAddResponse::class);
        if (!$response) {
            $response = new SabnzbdAddResponse();
            $response->status = true;
        }

        return $response;
    }

    public function removeFrom(string $source, string $id, bool $deleteData, SabnzbdSettings $settings): void
    {
        $request = $this->buildRequest($source, $settings);
        $request->addQueryParam("name", "delete");
        $request->addQueryParam("del_files", $deleteData ? 1 : 0);
        $request->addQueryParam("value", $id);

        $this->processRequest($request, $settings);
    }

    public function getVersion(SabnzbdSettings $settings): ?string
    {
        $request = $this->buildRequest("version", $settings);
        
        $response = $this->processRequest($request, $settings, SabnzbdVersionResponse::class);

        if (!$response) {
            $response = new SabnzbdVersionResponse();
        }

        return $response->version;
    }

    public function getConfig(SabnzbdSettings $settings): SabnzbdRemoteConfig
    {
        $request = $this->buildRequest("get_config", $settings);

        $response = $this->processRequest($request, $settings, SabnzbdConfigResponse::class);

        return $response->config;
    }

    public function getFullStatus(SabnzbdSettings $settings): SabnzbdFullStatus
    {
        $request = $this->buildRequest("fullstatus", $settings);
        $request->addQueryParam("skip_dashboard", "1");

        $response = $this->processRequest($request, $settings, SabnzbdFullStatusResponse::class);

        return $response->status;
    }

    public function getQueue(int $start, int $limit, SabnzbdSettings $settings): SabnzbdQueue
    {
        $request = $this->buildRequest("queue", $settings);
        $request->addQueryParam("start", $start);
        $request->addQueryParam("limit", $limit);

        $response = $this->processRequest($request, $settings, SabnzbdQueue::class); 

        return $response;
    }

    public function getHistory(int $start, int $limit, ?string $category, SabnzbdSettings $settings): SabnzbdHistory
    {
        $request = $this->buildRequest("history", $settings);
        $request->addQueryParam("start", $start);
        $request->addQueryParam("limit", $limit);

        if (!empty($category)) {
            $request->addQueryParam("category", $category);
        }

        $response = $this->processRequest($request, $settings, SabnzbdHistory::class); 

        return $response;
    }

    public function retryDownload(string $id, SabnzbdSettings $settings): ?string
    {
        $request = $this->buildRequest("retry", $settings);
        $request->addQueryParam("value", $id);

        $response = $this->processRequest($request, $settings, SabnzbdRetryResponse::class);

        if (!$response) {
            $response = new SabnzbdRetryResponse();
            $response->status = true;
        }

        return $response->id;
    }

    protected function buildRequest(string $mode, SabnzbdSettings $settings): HttpRequestBuilder
    {
        $baseUrl = $this->getBaseUrl($settings, "api");

        $requestBuilder = new HttpRequestBuilder($baseUrl);
        $requestBuilder->accept("application/json")->addQueryParam("mode", $mode);
        $requestBuilder->logResponseContent = true;

        if (!empty($settings->apiKey)) {
            $requestBuilder->addSuffixQueryParam("apikey", $settings->apiKey);
        } else {
            $requestBuilder->addSuffixQueryParam("ma_username", $settings->username);
            $requestBuilder->addSuffixQueryParam("ma_password", $settings->password);
        }

        $requestBuilder->addSuffixQueryParam("output", "json");

        return $requestBuilder;
    }

    protected function processRequest(HttpRequestBuilder $requestBuilder, SabnzbdSettings $settings, ?string $outputClass = null)
    {
        $httpRequest = $requestBuilder->build();

        //TODO: log

        $response = null;

        try {
            $response = resolve("HttpClient")->execute($httpRequest);
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            throw new \Exception("Unable to connect to SABnzbd, " . $e->getMessage());
        }

        $this->checkForError($response);

        return $this->castJsonToClass($response->content, $outputClass);
    }

    protected function checkForError(?HttpResponse $response): void
    {
        $result = $this->castJsonToClass($response->content, SabnzbdJsonError::class);

        if (!$result) {
            $result = new SabnzbdJsonError();

            if (str_starts_with(strtolower($response->content), "error")) {
                $result->status = false; 
                $result->error = str_replace("error: ", "", $response->content);
            } else {
                $result->status = true;
            }
        }

        if ($result->failed()) {
            throw new Exception("Error response received from SABnzbd: " . $result->error);
        }
    }

    protected function castJsonToClass(string $json, ?string $class = null)
    {
        try {
            $data = json_decode($json, true);

            if ($data === false || $data === null) {
                return null;
            }

            if ($class == null) {
                return $data;
            }

            $obj = new $class(...$data);
        } catch (\Throwable $e) {
            return null;
        }

        return $obj;
    }
}
