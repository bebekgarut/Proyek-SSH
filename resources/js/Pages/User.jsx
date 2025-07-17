import React from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Background from "@/Components/Background";
import SecondaryButton from "@/Components/SecondaryButton";
import { FaPlus } from "react-icons/fa";

export default function User(props) {
    const user = props.user;
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
