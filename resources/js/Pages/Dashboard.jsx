import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Dashboard({ auth, props }) {
    const { flash } = usePage().props; // Mengambil flash message

    // Cek jika ada flash message dan tampilkan SweetAlert
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
                        // Ini untuk debugging, cek apakah sukses
                        console.log("Data berhasil ditambahkan");

                        Swal.fire({
                            title: "Success!",
                            text: "Data has been submitted.",
                            icon: "success",
                        }).then(() => {
                            // Jika ingin melakukan aksi lain setelah sukses, misalnya redirect atau clear form
                            // Misalnya redirect ke halaman lain
                            // Inertia.visit('/success-page');
                        });
                    },
                    onError: (errors) => {
                        // Debug jika terjadi error
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
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        {/* Form Inputs */}
                        <div>
                            <label className="mr-4">Kode</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="m-2 input input-ghost w-3/4"
                                onChange={(kode) => setKode(kode.target.value)}
                            />
                        </div>
                        <div>
                            <label className="mr-4">Kelompok</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-ghost m-2 w-3/4"
                                onChange={(kelompok) =>
                                    setKelompok(kelompok.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="mr-4">Objek</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-ghost m-2 w-3/4"
                                onChange={(objek) =>
                                    setObjek(objek.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="mr-4">Rincian Objek</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-ghost m-2 w-3/4"
                                onChange={(rincian_objek) =>
                                    setRincianObjek(rincian_objek.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="mr-4">Sub Rincian Objek</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-ghost m-2 w-3/4"
                                onChange={(sub_rincian_objek) =>
                                    setSubRincianObjek(
                                        sub_rincian_objek.target.value,
                                    )
                                }
                            />
                        </div>
                        <div>
                            <label className="mr-4">Uraian Barang</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-ghost m-2 w-3/4"
                                onChange={(uraian_barang) =>
                                    setUraianBarang(uraian_barang.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="mr-4">Spesifikasi</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-ghost m-2 w-3/4"
                                onChange={(spesifikasi) =>
                                    setSpesifikasi(spesifikasi.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="mr-4">Satuan</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-ghost m-2 w-3/4"
                                onChange={(satuan) =>
                                    setSatuan(satuan.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="mr-4">Harga</label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-ghost m-2 w-3/4"
                                onChange={(harga) =>
                                    setHarga(harga.target.value)
                                }
                            />
                        </div>
                        <button
                            className="btn m-2 btn-primary"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
