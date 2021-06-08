<?php

namespace App\Models;

use DateInterval;
use DateTime;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $message
 * @property DateTime $time
 * @property string $logger
 * @property string $exception
 * @property string $exception_type
 * @property string $level
 * 
 * @method static \Illuminate\Database\Eloquent\Builder where($column, $comparison, $value = null)
 * 
 * 
 * @mixin \Eloquent
 */
class Log extends Model
{
    const CREATED_AT = "time";
    const UPDATED_AT = null;

    protected $connection = "logs";

    protected $casts = [
        'time' => 'datetime',
    ];

    protected $guarded = [
        'id',
        'time',
    ];

    public static function trim(): void
    {
        $trimDate = (new DateTime())->sub(new DateInterval("P7D"))->format(DATE_ATOM);

        Log::where("time", "<=", $trimDate)->delete();
    }
}