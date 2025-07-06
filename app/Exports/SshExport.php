<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class SshExport implements FromArray, WithStyles, WithColumnWidths
{
    protected $all;
    protected $columnsall;

    public function __construct($all, array $columnsall)
    {
        $this->all = $all;
        $this->columnsall = $columnsall;
    }

    public function array(): array
    {
        return $this->mapCollection($this->all);
    }

    protected function mapCollection($collection): array
    {
        return $collection->map(function ($row, $index) {
            return array_merge([$index + 1], [
                $row->kode,
                $row->kelompok,
                $row->objek,
                $row->rincian_objek,
                $row->sub_rincian_objek,
                $row->uraian_barang,
                $row->spesifikasi,
                $row->satuan,
                $row->harga,
                $row->tkpdn,
                $row->tahun
            ]);
        })->toArray();
    }

    public function styles(Worksheet $sheet)
    {

        $sheet->mergeCells('A1:L1');

        // Set styles for merged cells
        $sheet->getStyle('A1:L1')->applyFromArray([
            'font' => [
                'bold' => true,
                'size' => 14,
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
        ]);
        // Set style for the header row at row 4
        $sheet->getStyle('A2:L2')->applyFromArray([
            'font' => [
                'bold' => true,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => [
                    'argb' => 'FFFF00',
                ],
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => '000000'],
                ],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
        ]);

        $highestRow = $sheet->getHighestRow();
        $sheet->getStyle('A2:L' . $highestRow)->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['argb' => '000000'],
                ],
            ],
        ]);

        // Set row height for header row
        $sheet->getRowDimension('2')->setRowHeight(40);

        return [
            // Gaya untuk baris header 
            2 => ['font' => ['bold' => true]],
        ];
    }

    public function columnWidths(): array
    {
        return [
            'A' => 3.8,
            'B' => 27.95,
            'C' => 19.25,
            'D' => 27.5,
            'E' => 10,
            'F' => 10,
            'G' => 10,
            'H' => 10,
            'I' => 10,
            'J' => 10,
            'K' => 10,
            'L' => 10,
        ];
    }
}
