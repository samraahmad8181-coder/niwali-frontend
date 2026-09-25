import { useMemo, useState, useEffect } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Plus,
    Search,
    Star,
    Eye,
    Pencil,
    Trash2,
    Image as ImageIcon,
    ChevronsUpDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// Existing forms
import AddProductForm from "./addProduct";
import ProductDetailForm from "./viewProduct";
import ProductEdit from "./editProduct";

export default function ProductListTable() {

    const apiUrl = import.meta.env.VITE_API_URL || "";

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        // If it's already a base64 string, an external link, or Cloudinary, use it directly
        if (imagePath.startsWith("data:") || imagePath.startsWith("http")) return imagePath;
        // Otherwise, combine backend URL with the relative upload path
        return `${apiUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
    };

    // --------------------------------
    // States
    // --------------------------------

    const [view, setView] = useState("list");
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [search, setSearch] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --------------------------------
    // Fetch Products from API
    // --------------------------------

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/products/`);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            const productArray = Array.isArray(data) ? data : (data.products || data.data || []);
            setProducts(productArray);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --------------------------------
    // Table Columns
    // --------------------------------

    const columns = [
        "ID",
        "Image",
        "Title",
        "Category",
        "Price",
        "Orders",
        "Status",
        "Actions",
    ];


    // --------------------------------
    // Add Product
    // --------------------------------

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setView("add");
    };


    // --------------------------------
    // View Product
    // --------------------------------

    const handleViewProduct = (product) => {
        setSelectedProduct(product);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedProduct(null);
    };


    // --------------------------------
    // Edit Product
    // --------------------------------

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowEdit(true);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
        setSelectedProduct(null);
    };


    // --------------------------------
    // Delete Product
    // --------------------------------

    const handleDeleteProduct = async (product) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${product.title}"?`);
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
            const response = await fetch(`${apiUrl}/products/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to delete product from server");

            setProducts((currentProducts) =>
                Array.isArray(currentProducts)
                    ? currentProducts.filter((item) => item.id !== product.id)
                    : []
            );
        } catch (err) {
            console.error("Error deleting product:", err);
            alert(err.message);
        }
    };


    // --------------------------------
    // Back To Product List
    // --------------------------------

    const handleBack = () => {
        setSelectedProduct(null);
        setView("list");
    };


    // --------------------------------
    // Filter Products
    // --------------------------------

    const filteredProducts = useMemo(() => {

        let result = Array.isArray(products) ? [...products] : [];

        // Search
        if (search.trim()) {

            const searchValue = search.toLowerCase();

            result = result.filter((product) =>
                product.title
                    .toLowerCase()
                    .includes(searchValue) ||

                String(product.category || "")
                    .toLowerCase()
                    .includes(searchValue) ||

                String(product.id)
                    .includes(searchValue)
            );
        }

        return result;

    }, [products, search]);


    // --------------------------------
    // Pagination
    // --------------------------------

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredProducts.length / entriesPerPage
        )
    );

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages
    );

    const startIndex =
        (safeCurrentPage - 1) * entriesPerPage;

    const endIndex =
        startIndex + entriesPerPage;

    const currentProducts =
        filteredProducts.slice(
            startIndex,
            endIndex
        );


    // --------------------------------
    // Search
    // --------------------------------

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };


    // --------------------------------
    // Entries Per Page
    // --------------------------------

    const handleEntriesChange = (value) => {
        setEntriesPerPage(Number(value));
        setCurrentPage(1);
    };



    // --------------------------------
    // Add Product Page
    // --------------------------------

    if (view === "add") {
        return (
            <AddProductForm
                onBack={handleBack}
                onSuccess={() => {
                    fetchProducts(); // Refetch the updated list from backend
                    setView("list");   // Switch back to the table view
                }}
            />
        );
    }

    // --------------------------------
    // Product List
    // --------------------------------

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

            <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">


                {/* =========================
                    Header
                ========================= */}

                <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">

                    <h1 className="text-xl font-semibold text-gray-900">
                        Product List
                    </h1>

                    <Button
                        onClick={handleAddProduct}
                        className="gap-2 self-start bg-green-600 text-white hover:bg-green-700 sm:self-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Add New
                    </Button>

                </div>

                {/* =========================
    Controls
========================= */}

                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:pt-4">

                    {/* Entries */}

                    <div className="flex items-center gap-2 text-sm text-gray-600">

                        <span>
                            Show
                        </span>

                        <select
                            value={entriesPerPage}
                            onChange={(e) =>
                                handleEntriesChange(e.target.value)
                            }
                            className="rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                            <option value={9}>9</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>

                        <span>
                            entries
                        </span>

                    </div>


                    {/* Search */}

                    <div className="relative w-full sm:w-64">

                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <Input
                            value={search}
                            onChange={(e) =>
                                handleSearch(e.target.value)
                            }
                            placeholder="Search products..."
                            className="border-gray-200 pl-9 focus:border-green-500 focus:ring-green-500"
                        />

                    </div>

                </div>


                {/* =========================
                    Table (md and up)
                ========================= */}

                <div className="hidden overflow-x-auto md:block">

                    <Table>

                        {/* Table Header */}

                        <TableHeader>

                            <TableRow className="bg-green-600 hover:bg-green-600">

                                {columns.map((col) => (

                                    <TableHead
                                        key={col}
                                        className="whitespace-nowrap text-white"
                                    >

                                        <span className="flex items-center gap-1">

                                            {col}

                                            {col !== "Image" &&
                                                col !== "Actions" && (
                                                    <ChevronsUpDown className="h-3 w-3 opacity-70" />
                                                )}

                                        </span>

                                    </TableHead>

                                ))}

                            </TableRow>

                        </TableHeader>


                        {/* Table Body */}

                        <TableBody>

                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-32 text-center text-gray-500"
                                    >
                                        Loading products...
                                    </TableCell>
                                </TableRow>
                            ) : error ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-32 text-center text-red-500"
                                    >
                                        Error: {error}
                                    </TableCell>
                                </TableRow>
                            ) : currentProducts.length > 0 ? (

                                currentProducts.map((p) => (

                                    <TableRow
                                        key={p.id}
                                        className="transition-colors hover:bg-green-50/50"
                                    >

                                        {/* ID */}

                                        <TableCell>
                                            {p.id}
                                        </TableCell>


                                        {/* Image */}

                                        <TableCell>
                                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                                                {p.main_image || p.image ? (
                                                    <img
                                                        src={getImageUrl(p.main_image || p.image)}
                                                        alt={p.title || "Product"}
                                                        className="h-full w-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = "https://placehold.co/150?text=No+Image";
                                                        }}
                                                    />
                                                ) : (
                                                    <ImageIcon className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                        </TableCell>


                                        {/* Title */}

                                        <TableCell className="max-w-[220px] truncate font-medium text-gray-900" title={p.title}>
                                            {p.title}
                                        </TableCell>


                                        {/* Category */}

                                        <TableCell className="text-gray-600">
                                            {p.category_id || "Uncategorized"}
                                        </TableCell>


                                        {/* Price */}

                                        <TableCell className="text-gray-600">
                                            ${p.price}
                                        </TableCell>


                                        {/* Orders */}

                                        <TableCell className="text-gray-600">
                                            {p.order_count || 0}
                                        </TableCell>


                                        {/* Status */}

                                        <TableCell>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium text-white ${(p.status || "active") === "active"
                                                    ? "bg-green-500"
                                                    : "bg-gray-400"
                                                    }`}
                                            >
                                                {p.status || "active"}
                                            </span>

                                        </TableCell>


                                        {/* Actions */}

                                        <TableCell>

                                            <div className="flex items-center gap-2">

                                                {/* View */}

                                                <button
                                                    onClick={() =>
                                                        handleViewProduct(p)
                                                    }
                                                    className="rounded-full bg-green-50 p-2 text-green-600 transition hover:bg-green-600 hover:text-white"
                                                    title="View Product"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>


                                                {/* Edit */}

                                                <button
                                                    onClick={() =>
                                                        handleEditProduct(p)
                                                    }
                                                    className="rounded-full bg-green-50 p-2 text-green-600 transition hover:bg-green-600 hover:text-white"
                                                    title="Edit Product"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>


                                                {/* Delete */}

                                                <button
                                                    onClick={() =>
                                                        handleDeleteProduct(p)
                                                    }
                                                    className="rounded-full bg-red-50 p-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>

                                            </div>

                                        </TableCell>

                                    </TableRow>

                                ))

                            ) : (

                                <TableRow>

                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-32 text-center text-gray-500"
                                    >
                                        No products found.
                                    </TableCell>

                                </TableRow>

                            )}

                        </TableBody>

                    </Table>

                </div>


                {/* =========================
                    Card list (below md)
                ========================= */}

                <div className="divide-y divide-gray-200 md:hidden">

                    {loading ? (
                        <div className="p-8 text-center text-sm text-gray-500">
                            Loading products...
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-sm text-red-500">
                            Error: {error}
                        </div>
                    ) : currentProducts.length > 0 ? (

                        currentProducts.map((p) => (

                            <div key={p.id} className="flex gap-3 p-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                                    {p.main_image || p.image ? (
                                        <img
                                            src={getImageUrl(p.main_image || p.image)}
                                            alt={p.title || "Product"}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/150?text=No+Image";
                                            }}
                                        />
                                    ) : (
                                        <ImageIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">

                                    <div className="flex min-w-0 items-start justify-between gap-2">
                                        <p className="min-w-0 truncate text-sm font-medium text-gray-900" title={p.title}>
                                            {p.title}
                                        </p>
                                        <span
                                            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium text-white ${(p.status || "active") === "active"
                                                ? "bg-green-500"
                                                : "bg-gray-400"
                                                }`}
                                        >
                                            {p.status || "active"}
                                        </span>
                                    </div>

                                    <p className="mt-0.5 text-xs text-gray-500">
                                        #{p.id} · {p.category_id || "Uncategorized"}
                                    </p>

                                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600">
                                        <span className="font-semibold text-gray-900">${p.price}</span>
                                        <span>{p.order_count || 0} orders</span>
                                    </div>

                                    <div className="mt-2 flex items-center gap-2">

                                        <button
                                            onClick={() => handleViewProduct(p)}
                                            className="rounded-full bg-green-50 p-2 text-green-600 transition hover:bg-green-600 hover:text-white"
                                            title="View Product"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>

                                        <button
                                            onClick={() => handleEditProduct(p)}
                                            className="rounded-full bg-green-50 p-2 text-green-600 transition hover:bg-green-600 hover:text-white"
                                            title="Edit Product"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteProduct(p)}
                                            className="rounded-full bg-red-50 p-2 text-red-500 transition hover:bg-red-500 hover:text-white"
                                            title="Delete Product"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (
                        <div className="p-8 text-center text-sm text-gray-500">
                            No products found.
                        </div>
                    )}

                </div>


                {/* =========================
                    Footer / Pagination
                ========================= */}

                <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 p-4 sm:flex-row sm:p-6">

                    {/* Showing */}

                    <span className="text-center text-sm text-gray-500">

                        Showing{" "}

                        {filteredProducts.length === 0
                            ? 0
                            : startIndex + 1}

                        {" "}to{" "}

                        {Math.min(
                            endIndex,
                            filteredProducts.length
                        )}

                        {" "}of{" "}

                        {filteredProducts.length}

                        {" "}entries

                    </span>


                    {/* Pagination */}

                    <div className="flex flex-wrap items-center justify-center gap-1">

                        {/* Previous */}

                        <button
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.max(1, page - 1)
                                )
                            }
                            disabled={safeCurrentPage === 1}
                            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-500 transition hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                        >

                            <ChevronLeft className="h-4 w-4" />

                            <span className="hidden sm:inline">Previous</span>

                        </button>


                        {/* Page Numbers */}

                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (

                            <button
                                key={page}
                                onClick={() =>
                                    setCurrentPage(page)
                                }
                                className={`h-8 w-8 rounded-md text-sm font-medium transition ${safeCurrentPage === page
                                    ? "bg-green-600 text-white"
                                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                                    }`}
                            >
                                {page}
                            </button>

                        ))}


                        {/* Next */}

                        <button
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.min(
                                        totalPages,
                                        page + 1
                                    )
                                )
                            }
                            disabled={
                                safeCurrentPage === totalPages
                            }
                            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-500 transition hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40 sm:px-3"
                        >

                            <span className="hidden sm:inline">Next</span>

                            <ChevronRight className="h-4 w-4" />

                        </button>

                    </div>

                </div>

            </div>


            {/* =========================
                Product Detail Modal
            ========================= */}

            {showDetail && selectedProduct && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                    onClick={handleCloseDetail}
                >

                    <div
                        className="w-full max-w-5xl animate-in fade-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <ProductDetailForm
                            product={selectedProduct}
                            onBack={handleCloseDetail}
                        />

                    </div>

                </div>
            )}


            {/* =========================
                Edit Product Modal
            ========================= */}

            {showEdit && selectedProduct && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                    onClick={handleCloseEdit}
                >

                    <div
                        className="w-full max-w-5xl animate-in fade-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <ProductEdit
                            product={selectedProduct}
                            onBack={handleCloseEdit}
                        />

                    </div>

                </div>
            )}

        </div>
    );
}