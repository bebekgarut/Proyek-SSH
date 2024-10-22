<?php

namespace App\Http\Controllers;

use App\Http\Resources\SSHCollection;
use App\Models\SSH;
use Inertia\Inertia;
use Illuminate\Http\Request;

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

        // Filter berdasarkan pencarian (jika ada search term)
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
}
