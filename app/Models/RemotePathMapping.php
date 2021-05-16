<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\RemotePathMapping
 *
 * @property int $id
 * @property string $host
 * @property string $remote_path
 * @property string $local_path
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping query()
 * @method static \Illuminate\Database\Eloquent\Builder where($column, $op, $value = null)
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping whereHost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping whereLocalPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RemotePathMapping whereRemotePath($value)
 * @mixin \Eloquent
 */
class RemotePathMapping extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $fillable = [
        'host',
        'local_path',
        'remote_path',
    ];
}
