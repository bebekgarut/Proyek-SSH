import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
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
    const [initialLoad, setInitialLoad] = useState(true);
    const availableYears = props.availableYears || [];
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const hasAnyParams = [...urlParams].length > 0;

        if (!hasAnyParams) {
            setIsModalOpen(true);
        }
    }, []);

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            return;
        }

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

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (perPage) => {
        setItemsPerPage(perPage);
        setCurrentPage(1);
    };

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
                            <div className="sm:flex space-y-2 justify-between items-center">
                                <div className="sm:flex sm:space-y-0 space-y-2 sm:space-x-2 items-center grid-cols-2">
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
                                <div className="flex sm:space-x-1 md:space-x-2 space-x-2 items-center">
                                    <Link href={route("tambah.ssh")}>
                                        <SecondaryButton>
                                            <FaPlus
                                                size={13}
                                                className="md:mr-1 sm:mr-0 mr-1"
                                            />
                                            <span className="sm:hidden md:inline inline">
                                                Tambah
                                            </span>
                                        </SecondaryButton>
                                    </Link>
                                    <a
                                        href={route("export.ssh", {
                                            tahun: selectedYear,
                                        })}
                                    >
                                        <SecondaryButton>
                                            <FaDownload
                                                size={13}
                                                className="md:mr-1 sm:mr-0 mr-1"
                                            />
                                            <span className="sm:hidden md:inline inline">
                                                Download
                                            </span>
                                        </SecondaryButton>
                                    </a>
                                    <SecondaryButton>
                                        <FaUpload
                                            size={13}
                                            className="md:mr-1 sm:mr-0 mr-1"
                                        />
                                        <span className="sm:hidden md:inline inline">
                                            Import
                                        </span>
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
                                hasData={props.ssh.data.length > 0}
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
