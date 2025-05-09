// src/components/CustomerModal.tsx
import { type FC, useEffect, useState } from "react";

type CustomerData = {
    id?: string;
    name: string;
    email: string;
    phone: string;
    status: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CustomerData) => void;
    initialData?: CustomerData | null;
};

const defaultData: CustomerData = {
    name: "",
    email: "",
    phone: "",
    status: "active",
};

const CustomerModal: FC<Props> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState<CustomerData>(defaultData);

    useEffect(() => {
        setFormData(initialData || defaultData);
    }, [initialData, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formData, id: initialData?.id });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-xl relative">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {initialData ? "Edit Customer" : "Add New Customer"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Phone</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {initialData ? "Update Customer" : "Add Customer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerModal;
