import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Navbar from "@/Components/Navbar";
import Background from "@/Components/Background";

export default function Tambah(props) {
    const { flash } = usePage().props;

    if (flash.message) {
        Swal.fire({
            title: "Success!",
            text: flash.message,
            icon: "success",
        });
    }
    const [kode, setKode] = useState("");
    const [kelompok, setKelompok] = useState("");
    const [objek, setObjek] = useState("");
    const [rincian_objek, setRincianObjek] = useState("");
    const [sub_rincian_objek, setSubRincianObjek] = useState("");
    const [uraian_barang, setUraianBarang] = useState("");
    const [spesifikasi, setSpesifikasi] = useState("");
    const [satuan, setSatuan] = useState("");
    const [harga, setHarga] = useState("");

    const handleSubmit = () => {
        const data = {
            kode,
            kelompok,
            objek,
            rincian_objek,
            sub_rincian_objek,
            uraian_barang,
            spesifikasi,
            satuan,
            harga,
        };

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to submit the form?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post("/store", data, {
                    onSuccess: () => {
                        console.log("Data berhasil ditambahkan");

                        Swal.fire({
                            title: "Success!",
                            text: "Data has been submitted.",
                            icon: "success",
                        }).then(() => {});
                    },
                    onError: (errors) => {
                        console.log("Error saat menambahkan data: ", errors);

                        Swal.fire({
                            title: "Error!",
                            text: "There was an error submitting the data.",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };

    return (
        <>
            <Head title={props.title} />
            <Background>
                <Navbar user={props.auth.user} />
                <div className="w-full min-h-screen bg-gray-100 bg-opacity-50">
                    <div className="p-2 px-5">
                        <div className="flex justify-center mt-20 mb-5">
                            <h1 className="text-2xl text-center font-serif font-bold text-slate-800">
                                Tambah Data SSH
                            </h1>
                        </div>
                        <div className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
                            <table className="w-full">
                                <tr>
                                    <td className="w-48">
                                        {" "}
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Kode
                                        </label>
                                    </td>
                                    <td className="w-max">
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="m-2 input w-full"
                                            onChange={(kode) =>
                                                setKode(kode.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Kelompok
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input m-2 w-full"
                                            onChange={(kelompok) =>
                                                setKelompok(
                                                    kelompok.target.value,
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Objek
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input m-2 w-full"
                                            onChange={(objek) =>
                                                setObjek(objek.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Rincian Objek
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input m-2 w-full"
                                            onChange={(rincian_objek) =>
                                                setRincianObjek(
                                                    rincian_objek.target.value,
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Sub Rincian Objek
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input m-2 w-full"
                                            onChange={(sub_rincian_objek) =>
                                                setSubRincianObjek(
                                                    sub_rincian_objek.target
                                                        .value,
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Uraian Barang
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input m-2 w-full"
                                            onChange={(uraian_barang) =>
                                                setUraianBarang(
                                                    uraian_barang.target.value,
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Spesifikasi
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input m-2 w-full"
                                            onChange={(spesifikasi) =>
                                                setSpesifikasi(
                                                    spesifikasi.target.value,
                                                )
                                            }
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Satuan
                                        </label>
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input m-2 w-full"
                                            onChange={(satuan) =>
                                                setSatuan(satuan.target.value)
                                            }
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <label className="mr-4 text-lg text-cyan-300 font-serif">
                                            Harga
                                        </label>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input m-2 w-full"
                                            onChange={(harga) =>
                                                setHarga(harga.target.value)
                                            }
                                        />
                                    </td>
                                </tr>
                            </table>
                            <button
                                className="btn m-2 btn-primary"
                                onClick={() => handleSubmit()}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Background>
        </>
    );
}
