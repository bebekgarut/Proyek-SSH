import React from "react";
import Modal from "@/Components/Modal";

export default function FilterTahunModal({ availableYears, selectedYear, onSelectYear, isOpen, onClose }) {
    return (
        <Modal show={isOpen} onClose={onClose}>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Pilih Tahun</h2>
                <select
                    value={selectedYear}
                    onChange={(e) => onSelectYear(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">Pilih Tahun</option>
                    {availableYears.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={onClose}
                    >
                        OK
                    </button>
                </div>
            </div>
        </Modal>
    );
}
