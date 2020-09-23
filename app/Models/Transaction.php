<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    public $fillable = [
        'purchase_order',
        'quantity',
        'display_quantity',
        'type',
        'expiry_date',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
