import { useEffect, useState, type FC } from "react";

type ProductData = {
    name: string;
    price: string;
    description: string;
    category: string;
    stock: string;
    sku: string;
    tags: string;
    status: string;
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProductData) => void;
    initialData?: ProductData | null;
};

const defaultData: ProductData = {
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    sku: "",
    tags: "",
    status: "active",
};

const ProductModal: FC<Props> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState<ProductData>(defaultData);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData(defaultData);
        }
    }, [initialData, isOpen]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    {initialData ? "Edit Product" : "Add New Product"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Name", name: "name" },
                            { label: "Price", name: "price", type: "number" },
                            { label: "Category", name: "category" },
                            { label: "Stock", name: "stock", type: "number" },
                            { label: "SKU", name: "sku" },
                            { label: "Tags (comma-separated)", name: "tags" },
                        ].map(({ label, name, type }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium mb-1">{label}</label>
                                <input
                                    name={name}
                                    type={type || "text"}
                                    value={(formData as any)[name]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                    required={name !== "sku" && name !== "tags"}
                                />
                            </div>
                        ))}

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
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
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
                            {initialData ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
