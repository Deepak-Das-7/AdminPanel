import AdminLayout from "../layout/AdminLayout";
import { BarChart3, ShoppingCart, Users, DollarSign } from "lucide-react";

const Dashboard = () => {
    return (
        <AdminLayout>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    <DollarSign className="text-green-500 w-8 h-8" />
                    <div>
                        <p className="text-sm text-gray-500">Total Sales</p>
                        <h3 className="text-xl font-bold">$45,300</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    <ShoppingCart className="text-blue-500 w-8 h-8" />
                    <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <h3 className="text-xl font-bold">1,248</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    <Users className="text-purple-500 w-8 h-8" />
                    <div>
                        <p className="text-sm text-gray-500">Total Customers</p>
                        <h3 className="text-xl font-bold">980</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    <BarChart3 className="text-orange-500 w-8 h-8" />
                    <div>
                        <p className="text-sm text-gray-500">New Signups</p>
                        <h3 className="text-xl font-bold">76</h3>
                    </div>
                </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h4 className="text-lg font-semibold mb-4">Sales Overview (Mock Chart)</h4>
                <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    Chart.js or Recharts can go here
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h4 className="text-lg font-semibold mb-4">Recent Orders</h4>
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr className="text-sm text-gray-500 border-b">
                            <th className="py-2">Order ID</th>
                            <th className="py-2">Customer</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: "#00123", customer: "Alice", amount: "$120.00", status: "Completed" },
                            { id: "#00124", customer: "Bob", amount: "$250.00", status: "Pending" },
                            { id: "#00125", customer: "Charlie", amount: "$89.99", status: "Cancelled" },
                        ].map((order) => (
                            <tr key={order.id} className="text-sm border-b hover:bg-gray-50">
                                <td className="py-2">{order.id}</td>
                                <td className="py-2">{order.customer}</td>
                                <td className="py-2">{order.amount}</td>
                                <td className="py-2">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium
                                            ${order.status === "Completed"
                                                ? "bg-green-100 text-green-600"
                                                : order.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
