import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";

export default function CategoryEdit({ category, onBack, onSuccess }) {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        name: category?.name || category?.title || "",
        slug: category?.slug || "",
        description: category?.description || "",
        status: category?.status || "active",
    });

    const getInitialImage = () => {
        const img = category?.image || category?.icon || "";
        if (!img) return "";
        if (img.startsWith("http") || img.startsWith("data:")) return img;
        return `${apiUrl.replace(/\/api$/, "")}${img}`;
    };

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(getInitialImage());

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");

            let imageBase64 = category?.image || "";
            if (imageFile) {
                imageBase64 = await convertFileToBase64(imageFile);
            }

            const payload = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                status: formData.status,
                image: imageBase64,
            };

            const response = await fetch(`${apiUrl}/categories/${category.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to update category");
            }

            if (onSuccess) onSuccess();
            if (onBack) onBack();
        } catch (err) {
            console.error("Error updating category:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full max-h-screen overflow-y-auto bg-gray-50 p-2 sm:p-4 md:p-6">
            <div className="mx-auto max-w-3xl mb-12 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

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
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Edit Category #{category?.id}
                        </h1>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleUpdate} className="p-4 sm:p-6 space-y-6">
                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category Name *</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                            />
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Slug</label>
                            <Input
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-md border border-gray-200 p-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Category Image</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 flex-shrink-0">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                        onError={(e) => { e.target.src = "https://placehold.co/150?text=No+Image"; }}
                                    />
                                ) : (
                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                )}
                            </div>
                            <label className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 w-full sm:w-auto">
                                <Upload className="h-4 w-4" />
                                Change Image
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
                        <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto">
                            {loading ? "Updating..." : "Update Category"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}