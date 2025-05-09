import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";

const Sidebar = () => {
    const { pathname } = useLocation();

    const links = [
        { to: "/", label: "Dashboard" },
        { to: "/products", label: "Products" },
        { to: "/orders", label: "Orders" },
        { to: "/customers", label: "Customers" },
        { to: "/settings", label: "Settings" },
    ];

    return (
        <aside className="w-64 bg-white h-screen shadow-lg flex flex-col border-r">
            <div className="p-4 text-2xl font-extrabold text-blue-600 border-b border-gray-200 h-16">
                E-Dukaan
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {links.map(({ to, label }) => {
                    const active = pathname === to;
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={cn(
                                "block px-4 py-2 rounded-lg font-medium transition-all duration-200",
                                active
                                    ? "bg-blue-500 text-white shadow"
                                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                            )}
                        >
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
