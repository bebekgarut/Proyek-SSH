import React, { useState, useEffect } from "react";

const SearchBar = ({ searchQuery, onSearchChange }) => {
    const [search, setSearch] = useState(searchQuery || "");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearchChange(search);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, onSearchChange]);

    return (
        <input
            type="text"
            placeholder="Cari data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-1 focus:border-cyan-500 focus:ring focus:ring-blue-200 sm:mr-0 mr-2"
        />
    );
};

export default SearchBar;
