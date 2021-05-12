<?php

namespace App\Dto;

use App\Casts\HistoryDataCast;
use Spatie\DataTransferObject\DataTransferObject;
use Illuminate\Contracts\Database\Eloquent\Castable;

final class HistoryData extends DataTransferObject implements Castable
{
    public $download_client_id;
    public $indexer;
    public $indexer_id;
    public $publish_date;
    public $source;
    public $download_url;
    public $size;
    public $guid;

    public static function castUsing(array $arguments)
    {
        return HistoryDataCast::class;
    }
}
