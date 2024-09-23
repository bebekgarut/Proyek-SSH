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
        $ssh = new SSHCollection(SSH::paginate(25));
        return Inertia::render('Home', [
            'title' => 'proyekSSH',
            'ssh' => $ssh
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
