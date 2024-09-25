import React from "react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import Background from "@/Components/Background";
import Table from "@/Components/SSH/Table";
import Pagination from "@/Components/SSH/Pagination";
import Navbar from "@/Components/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import { FaDownload, FaPlus, FaUpload } from "react-icons/fa";
import ItemsPerPageSelector from "@/Components/SSH/Selector";

export default function SSH(props) {
    const [itemsPerPage, setItemsPerPage] = useState(props.perPage || 25);
    const [currentPage, setCurrentPage] = useState(props.ssh.current_page || 1);

    const handleItemsPerPageChange = (perPage) => {
        setItemsPerPage(perPage); // Update state itemsPerPage
        setCurrentPage(1); // Reset halaman ke 1 ketika jumlah item per halaman berubah
        Inertia.get(route("ssh"), { page: 1, perPage }); // Kirim ke server
    };

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update state currentPage
        Inertia.get(route("ssh"), { page, perPage: itemsPerPage }); // Kirim ke server
    };

    console.log(props);
    return (
        <>
            <Head title={props.title} />
            <Background>
                <Navbar user={props.auth.user} />
                <div className="w-full min-h-screen bg-gray-100 bg-opacity-50">
                    <div className="p-2 px-5">
                        <div className="flex justify-center mt-20 mb-5">
                            <h1 className="text-2xl font-serif font-bold text-slate-800">
                                Data SSH Kota Palembang
                            </h1>
                        </div>
                        <div className="mb-2">
                            <div className="flex justify-between items-center">
                                <div className="w-auto">
                                    <ItemsPerPageSelector
                                        itemsPerPage={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <SecondaryButton>
                                        <FaPlus size={13} className="mr-1 " />
                                        Tambah
                                    </SecondaryButton>
                                    <SecondaryButton>
                                        <FaDownload
                                            size={13}
                                            className="mr-1 "
                                        />{" "}
                                        Download
                                    </SecondaryButton>
                                    <SecondaryButton>
                                        <FaUpload size={13} className="mr-1 " />{" "}
                                        Import
                                    </SecondaryButton>
                                </div>
                            </div>
                        </div>
                        <Table ssh={props.ssh.data} />
                        <div className="flex justify-center items-center">
                            <Pagination
                                meta={props.ssh.meta}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </Background>
        </>
    );
}
