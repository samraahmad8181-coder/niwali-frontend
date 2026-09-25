import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import Cart from "./Cart";

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

export default function ProductGrid() {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartPopup, setCartPopup] = useState({ isOpen: false, item: null });

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
                <p className="text-gray-500 text-lg">Loading hot selling products...</p>
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

    // Only get the last 4 products safely
    const hotSellingProducts = Array.isArray(products) ? products.slice(-4) : [];

    const handleAddToCart = (e, item, imageUrl, title) => {
        e.stopPropagation(); // don't trigger the card's navigate
        const cartItem = {
            ...item,
            id: item.id || item._id,
            price: Number(item.price || 0),
            title,
            main_image: imageUrl,
        };
        addToCart(cartItem, 1);
        setCartPopup({ isOpen: true, item: cartItem });
    };

    return (
        <section className="w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-12">
            {/* Heading */}
            <h1 className="mb-8 text-xl font-medium tracking-tight text-gray-900 sm:text-3xl">
                Hot Selling Products
            </h1>

            {/* Products */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                {hotSellingProducts.map((item) => {
                    const title = item.name || item.title;
                    const imageUrl = getImageUrl(item.main_image);

                    return (
                        <div
                            key={item.id}
                            onClick={() => navigate(`/product/${item.id}`)}
                            className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
                                {/* Sale Badge */}
                                {item.sale && (
                                    <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-900 shadow">
                                        Sale
                                    </span>
                                )}

                                <img
                                    src={imageUrl}
                                    alt={title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Product Information */}
                            <div className="p-4 sm:p-5">
                                {/* Product Title */}
                                <h2 className="line-clamp-2 text-base font-semibold text-gray-900 transition group-hover:text-green-600">
                                    {title}
                                </h2>

                                {/* Description */}
                                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                                    {item.description}
                                </p>

                                {/* Price */}
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    {item.sale && item.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            ${Number(item.originalPrice).toFixed(2)}
                                        </span>
                                    )}

                                    <span className="text-lg font-bold text-gray-900">
                                        $
                                        {Number(
                                            item.sale && item.originalPrice
                                                ? item.originalPrice
                                                : item.price
                                        ).toFixed(2)}
                                    </span>
                                </div>

                                {/* Add to cart Product */}
                                <button
                                    type="button"
                                    onClick={(e) => handleAddToCart(e, item, imageUrl, title)}
                                    className="mt-4 w-full rounded-lg border border-green-600 py-2.5 text-sm font-medium text-green-700 transition duration-200 hover:bg-green-600 hover:text-white"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Cart
                item={cartPopup.item}
                isOpen={cartPopup.isOpen}
                onClose={() => setCartPopup({ isOpen: false, item: null })}
            />
        </section>
    );
}