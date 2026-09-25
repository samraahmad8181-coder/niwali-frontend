import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

const PLACEHOLDER_IMAGE = "https://placehold.co/300x400?text=No+Image";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getImageUrl = (imagePath) => {
    if (!imagePath) return PLACEHOLDER_IMAGE;
    if (imagePath.startsWith("http") || imagePath.startsWith("blob:") || imagePath.startsWith("data:")) {
        return imagePath;
    }
    const baseUrl = API_URL.replace(/\/api$/, "");
    return `${baseUrl}/${imagePath.replace(/^\//, "")}`;
};

export default function ShopProducts() {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        fetch(`${API_URL}/products/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch products from server");
                }
                return res.json();
            })
            .then((data) => {
                const productList = Array.isArray(data) ? data : data.products || [];
                if (!ignore) {
                    setProducts(productList);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (!ignore) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => {
            ignore = true;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-gray-500 text-lg">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-20 px-4 text-center">
                <p className="text-red-600 text-lg">Error: {error}</p>
            </div>
        );
    }

    const handleAddToCart = (e, item, imageUrl, title) => {
        e.stopPropagation(); // Don't trigger the card's navigation
        addToCart(
            {
                ...item,
                id: item.id || item._id,
                price: Number(item.price || 0),
                title,
                main_image: imageUrl,
            },
            1
        );
    };

    return (
        <section className="w-full bg-white px-4 sm:px-6 sm:py-16 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-7xl">

                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-7 xl:grid-cols-4">
                    {products.map((item) => {
                        const title = item.name || item.title;
                        const imageUrl = getImageUrl(item.main_image || item.images?.[0]);
                        const displayId = item.id || item._id;

                        return (
                            <article
                                key={displayId}
                                onClick={() => navigate(`/product/${displayId}`)}
                                className="group cursor-pointer"
                            >
                                {/* Taller & Fuller Image Container */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100">

                                    {/* Sale Badge */}
                                    {item.sale && (
                                        <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm">
                                            Sale
                                        </span>
                                    )}

                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                                    />
                                </div>

                                {/* Product Information */}
                                <div className="px-1 pt-4">

                                    {/* Product Title */}
                                    <h2 className="line-clamp-1 text-base font-semibold text-gray-900 transition group-hover:text-blue-600">
                                        {title}
                                    </h2>

                                    {/* Description */}
                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600">
                                        {item.description}
                                    </p>

                                    {/* Price */}
                                    <div className="mt-3 flex items-center gap-2">
                                        {item.sale && item.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ${Number(item.originalPrice).toFixed(2)}
                                            </span>
                                        )}

                                        <span className="text-base font-semibold text-gray-900">
                                            ${Number(item.price || 0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}