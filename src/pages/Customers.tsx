// src/pages/Customers.tsx
import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import customersData from "../data/user.json";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 10;

const Customers = () => {
    const [customers, setCustomers] = useState(customersData);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            setCustomers((prev) => prev.filter((c) => c.id !== id));
        }
    };

    const handleEdit = (id: string) => {
        alert(`Edit customer with ID: ${id}`);
    };

    const filteredCustomers = customers.filter((cust) =>
        `${cust.name} ${cust.email} ${cust.phone}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
    const paginatedData = filteredCustomers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <AdminLayout>
            <div>
                {/* Search Bar */}
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

                {/* Table */}
                <div className="overflow-x-auto shadow border border-gray-200 bg-white mt-4">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Phone</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((cust) => (
                                <tr key={cust.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{cust.name}</td>
                                    <td className="px-4 py-2">{cust.email}</td>
                                    <td className="px-4 py-2">{cust.phone}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${cust.status === "active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {cust.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(cust.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cust.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </AdminLayout>
    );
};

export default Customers;
