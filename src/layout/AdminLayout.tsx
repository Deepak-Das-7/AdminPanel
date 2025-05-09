import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { type ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="flex-1 overflow-auto">
                    <div className="bg-white  shadow-xl p-6 min-h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
