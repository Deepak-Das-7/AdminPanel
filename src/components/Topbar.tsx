import { LogOut } from "lucide-react";

const Topbar = () => {
    return (
        <div className="bg-white h-16 shadow-md flex items-center justify-between px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
                Admin Panel
            </h1>

            <div className="flex items-center gap-4">
                {/* Admin Avatar Placeholder */}
                <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                    A
                </div>

                {/* Logout Button */}
                <button
                    onClick={() => {
                        localStorage.removeItem("adminToken");
                        window.location.href = "/login";
                    }}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md shadow-sm transition-all"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Topbar;
