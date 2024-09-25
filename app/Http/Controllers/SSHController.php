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
        $page = $request->get('page', 1); // Ambil nilai page dari request
        $ssh = new SSHCollection(SSH::paginate($perPage, ['*'], 'page', $page)); // Kirim ke paginate
        return Inertia::render('SSH', [
            'title' => 'SSH',
            'ssh' => $ssh,
            'perPage' => $perPage,
            'currentPage' => $page, // Kembalikan ke view
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
