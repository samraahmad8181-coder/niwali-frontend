import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CategoryProducts() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";

    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`${apiUrl}/products/category/${categoryId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch products for this category");
                return res.json();
            })
            .then((data) => {
                setProducts(data.data || data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [categoryId, apiUrl]);

    const categoryName = products.length > 0 ? products[0].category_id : "Category";

    if (loading) return <div className="text-center py-12 text-gray-500">Loading products...</div>;
    if (error) return <div className="text-center py-12 text-red-500 font-medium">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Dynamic category title header */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 capitalize">
                {categoryName}
            </h1>

            {products.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No products found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Image Container with Zoom Effect */}
                            <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                                <img
                                    src={product.main_image}
                                    alt={product.title}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Content Container */}
                            <div className="p-5 flex flex-col flex-grow justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-green-700 transition-colors">
                                        {product.title}
                                    </h3>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-bold text-green-700">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                    {product.original_price && product.original_price > product.price && (
                                        <span className="text-sm text-gray-400 line-through">
                                            ${Number(product.original_price).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}