import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

export default function Cart({ item, isOpen, onClose }) {
    const navigate = useNavigate();
    const { cart } = useCart();

    // Total quantity of all products in cart
    const cartCount = (cart || []).reduce((total, product) => {
        return total + Number(product.quantity || product.qty || 1);
    }, 0);

    if (!isOpen || !item) return null;

    const handleViewCart = () => {
        onClose();
        navigate("/addtocart");
    };

    const handleCheckout = () => {
        onClose();
        navigate("/order");
    };

    return (
        <div className="fixed right-4 top-4 z-50 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-100">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                        ✓
                    </span>

                    <p className="text-sm font-medium text-gray-900">
                        Item added to your cart
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 transition hover:text-gray-700"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>

            {/* Product */}
            <div className="mb-6 flex gap-4">
                <img
                    src={
                        item.main_image ||
                        item.image ||
                        item.imageUrl ||
                        (Array.isArray(item.images)
                            ? item.images[0]
                            : "")
                    }
                    alt={item.title || item.name || "Product"}
                    className="h-24 w-20 rounded-lg object-cover"
                />

                <div>
                    <p className="text-sm font-medium leading-6 text-gray-900">
                        {item.title || item.name || "Product"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        ${Number(item.price || 0).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* View Cart */}
            <button
                type="button"
                onClick={handleViewCart}
                className="mb-3 w-full rounded-full border border-gray-900 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
                View cart ({cartCount})
            </button>

            {/* Checkout */}
            <button
                type="button"
                onClick={handleCheckout}
                className="mb-4 w-full rounded-full bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
                Check out
            </button>

            {/* Continue Shopping */}
            <button
                type="button"
                onClick={onClose}
                className="w-full text-center text-sm font-medium text-gray-900 underline underline-offset-2"
            >
                Continue shopping
            </button>
        </div>
    );
}