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
    Eye,
    Pencil,
    Trash2,
    Image as ImageIcon,
    ChevronsUpDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import AddCategoryForm from "./add";
import CategoryDetailForm from "./view";
import CategoryEdit from "./edit";

export default function CategoryListTable() {
    const apiUrl = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";

    const [view, setView] = useState("list");
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [search, setSearch] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/categories/`);
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const data = await response.json();
            const categoryArray = Array.isArray(data) ? data : (data.categories || data.data || []);
            setCategories(categoryArray);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const columns = [
        "ID",
        "Image",
        "Name",
        "Slug",
        "Description",
        "Status",
        "Actions",
    ];

    const handleAddCategory = () => {
        setSelectedCategory(null);
        setView("add");
    };

    const handleViewCategory = (category) => {
        setSelectedCategory(category);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedCategory(null);
    };

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
        setShowEdit(true);
    };

    const handleCloseEdit = () => {
        setShowEdit(false);
        setSelectedCategory(null);
    };

    const handleDeleteCategory = async (category) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${category.name || category.title}"?`);
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
            const response = await fetch(`${apiUrl}/categories/${category.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to delete category from server");

            setCategories((currentCategories) =>
                Array.isArray(currentCategories)
                    ? currentCategories.filter((item) => item.id !== category.id)
                    : []
            );
        } catch (err) {
            console.error("Error deleting category:", err);
            alert(err.message);
        }
    };

    const handleBack = () => {
        setSelectedCategory(null);
        setView("list");
    };

    const filteredCategories = useMemo(() => {
        let result = Array.isArray(categories) ? [...categories] : [];

        if (search.trim()) {
            const searchValue = search.toLowerCase();
            result = result.filter((category) =>
                String(category.name || category.title || "")
                    .toLowerCase()
                    .includes(searchValue) ||
                String(category.slug || "")
                    .toLowerCase()
                    .includes(searchValue) ||
                String(category.id)
                    .includes(searchValue)
            );
        }

        return result;
    }, [categories, search]);

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredCategories.length / entriesPerPage
        )
    );

    const safeCurrentPage = Math.min(
        currentPage,
        totalPages
    );

    const startIndex = (safeCurrentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentCategories = filteredCategories.slice(startIndex, endIndex);

    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleEntriesChange = (value) => {
        setEntriesPerPage(Number(value));
        setCurrentPage(1);
    };

    if (view === "add") {
        return (
            <AddCategoryForm
                onBack={handleBack}
                onSuccess={() => {
                    fetchCategories();
                    setView("list");
                }}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Category List
                    </h1>

                    <Button
                        onClick={handleAddCategory}
                        className="gap-2 bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
                    >
                        <Plus className="h-4 w-4" />
                        Add New
                    </Button>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Show</span>
                        <select
                            value={entriesPerPage}
                            onChange={(e) => handleEntriesChange(e.target.value)}
                            className="rounded-md border border-gray-200 px-2 py-1 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        >
                            <option value={9}>9</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span>entries</span>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search categories..."
                            className="border-gray-200 pl-9 focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                </div>

                {/* Desktop Table View (Hidden on extra small mobile screens) */}
                <div className="hidden md:block overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-green-600 hover:bg-green-600">
                                {columns.map((col) => (
                                    <TableHead
                                        key={col}
                                        className="whitespace-nowrap text-white"
                                    >
                                        <span className="flex items-center gap-1">
                                            {col}
                                            {col !== "Image" && col !== "Actions" && (
                                                <ChevronsUpDown className="h-3 w-3 opacity-70" />
                                            )}
                                        </span>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                                        Loading categories...
                                    </TableCell>
                                </TableRow>
                            ) : error ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-32 text-center text-red-500">
                                        Error: {error}
                                    </TableCell>
                                </TableRow>
                            ) : currentCategories.length > 0 ? (
                                currentCategories.map((c) => (
                                    <TableRow key={c.id} className="transition-colors hover:bg-green-50/50">
                                        <TableCell>{c.id}</TableCell>
                                        <TableCell>
                                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                                                {c.image || c.icon ? (
                                                    <img
                                                        src={
                                                            (() => {
                                                                const imgVal = c.image || c.icon;
                                                                if (imgVal.startsWith('data:')) return imgVal;
                                                                if (imgVal.startsWith('http')) return imgVal;
                                                                return `${apiUrl}${imgVal.startsWith('/') ? '' : '/'}${imgVal}`;
                                                            })()
                                                        }
                                                        alt={c.name || c.title || "Category"}
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
                                        <TableCell className="font-medium text-gray-900">{c.name || c.title}</TableCell>
                                        <TableCell className="text-gray-600">{c.slug || "-"}</TableCell>
                                        <TableCell className="max-w-xs truncate text-gray-600">{c.description || "-"}</TableCell>
                                        <TableCell>
                                            <span className={`rounded-full px-3 py-1 text-xs font-medium text-white ${(c.status || "active") === "active" ? "bg-green-500" : "bg-gray-400"}`}>
                                                {c.status || "active"}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleViewCategory(c)} className="rounded-full bg-green-50 p-2 text-green-600 transition hover:bg-green-600 hover:text-white" title="View">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleEditCategory(c)} className="rounded-full bg-green-50 p-2 text-green-600 transition hover:bg-green-600 hover:text-white" title="Edit">
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDeleteCategory(c)} className="rounded-full bg-red-50 p-2 text-red-500 transition hover:bg-red-500 hover:text-white" title="Delete">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-32 text-center text-gray-500">
                                        No categories found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Responsive Card View (Visible only on small screens) */}
                <div className="block md:hidden divide-y divide-gray-200">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading categories...</div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">Error: {error}</div>
                    ) : currentCategories.length > 0 ? (
                        currentCategories.map((c) => (
                            <div key={c.id} className="p-4 space-y-3 bg-white hover:bg-gray-50/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100 border">
                                            {c.image || c.icon ? (
                                                <img
                                                    src={
                                                        (() => {
                                                            const imgVal = c.image || c.icon;
                                                            if (imgVal.startsWith('data:')) return imgVal;
                                                            if (imgVal.startsWith('http')) return imgVal;
                                                            return `${apiUrl}${imgVal.startsWith('/') ? '' : '/'}${imgVal}`;
                                                        })()
                                                    }
                                                    alt={c.name || c.title || "Category"}
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = "https://placehold.co/150?text=No+Image";
                                                    }}
                                                />
                                            ) : (
                                                <ImageIcon className="h-5 w-5 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{c.name || c.title}</h3>
                                            <p className="text-xs text-gray-500">Slug: {c.slug || "-"}</p>
                                        </div>
                                    </div>
                                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${(c.status || "active") === "active" ? "bg-green-500" : "bg-gray-400"}`}>
                                        {c.status || "active"}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {c.description || "No description provided."}
                                </p>

                                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                    <span className="text-xs text-gray-400">ID: {c.id}</span>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleViewCategory(c)} className="rounded-lg bg-green-50 p-2 text-green-600 hover:bg-green-600 hover:text-white" title="View">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleEditCategory(c)} className="rounded-lg bg-green-50 p-2 text-green-600 hover:bg-green-600 hover:text-white" title="Edit">
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDeleteCategory(c)} className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-500 hover:text-white" title="Delete">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">No categories found.</div>
                    )}
                </div>

                {/* Footer / Pagination */}
                <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 p-4 sm:flex-row sm:p-6">
                    <span className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                        Showing {filteredCategories.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length} entries
                    </span>

                    <div className="flex flex-wrap items-center justify-center gap-1">
                        <button
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={safeCurrentPage === 1}
                            className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-500 transition hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`h-8 w-8 rounded-md text-sm font-medium transition ${safeCurrentPage === page
                                    ? "bg-green-600 text-white"
                                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            disabled={safeCurrentPage === totalPages}
                            className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-500 transition hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Detail Modal */}
            {showDetail && selectedCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm overflow-y-auto" onClick={handleCloseDetail}>
                    <div className="w-full max-w-5xl animate-in fade-in zoom-in-95 duration-300 my-auto" onClick={(e) => e.stopPropagation()}>
                        <CategoryDetailForm category={selectedCategory} onBack={handleCloseDetail} />
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {showEdit && selectedCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm overflow-y-auto" onClick={handleCloseEdit}>
                    <div className="w-full max-w-5xl animate-in fade-in zoom-in-95 duration-300 my-auto" onClick={(e) => e.stopPropagation()}>
                        <CategoryEdit category={selectedCategory} onBack={handleCloseEdit} />
                    </div>
                </div>
            )}
        </div>
    );
}