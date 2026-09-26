import { X, Image as ImageIcon } from "lucide-react";

export default function ProductDetailForm({ product, onBack }) {
    const apiUrl = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";

    if (!product) return null;

    const title = product.title || "";
    const rating = product.rating?.toString() || "4.5";
    const orders = product.orders?.toString() || "56";
    const brand = product.brand || "store";
    const category = product.category || product.category_id || "";
    const stock = product.stock?.toString() || "0";
    const price = product.price?.toString() || "0";
    const wholeSalePrice = product.wholeSalePrice?.toString() || "0";
    const description = product.description || "";
    const mainImage = product.main_image || "";

    const thumbnailImages = Array.isArray(product.thumbnail_images)
        ? product.thumbnail_images.filter((t) => t && t !== mainImage)
        : [];

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        if (imagePath.startsWith("http") || imagePath.startsWith("blob:") || imagePath.startsWith("data:")) {
            return imagePath;
        }
        const baseUrl = apiUrl.replace(/\/api$/, "");
        return `${baseUrl}/${imagePath.replace(/^\//, "")}`;
    };

    const handleClose = () => {
        if (onBack) onBack();
    };

    return (
        <div className="w-full">
            <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between bg-green-600 px-4 py-3">
                    <h2 className="font-semibold text-white">
                        View Product (ID: {product.id || "N/A"})
                    </h2>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="max-h-[75vh] space-y-5 overflow-y-auto p-5">
                    {/* Main Image View */}
                    <div>
                        <span className="mb-2 block text-sm font-medium text-gray-700">
                            Main Image
                        </span>
                        <div className="relative flex h-40 w-40 flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-md bg-gray-100 border-2 border-green-600 shadow-sm">
                            {mainImage ? (
                                <img
                                    src={getImageUrl(mainImage)}
                                    alt="Main preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-green-600">
                                    <ImageIcon className="h-8 w-8" />
                                    <span className="text-xs font-semibold mt-1">No Image</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Thumbnail Images View */}
                    <div>
                        <span className="mb-2 block text-sm font-medium text-gray-700">
                            Thumbnail Images
                        </span>
                        <div className="flex flex-wrap items-center gap-3">
                            {thumbnailImages.length > 0 ? (
                                thumbnailImages.map((imgUrl, i) => (
                                    <div
                                        key={i}
                                        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 border border-gray-300"
                                    >
                                        <img
                                            src={getImageUrl(imgUrl)}
                                            alt={`Thumb ${i + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic">No thumbnail images available.</p>
                            )}
                        </div>
                    </div>

                    {/* Read-Only Title */}
                    <div>
                        <span className="mb-1 block text-sm font-medium text-gray-700">Title</span>
                        <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                            {title || "N/A"}
                        </div>
                    </div>

                    {/* Rating & Orders */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="mb-1 block text-sm font-medium text-gray-700">Rating</span>
                            <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                                {rating}
                            </div>
                        </div>
                        <div>
                            <span className="mb-1 block text-sm font-medium text-gray-700">Orders</span>
                            <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                                {orders}
                            </div>
                        </div>
                    </div>

                    {/* Brand & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="mb-1 block text-sm font-medium text-gray-700">Brand</span>
                            <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                                {brand}
                            </div>
                        </div>
                        <div>
                            <span className="mb-1 block text-sm font-medium text-gray-700">Category</span>
                            <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                                {category || "N/A"}
                            </div>
                        </div>
                    </div>

                    {/* Stock & Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="mb-1 block text-sm font-medium text-gray-700">Stock</span>
                            <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                                {stock}
                            </div>
                        </div>
                        <div>
                            <span className="mb-1 block text-sm font-medium text-gray-700">Price</span>
                            <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800">
                                ${Number(price).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <span className="mb-1 block text-sm font-medium text-gray-700">Description</span>
                        <div className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 min-h-[96px] whitespace-pre-wrap">
                            {description || "No description provided."}
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-end bg-gray-100 px-5 py-3 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full border border-gray-400 px-6 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}