import React, { useEffect } from "react"; // 1. Import useEffect
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/cartContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Helper to safely check URL schemes
const imagepathStringCheck = (path) => {
    if (typeof path !== "string") return false;
    return path.startsWith("http://") ||
        path.startsWith("https://") ||
        path.startsWith("blob:") ||
        path.startsWith("data:");
};

const getImageUrl = (imagePath) => {
    if (!imagePath) return "";

    // If it's already an absolute URL, blob, or data URI, return as-is
    if (imagepathStringCheck(imagePath)) {
        return imagePath;
    }

    // Clean up base URL by removing trailing /api if present, and combine cleanly with path
    const baseUrl = API_URL.replace(/\/api\/?$/, "");
    const cleanPath = imagePath.replace(/^\/+/, "");
    return `${baseUrl}/${cleanPath}`;
};

export default function AddToCart() {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    // 2. Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Calculate Total correctly using item price * quantity
    const total = (cart || []).reduce((acc, item) => {
        const price = Number(item.price || 0);
        const qty = Number(item.quantity || item.qty || 1);
        return acc + price * qty;
    }, 0);

    if (!cart || cart.length === 0) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-16 text-center">
                <h2 className="text-3xl font-normal text-gray-900 mb-4">Your cart</h2>
                <p className="text-gray-500 mb-8">Your cart is currently empty.</p>
                <Link
                    to="/"
                    className="inline-block rounded-lg bg-green-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                    Continue shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6">
                <h1 className="text-3xl font-normal text-gray-900">Your cart</h1>
                <Link
                    to="/"
                    className="text-lg font-medium text-green-700 underline underline-offset-4 hover:text-green-900"
                >
                    Continue shopping
                </Link>
            </div>

            {/* Table Column Headers (desktop only) */}
            <div className="hidden md:grid grid-cols-12 text-xs font-semibold uppercase tracking-wider text-gray-400 pb-3 border-b border-gray-200">
                <div className="col-span-6">Product</div>
                <div className="col-span-4 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-200">
                {cart.map((item) => {
                    const rawImage = item.main_image || item.image || item.imageUrl || (Array.isArray(item.images) ? item.images[0] : null);
                    const itemImage = getImageUrl(rawImage);
                    const itemTitle = item.title || item.name || "Product";
                    const itemPrice = Number(item.price || 0);
                    const itemQty = Number(item.quantity || item.qty || 1);
                    const itemTotal = itemPrice * itemQty;
                    const itemId = item.id || item._id;

                    return (
                        <div key={itemId} className="py-6 flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-4">
                            {/* Product Info & Image */}
                            <div className="w-full md:col-span-6 flex items-center gap-4">
                                <div className="h-32 w-24 flex-shrink-0  rounded-xl border border-gray-200  flex items-center justify-center">
                                    {itemImage ? (
                                        <img
                                            src={itemImage}
                                            alt={itemTitle}
                                            className="h-full w-full object-contain rounded-xl overflow-hidden"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400">No image</span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 hover:text-green-700 transition">
                                        <Link to={`/product/${itemId}`}>{itemTitle}</Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">${itemPrice.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Quantity Controls & Delete */}
                            <div className="w-full md:col-span-4 flex items-center justify-between md:justify-center gap-4 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                                <div className="inline-flex items-center overflow-hidden rounded-full border border-gray-300">
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(itemId, itemQty - 1)}
                                        className="flex h-9 w-9 items-center justify-center text-base text-gray-600 transition hover:bg-gray-100"
                                    >
                                        −
                                    </button>
                                    <span className="flex h-9 w-10 items-center justify-center text-sm font-medium text-gray-900">
                                        {itemQty}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => updateQuantity(itemId, itemQty + 1)}
                                        className="flex h-9 w-9 items-center justify-center text-base text-gray-600 transition hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeFromCart(itemId)}
                                    className="text-gray-400 hover:text-red-600 transition p-1"
                                    title="Remove item"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Total Price */}
                            <div className="w-full md:col-span-2 flex justify-between md:justify-end text-sm font-semibold text-gray-900 pt-2 md:pt-0">
                                <span className="inline md:hidden text-gray-500 font-normal">Subtotal:</span>
                                <span>${itemTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Checkout & Summary Section */}
            <div className="mt-10 border-t border-gray-200 pt-8 flex flex-col items-end">
                <div className="w-full max-w-sm space-y-3 text-right">
                    <div className="flex justify-between text-base font-normal text-gray-600">
                        <span>Estimated total</span>
                        <span className="text-xl font-semibold text-gray-900">${total.toFixed(2)} USD</span>
                    </div>

                    <p className="text-xs text-gray-500 text-left md:text-right">
                        Taxes, discounts and <Link to="/shipping-policy" className="underline hover:text-gray-800">shipping</Link> calculated at checkout.
                    </p>

                    <div className="pt-4 space-y-3">
                        <button
                            onClick={() => navigate("/order")}
                            type="button"
                            className="w-full rounded-lg bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600"
                        >
                            Check out
                        </button>

                        {/* Express Checkout Badges */}
                        {/* <div className="grid grid-cols-3 gap-2 pt-1">
                            <div className="flex h-10 items-center justify-center rounded-md bg-[#5a31f4] text-white font-bold text-xs tracking-wider cursor-pointer shadow-xs">
                                shop
                            </div>
                            <div className="flex h-10 items-center justify-center rounded-md bg-[#ffc439] text-black font-semibold text-xs cursor-pointer shadow-xs">
                                PayPal
                            </div>
                            <div className="flex h-10 items-center justify-center rounded-md bg-black text-white font-semibold text-xs cursor-pointer shadow-xs">
                                G Pay
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}