<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ssh', function (Blueprint $table) {
            $table->id();
            $table->string('kode');
            $table->string('kelompok')->nullable();
            $table->string('objek')->nullable();
            $table->string('rincian_objek')->nullable();
            $table->string('sub_rincian_objek')->nullable();
            $table->string('uraian_barang')->nullable();
            $table->string('spesifikasi')->nullable();
            $table->string('satuan')->nullable();
            $table->bigInteger('harga')->nullable();
            $table->year('tahun')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ssh');
    }
};
