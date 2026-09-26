import { useState } from "react";
import {
    FileText,
    X,
} from "lucide-react";

export default function AddProductForm({ onBack }) {

    // Form state for text inputs
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        original_price: "",
        sale: false,
        stock: "",
        category_id: "",
        benefits: "",
    });

    // Separate states to hold the actual raw File objects for upload
    const [mainImageFile, setMainImageFile] = useState(null);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);

    // For UI previews
    const [previews, setPreviews] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle generic input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle file selection
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newPreviews = files.map((file) => URL.createObjectURL(file));

        // Set the first selected file as main image file if not already set
        if (!mainImageFile && files.length > 0) {
            setMainImageFile(files[0]);
        }

        setThumbnailFiles((prev) => [...prev, ...files]);
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    // Remove uploaded file or preview
    const handleRemoveFile = (indexToRemove) => {
        setPreviews((prev) => {
            const updatedPreviews = prev.filter((_, index) => index !== indexToRemove);
            return updatedPreviews;
        });

        setThumbnailFiles((prev) => {
            const updatedFiles = prev.filter((_, index) => index !== indexToRemove);
            // If we removed the main image file, reset it or pick the next one
            if (indexToRemove === 0) {
                setMainImageFile(updatedFiles[0] || null);
            }
            return updatedFiles;
        });
    };

    // Close form
    const handleClose = () => {
        if (onBack) {
            onBack();
        }
    };

    // Helper to convert a File into a Base64 string for JSON payloads
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Submit form using raw JSON
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Convert files to base64 strings so they can pass safely inside a raw JSON payload
            let mainImageBase64 = "";
            if (mainImageFile) {
                mainImageBase64 = await convertFileToBase64(mainImageFile);
            }

            const thumbnailBase64List = [];
            for (const file of thumbnailFiles) {
                const base64 = await convertFileToBase64(file);
                thumbnailBase64List.push(base64);
            }

            // 1. Prepare your data as a clean JavaScript object matching your JSON backend schema
            const productData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                original_price: formData.original_price ? parseFloat(formData.original_price) : null,
                sale: formData.sale === true || formData.sale === 'true',
                stock: parseInt(formData.stock, 10) || 0,
                category_id: parseInt(formData.category_id, 10),
                main_image: mainImageBase64,
                thumbnail_images: thumbnailBase64List,
                benefits: formData.benefits
            };

            const apiUrl = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";


            const response = await fetch(`${apiUrl}/products`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // 👈 Crucial for raw JSON
                    // 👈 Fixes the 401 Unauthorized error
                },
                body: JSON.stringify(productData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to create product');
            }

            console.log('Product created successfully:', result);
            alert('Product added successfully!');

            if (onBack) {
                onBack();
            }
        } catch (err) {
            console.error('Error submitting product:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="absolute inset-y-0 left-0 w-1 bg-green-600" />

                {/* Form Navbar */}
                <div className="flex items-center justify-between bg-green-600 border-b border-gray-200 px-6 py-2 sm:px-8">
                    <h1 className="text-lg font-semibold text-white">
                        Add Product
                    </h1>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-green-50 hover:text-green-600"
                        title="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form Content */}
                <div className="space-y-6 p-6 sm:p-8">
                    {error && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                            {error}
                        </div>
                    )}

                    {/* Images Section */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Images (Main & Thumbnails) <span className="text-red-500">*</span>
                        </label>

                        {previews.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-6">
                                {previews.map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        <div className="relative">
                                            <img src={item} alt="preview" className="h-10 w-10 rounded object-cover border" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFile(i)}
                                                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700"
                                                title="Remove file"
                                            >
                                                <X className="h-2.5 w-2.5" strokeWidth={3} />
                                            </button>
                                        </div>
                                        <span className="max-w-[80px] truncate text-xs text-gray-500">
                                            {i === 0 ? "Main" : `Thumb ${i}`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="relative rounded-md border border-dashed border-green-300 bg-green-50 py-6 text-center transition hover:bg-green-100/50">
                            <input
                                type="file"
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                                className="absolute inset-0 z-10 cursor-pointer opacity-0"
                                title="Click to browse or drop files"
                            />
                            <p className="text-sm text-gray-600 pointer-events-none">
                                Drop file or{" "}
                                <span className="font-medium text-green-600 hover:text-green-700 underline">
                                    Browse
                                </span>
                            </p>
                            <p className="mt-1 text-xs text-gray-400 pointer-events-none">
                                Format: png, jpg &amp; Max file size: 25 MB
                            </p>
                        </div>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter here"
                            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    {/* Category & Price Row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                required
                                placeholder="Enter category"
                                className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Price ($) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                placeholder="0.00"
                                className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>
                    </div>

                    {/* Original Price & Stock Row */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Original Price ($)
                            </label>
                            <input
                                type="number"
                                name="original_price"
                                value={formData.original_price}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                            />
                        </div>
                    </div>

                    {/* Sale Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="sale"
                            id="sale"
                            checked={formData.sale}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="sale" className="text-sm font-medium text-gray-700">
                            On Sale
                        </label>
                    </div>

                    {/* Benefits */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Benefits (JSON string or comma separated)
                        </label>
                        <input
                            type="text"
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleChange}
                            placeholder='e.g., ["Free Shipping", "100% Cotton"]'
                            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Enter product description..."
                            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Product"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}