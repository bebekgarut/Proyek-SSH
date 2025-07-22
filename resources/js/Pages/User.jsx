import React, { useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Background from "@/Components/Background";
import SecondaryButton from "@/Components/SecondaryButton";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function User(props) {
    console.log("props : ", props);
    const user = props.user;

    useEffect(() => {
        if (props.flash && props.flash.message) {
            Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: props.flash.message,
                confirmButtonColor: "#22D3EE",
            });
        }
    }, [props.flashs]);
    return (
        <>
            <Head title={props.title}></Head>
            <Background>
                <Navbar user={props.auth.user}></Navbar>
                <div className="w-full min-h-screen bg-gray-100 bg-opacity-50">
                    <div className="p-2 px-5">
                        <div className="flex justify-center mt-20 mb-5">
                            <h1 className="text-2xl font-serif font-bold text-slate-800">
                                Daftar User
                            </h1>
                        </div>
                        <div className="mb-2">
                            <div className="sm:flex space-y-2 justify-end items-center">
                                <div className="flex sm:space-x-1 md:space-x-2 space-x-2 items-center">
                                    <Link href={route("register")}>
                                        <SecondaryButton>
                                            <FaPlus
                                                size={13}
                                                className="md:mr-1 sm:mr-0 mr-1"
                                            />
                                            <span className="sm:hidden md:inline inline">
                                                Tambah User
                                            </span>
                                        </SecondaryButton>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm  bg-white border border-gray-300 overflow-auto">
                                <thead className="bg-gray-800 text-cyan-300 font-serif text-center">
                                    <tr>
                                        <th className="px-4 py-2">No.</th>
                                        <th className="px-4 py-2">Nama</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Password</th>
                                        <th className="px-4 py-2">Role</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {user && user.length > 0 ? (
                                        user.map((data, i) => (
                                            <tr
                                                key={i}
                                                className={`even:bg-gray-600 odd:bg-gray-700`}
                                            >
                                                <td className="px-4 py-2">
                                                    {i + 1}.
                                                </td>
                                                <td className="px-4 py-2">
                                                    {data.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {data.email}
                                                </td>
                                                <td className="px-4 py-2">
                                                    Password Terenskripsi
                                                </td>
                                                <td className="px-4 py-2">
                                                    {data.role}
                                                </td>
                                                <td className="px-4 py-2 flex justify-center items-center space-x-2">
                                                    <Link
                                                        href={route(
                                                            "user.edit",
                                                            data.id,
                                                        )}
                                                    >
                                                        <SecondaryButton>
                                                            <FaEdit
                                                                size={14}
                                                                className="md:mr-1 sm:mr-0 mr-1"
                                                            />
                                                            <span className="sm:hidden md:inline inline">
                                                                Edit
                                                            </span>
                                                        </SecondaryButton>
                                                    </Link>
                                                    <Link
                                                        href={route("register")}
                                                    >
                                                        <SecondaryButton>
                                                            <FaTrash
                                                                size={13}
                                                                className="md:mr-1 sm:mr-0 mr-1"
                                                            />
                                                            <span className="sm:hidden md:inline inline">
                                                                Delete
                                                            </span>
                                                        </SecondaryButton>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="11"
                                                className="text-center py-4"
                                            >
                                                Tidak ada data tersedia.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Background>
        </>
    );
}
