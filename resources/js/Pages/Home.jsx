import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { data } from 'autoprefixer';

export default function Home(props){
    console.log(props)
    return(
        <div className='flex justify-center items-center min-h-screen p-5 bg-gray-100'>
            <Head title={props.title} /> 
            <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="m-3 w-full text-left bg-white border border-gray-300">
            <thead className="bg-gray-800 text-cyan-200">
                <tr>
                <th className="px-4 py-2 border border-gray-400">Kode</th>
                <th className="px-4 py-2 border border-gray-400">Kelompok</th>
                <th className="px-4 py-2 border border-gray-400">Objek</th>
                <th className="px-4 py-2 border border-gray-400">Rincian Objek</th>
            <th className="px-4 py-2 border border-gray-400">Sub Rincian Objek</th>
            <th className="px-4 py-2 border border-gray-400">Uraian Barang</th>
            <th className="px-4 py-2 border border-gray-400">Spesifikasi</th>
            <th className="px-4 py-2 border border-gray-400">Satuan</th>
            <th className="px-4 py-2 border border-gray-400">Harga</th>
                </tr>
            </thead>
                {props.ssh ? props .ssh.map((data, i) => {
                    return(
                        <tr key={i} className={`bg-white hover:bg-gray-100 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <td className="px-4 py-2 border border-gray-300">{data.kode}</td>
                        <td className="px-4 py-2 border border-gray-300">{data.kelompok}</td>
                        <td className="px-4 py-2 border border-gray-300">{data.objek}</td>
                        <td className="px-4 py-2 border border-gray-300">{data.rincian_objek}</td>
                        <td className="px-4 py-2 border border-gray-300">{data.sub_rincian_objek}</td>
                        <td className="px-4 py-2 border border-gray-300">{data.uraian_barang}</td>
                        <td className="px-4 py-2 border border-gray-300">{data.spesifikasi}</td>
                        <td className="px-4 py-2 border border-gray-300">{data.satuan}</td>
                        <td className="px-4 py-2 border border-gray-300">{data.harga}</td>
                    </tr>
                    )
                }) :  <td colSpan="9" className="text-center py-4">Tidak ada data tersedia.</td> }
            </table>    
        </div>
    </div>
    )
}