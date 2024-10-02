import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import Background from "@/Components/Background";
import Table from "@/Components/SSH/Table";
import Pagination from "@/Components/SSH/Pagination";
import Navbar from "@/Components/Navbar";
import SecondaryButton from "@/Components/SecondaryButton";
import { FaDownload, FaPlus, FaUpload } from "react-icons/fa";
import ItemsPerPageSelector from "@/Components/SSH/Selector";
import SearchBar from "@/Components/SSH/LiveSearch";
import Info from "@/Components/SSH/Info";
import FilterTahun from "@/Components/SSH/FilterTahun";

export default function SSH(props) {
    const [itemsPerPage, setItemsPerPage] = useState(props.perPage || 25);
    const [currentPage, setCurrentPage] = useState(props.ssh.current_page || 1);
    const [searchQuery, setSearchQuery] = useState(props.search || "");
    const [selectedYear, setSelectedYear] = useState(props.tahun || "");
    const availableYears = props.availableYears || [];
    const [initialLoad, setInitialLoad] = useState(true); // Flag untuk menghindari pencarian pada render pertama

    // Trigger pencarian hanya jika ada perubahan, dan hindari pemanggilan saat render pertama
    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            return; // Hindari pemanggilan pada render pertama
        }

        // Hanya panggil Inertia jika bukan render pertama
        Inertia.get(
            route("ssh"),
            {
                search: searchQuery,
                page: currentPage,
                perPage: itemsPerPage,
                tahun: selectedYear,
            },
            { preserveState: true, preserveScroll: true },
        );
    }, [searchQuery, currentPage, itemsPerPage, selectedYear]);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setCurrentPage(1); // Reset halaman ke 1 saat filter tahun diubah
    };

    // Handle perubahan input pencarian
    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset halaman ke 1 saat pencarian berubah
    };

    // Handle perubahan jumlah item per halaman
    const handleItemsPerPageChange = (perPage) => {
        setItemsPerPage(perPage);
        setCurrentPage(1); // Reset halaman ke 1 saat jumlah item berubah
    };

    // Handle perubahan halaman
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Head title={props.title} />
            <Background>
                <Navbar user={props.auth.user} />
                <div className="w-full min-h-screen bg-gray-100 bg-opacity-50">
                    <div className="p-2 px-5">
                        <div className="flex justify-center mt-20 mb-5">
                            <h1 className="text-2xl font-serif font-bold text-slate-800">
                                Data SSH Kota Palembang {props.tahun}
                            </h1>
                        </div>
                        <div className="mb-2">
                            <div className="flex justify-between items-center">
                                <div className="w-auto flex gap-2">
                                    <SearchBar
                                        searchQuery={searchQuery}
                                        onSearchChange={handleSearchChange}
                                    />
                                    <ItemsPerPageSelector
                                        itemsPerPage={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                    />
                                    <FilterTahun
                                        availableYears={availableYears}
                                        selectedYear={selectedYear}
                                        onChange={handleYearChange}
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
                                        />
                                        Download
                                    </SecondaryButton>
                                    <SecondaryButton>
                                        <FaUpload size={13} className="mr-1 " />
                                        Import
                                    </SecondaryButton>
                                </div>
                            </div>
                        </div>
                        <Table ssh={props.ssh.data} />
                        <div className="flex justify-between items-center mt-3 ">
                            <Info
                                ssh={props.ssh.data}
                                total={props.ssh.meta.total}
                            />
                            <Pagination
                                meta={props.ssh.meta}
                                onPageChange={handlePageChange}
                                hasData={props.ssh.data.length > 0} // Tambahkan prop hasData
                            />
                        </div>
                    </div>
                </div>
            </Background>
        </>
    );
}
