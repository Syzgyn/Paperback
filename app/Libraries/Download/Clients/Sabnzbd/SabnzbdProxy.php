<?php

namespace App\Libraries\Download\Clients\Sabnzbd;

use App\Libraries\Http\HttpRequestBuilder;
use App\Libraries\Http\HttpUri;
use App\Libraries\Http\HttpResponse;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdAddResponse;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdResponseInterface;
use App\Libraries\Download\Clients\Sabnzbd\Responses\SabnzbdRetryResponse;
use Exception;
use Karriere\JsonDecoder\JsonDecoder;
use Karriere\JsonDecoder\Transformer;

class SabnzbdProxy
{
    public function getBaseUrl(SabnzbdSettings $settings, string $relativePath = null): string
    {
        /** @var string */
        $baseUrl = HttpRequestBuilder::buildBaseUrl($settings->useSsl, $settings->host, $settings->port, $settings->urlBase);
        $baseUrl = HttpUri::combinePath($baseUrl, $relativePath);

        return $baseUrl;
    }

    public function downloadNzb(string $nzbData, string $filename, string $category, int $priority, SabnzbdSettings $settings): SabnzbdAddResponse
    {
        $request = $this->buildRequest("addfile", $settings)->post();

        $request->addQueryParam("cat", $category);
        $request->addQueryParam("priority", (string) $priority);
        $request->addFormUpload("name", $filename, $nzbData, "application/x-nzb");

        /** @var SabnzbdAddResponse|null */
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
        $request->addQueryParam("del_files", $deleteData ? "1" : "0");
        $request->addQueryParam("value", $id);

        $this->processRequest($request, $settings);
    }

    public function getVersion(SabnzbdSettings $settings): ?string
    {
        $request = $this->buildRequest("version", $settings);
        
        /** @var ?array */
        $response = $this->processRequest($request, $settings);

        if ($response == null)
        {
            throw new Exception("Error getting Sabnzbd version");
            
        }

        /** @var string */
        return $response['version'];
    }

    public function getConfig(SabnzbdSettings $settings): SabnzbdRemoteConfig
    {
        $request = $this->buildRequest("get_config", $settings);

        /** @var SabnzbdRemoteConfig */
        $config = $this->processRequest($request, $settings, SabnzbdRemoteConfig::class);

        return $config;
    }

    public function getFullStatus(SabnzbdSettings $settings): SabnzbdFullStatus
    {
        $request = $this->buildRequest("fullstatus", $settings);
        $request->addQueryParam("skip_dashboard", "1");

        /** @var SabnzbdFullStatus */
        $status = $this->processRequest($request, $settings, SabnzbdFullStatus::class);

        return $status;
    }

    public function getQueue(int $start, int $limit, SabnzbdSettings $settings): SabnzbdQueue
    {
        $request = $this->buildRequest("queue", $settings);
        $request->addQueryParam("start", (string) $start);
        $request->addQueryParam("limit", (string) $limit);

        /** @var SabnzbdQueue */
        $response = $this->processRequest($request, $settings, SabnzbdQueue::class); 

        return $response;
    }

    public function getHistory(int $start, int $limit, ?string $category, SabnzbdSettings $settings): SabnzbdHistory
    {
        $request = $this->buildRequest("history", $settings);
        $request->addQueryParam("start", (string) $start);
        $request->addQueryParam("limit", (string) $limit);

        if (!empty($category)) {
            $request->addQueryParam("category", $category);
        }

        /** @var SabnzbdHistory */
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

        /** @var SabnzbdRetryResponse $response */
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

    /** @param class-string<SabnzbdResponseInterface> $outputClass */
    protected function processRequest(HttpRequestBuilder $requestBuilder, SabnzbdSettings $settings, ?string $outputClass = null): string|array|object|null
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

        if ($outputClass == null) {
            /** @var false|array */
            $data = json_decode($response->content, true);

            if ($data === false) {
                return $response->content;
            }

            return $data;
        }

        return $this->castJsonToClass($response->content, $outputClass);
    }

    protected function checkForError(HttpResponse $response): void
    {
        /** @var array|bool $data */
        $data = json_decode($response->content, true);

        if ($data === false) {
            $result = new SabnzbdJsonError(false, "");

            if (str_starts_with(strtolower($response->content), "error")) {
                $result->status = false; 
                $result->error = str_replace("error: ", "", $response->content);
            } else {
                $result->status = true;
            }
        } elseif (isset($data['status']) && isset($data['error'])) {
            /** @var array{status: bool, error: string} $data */
            $result = new SabnzbdJsonError(...$data);
        } else {
            return;
        }

        if ($result->failed()) {
            throw new Exception("Error response received from SABnzbd: " . $result->error);
        }
    }

    /** 
     * @param class-string<SabnzbdResponseInterface> $classString
     * @return SabnzbdResponseInterface */
    protected function castJsonToClass(string $json, string $classString): object
    {
        $jsonDecoder = new JsonDecoder(true);
        $transformers = $classString::getTransforms();

        /** @var class-string<Transformer> $transformer */
        foreach($transformers as $transformer) {
            $jsonDecoder->register(new $transformer());
        }

        $root = !empty($classString::getRoot()) ? $classString::getRoot() : null;

        /** @var SabnzbdResponseInterface */
        return $jsonDecoder->decode($json, $classString, $root);
    }
}
