<?php

namespace App\Imports;

use App\Models\SSH;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;

class SshImport implements ToModel, WithHeadingRow, WithMultipleSheets, WithCalculatedFormulas
{
    private $successCount = 0;
    private $requiredColumns = [
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

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */

    public function sheets(): array
    {
        return [
            0 => $this, // Index 0 adalah sheet pertama
        ];
    }
    public function model(array $row)
    {
        foreach ($this->requiredColumns as $column) {
            if (!array_key_exists($column, $row)) {
                throw new \Exception("Kolom $column tidak ditemukan di file Excel");
            }
        }

        // Periksa apakah baris kosong
        if (empty($row['kode'])) {
            return null; // Lewati baris kosong
        }

        $this->successCount++;
        return new SSH([
            'kode' => $row['kode'],
            'kelompok' => $row['kelompok'],
            'objek' => $row['objek'],
            'rincian_objek' => $row['rincian_objek'],
            'sub_rincian_objek' => $row['sub_rincian_objek'],
            'uraian_barang' => $row['uraian_barang'],
            'spesifikasi' => $row['spesifikasi'],
            'satuan' => $row['satuan'],
            'harga' => $row['harga'],
            'tkpdn' => $row['tkpdn'],
            'tahun' => $row['tahun'],
        ]);
    }

    public function getResult()
    {
        return [
            'success' => $this->successCount,
        ];
    }
}

//     public function model(array $row)
//     {
//         // Abaikan baris pertama
//         if (!$this->headerSkipped) {
//             $this->headerSkipped = true;
//             return null;
//         }

//         return new Input([
//             'nama'       => $row[0],  // Kolom A di Excel
//             'nip'        => $row[1],  // Kolom B di Excel
//             'jabatan'    => $row[4],  // Kolom E di Excel
//         ]);
//     }
// }