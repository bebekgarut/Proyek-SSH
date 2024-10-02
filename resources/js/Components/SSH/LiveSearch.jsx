import React, { useState, useEffect } from "react";

const SearchBar = ({ searchQuery, onSearchChange }) => {
    const [search, setSearch] = useState(searchQuery || "");

    // Update parent component when search input changes
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearchChange(search); // Panggil pencarian setelah 300ms delay
        }, 300); // 300ms debounce time

        return () => clearTimeout(delayDebounceFn); // Clear debounce setiap kali nilai berubah
    }, [search, onSearchChange]);

    return (
        <input
            type="text"
            placeholder="Cari data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update state pencarian
            className="border border-gray-300 rounded-md px-4 py-1 focus:border-cyan-500 focus:ring focus:ring-blue-200"
        />
    );
};

export default SearchBar;
