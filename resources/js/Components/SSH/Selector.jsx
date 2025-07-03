import React from "react";
import { Inertia } from "@inertiajs/inertia";

const ItemsPerPageSelector = ({ itemsPerPage, onChange }) => {
    const handleChange = (event) => {
        const perPage = event.target.value;
        onChange(perPage);
    };

    return (
        <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleChange}
            className="border border-gray-300 rounded-md pr-7 py-1  focus:border-cyan-500 focus:ring focus:ring-blue-200 sm:mr-0 mr-2"
        >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
    );
};

export default ItemsPerPageSelector;
