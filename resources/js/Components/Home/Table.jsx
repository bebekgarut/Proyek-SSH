const Table = ({ ssh }) => {
    // console.log("data :", ssh);
    return (
        <table className="m-3 w-full text-left bg-white border border-gray-300">
            <thead className="bg-gray-800 text-cyan-200">
                <tr>
                    <th className="px-4 py-2 border border-gray-400">No.</th>
                    <th className="px-4 py-2 border border-gray-400">Kode</th>
                    <th className="px-4 py-2 border border-gray-400">
                        Kelompok
                    </th>
                    <th className="px-4 py-2 border border-gray-400">Objek</th>
                    <th className="px-4 py-2 border border-gray-400">
                        Rincian Objek
                    </th>
                    <th className="px-4 py-2 border border-gray-400">
                        Sub Rincian Objek
                    </th>
                    <th className="px-4 py-2 border border-gray-400">
                        Uraian Barang
                    </th>
                    <th className="px-4 py-2 border border-gray-400">
                        Spesifikasi
                    </th>
                    <th className="px-4 py-2 border border-gray-400">Satuan</th>
                    <th className="px-4 py-2 border border-gray-400">Harga</th>
                </tr>
            </thead>
            <tbody>
                {ssh ? (
                    ssh.map((data, i) => {
                        return (
                            <tr
                                key={i}
                                className={`bg-white hover:bg-gray-100 ${
                                    i % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }`}
                            >
                                <td className="px-4 py-2 border border-gray-300">
                                    {i + 1}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.kode}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.kelompok}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.objek}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.rincian_objek}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.sub_rincian_objek}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.uraian_barang}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.spesifikasi}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.satuan}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {data.harga}
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="9" className="text-center py-4">
                            Tidak ada data tersedia.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
