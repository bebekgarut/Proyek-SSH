<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class sshSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 50; $i++) {
            DB::table('ssh')->insert([
                'kode' => $faker->randomNumber(5, true),
                'kelompok' => $faker->word,
                'objek' => $faker->word,
                'rincian_objek' => $faker->word,
                'sub_rincian_objek' => $faker->word,
                'uraian_barang' => $faker->sentence,
                'spesifikasi' => $faker->sentence,
                'satuan' => $faker->word,
                'harga' => $faker->numberBetween(1000, 1000000),
                'tahun' => $faker->year,
            ]);
        }
    }
}
