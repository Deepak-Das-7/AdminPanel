import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";

const Settings = () => {
    const [storeName, setStoreName] = useState("");
    const [email, setEmail] = useState("");
    const [theme, setTheme] = useState("light");
    const [logo, setLogo] = useState<File | null>(null);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setLogo(e.target.files[0]);
        }
    };

    const handleSave = () => {
        // Save the settings (you can use axios or any other method to persist the settings)
        console.log("Settings saved:", { storeName, email, theme, logo });
    };

    return (
        <AdminLayout>
            <div >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Enter store name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Enter store email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Theme</label>
                        <select
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Logo</label>
                        <input
                            type="file"
                            onChange={handleLogoChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        />
                        {logo && <p className="mt-2 text-sm text-gray-600">Logo: {logo.name}</p>}
                    </div>

                    <div className="text-right">
                        <button
                            onClick={handleSave}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
