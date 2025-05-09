import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import productsData from "../data/product.json";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import ProductModal from "../components/ProductModal";

const ITEMS_PER_PAGE = 10;

const Products = () => {
    const [products, setProducts] = useState(productsData);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts((prev) => prev.filter((product) => product.id !== id));
        }
    };

    const handleEdit = (id: string) => {
        const productToEdit = products.find((p) => p.id === id);
        if (productToEdit) {
            setSelectedProduct(productToEdit);
            setModalMode("edit");
            setShowModal(true);
        }
    };

    const handleAdd = (newProduct: any) => {
        setProducts((prev) => [
            ...prev,
            { ...newProduct, id: crypto.randomUUID() },
        ]);
        setShowModal(false);
    };

    const handleUpdate = (updatedProduct: any) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
        setSelectedProduct(null);
        setShowModal(false);
    };

    const openAddModal = () => {
        setModalMode("add");
        setSelectedProduct(null);
        setShowModal(true);
    };

    return (
        <AdminLayout>
            <div>
                {/* Top bar */}
                <div className="flex justify-between items-center mb-4">
                    <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
                    <button
                        onClick={openAddModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Plus size={16} /> Add Product
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto shadow border border-gray-200 bg-white">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Category</th>
                                <th className="px-4 py-3 text-left">Price</th>
                                <th className="px-4 py-3 text-left">Stock</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.map((product) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">${product.price}</td>
                                    <td className="px-4 py-2">{product.stock}</td>
                                    <td className="px-4 py-2 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(product.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
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

                {/* Product Modal */}
                <ProductModal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedProduct(null);
                    }}
                    onSubmit={modalMode === "add" ? handleAdd : handleUpdate}
                    initialData={selectedProduct ?? undefined}
                />
            </div>
        </AdminLayout>
    );
};

export default Products;
