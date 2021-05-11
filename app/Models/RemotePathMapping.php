<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
