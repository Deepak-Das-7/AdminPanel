import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ordersData from "../data/order.json"; // Mock order data
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const ITEMS_PER_PAGE = 10;

const Orders = () => {
    const [orders, setOrders] = useState(ordersData);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter orders by search term
    const filteredOrders = orders.filter((order) =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter orders by search term (search by order number, customer, date, and total)
    // const filteredOrders = orders.filter((order) => {
    //     const searchLower = searchTerm.toLowerCase();
    //     return (
    //         order.orderNumber.toLowerCase().includes(searchLower) ||
    //         order.customer.toLowerCase().includes(searchLower) ||
    //         order.date.toLowerCase().includes(searchLower) ||
    //         order.total.toString().includes(searchLower)
    //     );
    // });

    // Pagination logic
    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            setOrders((prev) => prev.filter((order) => order.id !== id));
        }
    };

    const handleEdit = (id: string) => {
        alert(`Edit order with ID: ${id}`);
    };

    return (
        <AdminLayout>
            <div>
                {/* Search Bar */}
                <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

                <div className="overflow-x-auto shadow border border-gray-200 bg-white mt-4">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Order Number</th>
                                <th className="px-4 py-3 text-left">Customer</th>
                                <th className="px-4 py-3 text-left">Date</th>
                                <th className="px-4 py-3 text-left">Total</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedOrders.map((order) => (
                                <tr key={order.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{order.orderNumber}</td>
                                    <td className="px-4 py-2">{order.customer}</td>
                                    <td className="px-4 py-2">{order.date}</td>
                                    <td className="px-4 py-2">${order.total}</td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(order.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(order.id)}
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

export default Orders;
