<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SSH extends Model
{
    use HasFactory;

    protected $table = 'ssh';

    protected $fillable = [
        'kode',
        'kelompok',
        'objek',
        'rincian_objek',
        'sub_rincian_objek',
        'uraian_barang',
        'spesifikasi',
        'satuan',
        'harga',
        'tkpdn',
        'tahun'
    ];
}
