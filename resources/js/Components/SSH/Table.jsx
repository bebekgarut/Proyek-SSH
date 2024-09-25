const Table = ({ ssh }) => {
    // console.log("data :", ssh);
    return (
        <table className="w-full text-left text-sm  bg-white border border-gray-300">
            <thead className="bg-gray-800 text-cyan-300 font-serif text-center">
                <tr>
                    <th className="px-4 py-2">No.</th>
                    <th className="px-4 py-2">Kode</th>
                    <th className="px-4 py-2">Kelompok</th>
                    <th className="px-4 py-2">Objek</th>
                    <th className="px-4 py-2">Rincian Objek</th>
                    <th className="px-4 py-2">Sub Rincian Objek</th>
                    <th className="px-4 py-2">Uraian Barang</th>
                    <th className="px-4 py-2">Spesifikasi</th>
                    <th className="px-4 py-2">Satuan</th>
                    <th className="px-4 py-2">Harga</th>
                    <th className="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {ssh ? (
                    ssh.map((data, i) => {
                        return (
                            <tr
                                key={i}
                                className={`even:bg-gray-600 odd:bg-gray-700`}
                            >
                                <td className="px-4 py-2">{i + 1}.</td>
                                <td className="px-4 py-2">{data.kode}</td>
                                <td className="px-4 py-2">{data.kelompok}</td>
                                <td className="px-4 py-2">{data.objek}</td>
                                <td className="px-4 py-2">
                                    {data.rincian_objek}
                                </td>
                                <td className="px-4 py-2">
                                    {data.sub_rincian_objek}
                                </td>
                                <td className="px-4 py-2">
                                    {data.uraian_barang}
                                </td>
                                <td className="px-4 py-2">
                                    {data.spesifikasi}
                                </td>
                                <td className="px-4 py-2">{data.satuan}</td>
                                <td className="px-4 py-2">{data.harga}</td>
                                <td className="px-4 py-2">{data.harga}</td>
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
