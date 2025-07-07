<?php

namespace App\Http\Controllers;

use App\Exports\SshExport;
use App\Http\Resources\SSHCollection;
use App\Imports\SshImport;
use App\Models\SSH;
use Inertia\Inertia;
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Maatwebsite\Excel\Facades\Excel;

class SSHController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'title' => 'Home',
        ]);
    }

    public function ssh(Request $request)
    {
        $perPage = $request->get('perPage', 25);
        $page = $request->get('page', 1);
        $search = $request->get('search');
        $tahun = $request->get('tahun');

        $availableYears = SSH::select('tahun')->distinct()->orderBy('tahun', 'desc')->pluck('tahun');

        $sshQuery = SSH::query();

        if ($tahun) {
            $sshQuery->where('tahun', $tahun);
        }

        if ($search) {
            $sshQuery->where(function ($query) use ($search) {
                $query->where('kode', 'like', '%' . $search . '%')
                    ->orWhere('kelompok', 'like', '%' . $search . '%')
                    ->orWhere('objek', 'like', '%' . $search . '%')
                    ->orWhere('uraian_barang', 'like', '%' . $search . '%');
            });
        }

        $ssh = new SSHCollection($sshQuery->paginate($perPage));

        return Inertia::render('SSH', [
            'title' => 'SSH',
            'ssh' => $ssh,
            'perPage' => $perPage,
            'currentPage' => $page,
            'search' => $search,
            'tahun' => $tahun,
            'availableYears' => $availableYears,
        ]);
    }

    public function create()
    {
        return Inertia::render('Tambah', [
            'title' => 'Tambah',
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'kode' => 'string',
            'kelompok' => 'string',
            'objek' => 'string',
            'rincian_objek' => 'string',
            'sub_rincian_objek' => 'string',
            'uraian_barang' => 'string',
            'spesifikasi' => 'string',
            'satuan' => 'string',
            'spesifikasi' => 'string',
            'harga' => 'string',
            'tahun' => 'nullable|string'
        ]);

        try {
            $data['tahun'] = '2024';
            SSH::create($data);
            return redirect()->back()->with('message', 'data berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('gagal', 'gagal menambahkan data' .  $e->getMessage());
        }
    }

    public function export(Request $request)
    {
        $tahun = $request->get('tahun');

        $query = SSH::orderBy('id', 'asc');

        if ($tahun) {
            $query->where('tahun', $tahun);
            $namaFile = 'SSH Kota Palembang' .  ' ' . $tahun . '.xlsx';
        } else {
            $namaFile = 'SSH Kota Palembang.xlsx';
        }

        $all = $query->get();

        $columnsall = [
            'NO.',
            'Kode',
            'Kelompok',
            'Objek',
            'Rincian Objek',
            'Sub Rincian Objek',
            'Uraian Barang',
            'Spesifikasi',
            'Satuan',
            'Harga',
            'TKPDN',
            'Tahun'
        ];

        // Create a new Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->mergeCells('A1:L1');

        // Set title or description for merged cells
        $sheet->setCellValue('A1', 'DATA SSH KOTA PALEMBANG ' . $tahun);

        // Set header at row 4
        $sheet->fromArray($columnsall, NULL, 'A2');

        // Write data starting from row 5
        $dataExport = new SshExport($all, $columnsall);
        $dataArray = $dataExport->array();
        $sheet->fromArray($dataArray, NULL, 'A3');

        // Apply styles
        $dataExport->styles($sheet);

        // Set column widths
        foreach ($dataExport->columnWidths() as $column => $width) {
            $sheet->getColumnDimension($column)->setWidth($width);
        }

        // Write file to output
        $writer = new Xlsx($spreadsheet);
        $writer->save($namaFile);

        // Download the file
        return response()->download($namaFile)->deleteFileAfterSend(true);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        try {
            $import = new SshImport();
            Excel::import($import, $request->file('file'));
            $result = $import->getResult();

            return response()->json([
                'message' => 'Proses Import Data Berhasil!',
                'details' => [
                    'sukses' => $result['success'],
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Proses Import Data Gagal!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
