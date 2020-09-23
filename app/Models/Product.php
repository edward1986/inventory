<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $fillable = ['quantity','name'];
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

}
