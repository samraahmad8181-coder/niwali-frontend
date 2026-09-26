import { useState, useEffect } from "react";
import { X, Image as ImageIcon, Upload } from "lucide-react";

export default function ProductEdit({ product, onBack, onSuccess }) {
    const apiUrl = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";

    // Removes an entry from thumbnails if it duplicates the main image
    const stripDuplicateMain = (thumbs, main) =>
        Array.isArray(thumbs) ? thumbs.filter((t) => t && t !== main) : [];

    const [formData, setFormData] = useState({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || "",
        original_price: product?.original_price || "",
        sale: product?.sale || false,
        stock: product?.stock || "",
        category_id: product?.category_id || "",
        benefits: product?.benefits || "",
    });

    const [mainImage, setMainImage] = useState(product?.main_image || "");
    const [thumbnailImages, setThumbnailImages] = useState(
        stripDuplicateMain(product?.thumbnail_images, product?.main_image)
    );

    const [mainImageFile, setMainImageFile] = useState(null);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getImageUrl = (imagePath) => {
        if (!imagePath) return "";
        if (imagePath.startsWith("data:") || imagePath.startsWith("http")) return imagePath;
        return `${apiUrl.replace(/\/api$/, "")}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleMainImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const base64 = await convertFileToBase64(file);
            // If the new main image was sitting in thumbnails, drop it from there
            setThumbnailImages((prev) => prev.filter((t) => t !== base64));
            setMainImage(base64);
            setMainImageFile(file);
        } catch (err) {
            console.error("Error processing main image:", err);
        }
    };

    const handleThumbnailsChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        try {
            const newBase64List = [];
            for (const file of files) {
                const base64 = await convertFileToBase64(file);
                newBase64List.push(base64);
            }

            setThumbnailImages((prev) => [...prev, ...newBase64List]);
            setThumbnailFiles((prev) => [...prev, ...files]);
        } catch (err) {
            console.error("Error processing thumbnail images:", err);
        }
    };

    const handleRemoveThumbnail = (indexToRemove) => {
        setThumbnailImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
        setThumbnailFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            let finalMainImage = mainImage;
            if (mainImageFile) {
                finalMainImage = await convertFileToBase64(mainImageFile);
            }

            const finalThumbnails = [];
            for (const img of thumbnailImages) {
                if (img instanceof File) {
                    const base64 = await convertFileToBase64(img);
                    finalThumbnails.push(base64);
                } else {
                    finalThumbnails.push(img);
                }
            }

            // Guarantee no duplicate of the main image ends up in thumbnails on save
            const dedupedThumbnails = finalThumbnails.filter((img) => img !== finalMainImage);

            const productData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                original_price: formData.original_price ? parseFloat(formData.original_price) : null,
                sale: formData.sale === true || formData.sale === 'true',
                stock: parseInt(formData.stock, 10) || 0,
                category_id: parseInt(formData.category_id, 10) || 1,
                main_image: finalMainImage,
                thumbnail_images: dedupedThumbnails,
                benefits: formData.benefits
            };

            const response = await fetch(`${apiUrl}/products/${product.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update product');
            }

            alert('Product updated successfully!');
            if (onSuccess) onSuccess();
            if (onBack) onBack();

        } catch (err) {
            console.error('Error updating product:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-4xl mx-auto">
            <div className="flex items-center justify-between bg-green-600 px-6 py-4 text-white">
                <h2 className="text-lg font-semibold">Edit Product (ID: {product?.id})</h2>
                <button
                    type="button"
                    onClick={onBack}
                    className="p-1 rounded-full hover:bg-green-700 transition"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4 pb-4 border-b">
                    <h3 className="text-sm font-semibold text-gray-900">Product Images</h3>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Main Image (Click to change)</label>
                        <div className="relative flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleMainImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            {mainImage ? (
                                <img
                                    src={getImageUrl(mainImage)}
                                    alt="Main preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="text-center p-2">
                                    <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                                    <span className="text-xs text-gray-500">Upload Main</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Thumbnail Images</label>
                        <div className="flex flex-wrap gap-3 items-center">
                            {thumbnailImages.map((thumb, index) => (
                                <div key={index} className="relative w-20 h-20 border rounded-lg overflow-hidden bg-gray-50 group">
                                    <img
                                        src={getImageUrl(thumb)}
                                        alt={`Thumb ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveThumbnail(index)}
                                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}

                            <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                <Upload className="w-5 h-5 text-gray-400 mb-1" />
                                <span className="text-[10px] text-gray-500">Add More</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleThumbnailsChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
                        <input
                            type="number"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Original Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="original_price"
                            value={formData.original_price}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                        <input
                            type="checkbox"
                            name="sale"
                            id="sale"
                            checked={formData.sale}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="sale" className="text-sm font-medium text-gray-700">On Sale</label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                    <input
                        type="text"
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Update Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}