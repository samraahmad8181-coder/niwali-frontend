import { Button } from "@/components/ui/button";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function CategoryDetailForm({ category, onBack }) {
    const apiUrl = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";

    const getInitialImage = () => {
        const img = category?.image || category?.icon || "";
        if (!img) return "";
        if (img.startsWith("http") || img.startsWith("data:")) return img;
        return `${apiUrl.replace(/\/api$/, "")}${img}`;
    };

    const imageUrl = getInitialImage();

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onBack}
                            className="h-9 w-9 rounded-lg border-gray-200"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Category Details</h1>
                    </div>
                </div>

                {/* Details Content */}
                <div className="p-4 sm:p-6 space-y-6">
                    {/* Image Banner */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                        {/* Fully Rounded Circle Image Container */}
                        <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 shadow-inner">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={category?.name || "Category"}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.target.src = "https://placehold.co/150?text=No+Image"; }}
                                />
                            ) : (
                                <ImageIcon className="h-10 w-10 text-gray-400" />
                            )}
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                {category?.name || category?.title || "Untitled"}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 font-mono">
                                Slug: {category?.slug || "-"}
                            </p>
                            <div className="pt-1">
                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium text-white ${(category?.status || "active") === "active" ? "bg-green-500" : "bg-gray-400"}`}>
                                    {category?.status || "active"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                            <span className="block text-gray-400 font-medium text-xs uppercase tracking-wider">Category ID</span>
                            <span className="text-gray-900 font-semibold mt-1 block">{category?.id}</span>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                            <span className="block text-gray-400 font-medium text-xs uppercase tracking-wider">Created At</span>
                            <span className="text-gray-900 font-semibold mt-1 block">
                                {category?.createdAt ? new Date(category.createdAt).toLocaleDateString() : "N/A"}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-700">Description</h3>
                        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600 border border-gray-100 min-h-[100px]">
                            {category?.description || "No description provided for this category."}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-4 border-t border-gray-200">
                        <Button onClick={onBack} className="bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto">
                            Close Details
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}