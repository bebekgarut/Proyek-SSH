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
import FilterTahunModal from "@/Components/SSH/FilterTahunModal";

export default function SSH(props) {
    const [itemsPerPage, setItemsPerPage] = useState(props.perPage || 25);
    const [currentPage, setCurrentPage] = useState(props.ssh.current_page || 1);
    const [searchQuery, setSearchQuery] = useState(props.search || "");
    const [selectedYear, setSelectedYear] = useState(props.tahun || "");
    const [initialLoad, setInitialLoad] = useState(true); // Flag untuk menghindari pencarian pada render pertama
    const availableYears = props.availableYears || [];
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Cek apakah ada query parameter di URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const hasAnyParams = [...urlParams].length > 0; // Cek jika ada parameter apapun di URL

        // Tampilkan modal hanya jika tidak ada parameter apapun di URL
        if (!hasAnyParams) {
            setIsModalOpen(true);
        }
    }, []);

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
        setCurrentPage(1);
    };

    // Handle perubahan input pencarian
    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    // Handle perubahan jumlah item per halaman
    const handleItemsPerPageChange = (perPage) => {
        setItemsPerPage(perPage);
        setCurrentPage(1);
    };

    // Handle perubahan halaman
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleYearChangeModal = (year) => {
        setSelectedYear(year);
        setIsModalOpen(false);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
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
            {isModalOpen && (
                <FilterTahunModal
                    availableYears={availableYears}
                    selectedYear={selectedYear}
                    onSelectYear={handleYearChangeModal}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                />
            )}
        </>
    );
}
