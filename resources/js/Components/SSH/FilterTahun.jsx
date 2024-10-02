import React from "react";

const FilterTahun = ({ availableYears, selectedYear, onChange }) => {
    return (
        <>
            <select
                id="tahun"
                value={selectedYear}
                onChange={onChange}
                className="border border-gray-300 rounded-md pr-7 py-1  focus:border-cyan-500 focus:ring focus:ring-blue-200"
            >
                <option value="">Semua Tahun</option>
                {availableYears.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </>
    );
};

export default FilterTahun;
