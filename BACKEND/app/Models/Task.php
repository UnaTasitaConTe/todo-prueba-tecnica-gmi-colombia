<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = "task";
    protected $fillable = [
        "title",
        "image",
        "descripcion",
        "userId",
        "tags",
        "date_expired"
    ];
}
