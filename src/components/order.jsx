import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";

function Order() {
    const [formData, setFormData] = useState({
        email: "",
        country: "Pakistan",
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        postalCode: "",
        phone: "",
        emailOffers: false,
        saveInfo: false,
        smsOffers: false,
        payment: "Cash On Delivery",
        billing: "same"
    });
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (!formData.city) {
            newErrors.city = "Please select city";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^03\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Phone should be like 03XXXXXXXXX";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setSuccessMessage("");
        setServerError("");

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            const body = {
                email: formData.email,
                firstname: formData.firstName,
                lastname: formData.lastName,
                phone: formData.phone,
                country: formData.country,
                city: formData.city,
                address: formData.address,
                apartment: formData.apartment,
                cashOnDelivery: true,
                total_amount: total,
                cartItems: cartItems.map(item => ({
                    product_id: item.id || item._id,
                    quantity: item.quantity,
                })),
            };

            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

            const res = await fetch(
                `${API_URL}/orders/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong.");
            }

            setSuccessMessage("Your order has been placed successfully.");
            clearCart();

            setFormData({
                email: "",
                country: "Pakistan",
                firstName: "",
                lastName: "",
                address: "",
                apartment: "",
                city: "",
                postalCode: "",
                phone: "",
                emailOffers: false,
                saveInfo: false,
                smsOffers: false,
                payment: "Cash On Delivery",
                billing: "same"
            });

            setErrors({});

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            setServerError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const shipping = subtotal > 0 ? 2 : 0;
    const total = subtotal + shipping;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <div className="flex flex-wrap gap-10">
                <div className="flex flex-col flex-[2] min-w-[320px]">
                    <div className="flex flex-wrap items-center gap-3 rounded-md border border-gray-300 bg-gray-100 p-4">
                        <div className="flex h-7 w-7 items-center justify-center">
                            <FiInfo className="text-sm" />
                        </div>
                        <p className="text-sm md:text-base">
                            Free shipping on all paid orders in Pakistan
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Contact</h2>
                            <Link
                                to="/login"
                                className="text-sm text-green-700 border-b border-b-green-700 hover:text-green-800"
                            >
                                Sign In
                            </Link>
                        </div>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}

                        <label className="mt-4 flex cursor-pointer items-center gap-3">
                            <input
                                type="checkbox"
                                name="emailOffers"
                                checked={formData.emailOffers}
                                onChange={handleChange}
                                className="h-4 w-4 accent-green-600"
                            />
                            <span className="text-sm">Email me with news and offers</span>
                        </label>
                    </div>

                    <div className="mt-12">
                        <h2 className="mb-6 text-xl font-semibold">Delivery</h2>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Country / Region
                            </label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                            >
                                <option>Pakistan</option>
                                <option>United Arab Emirates</option>
                                <option>Saudi Arabia</option>
                                <option>United Kingdom</option>
                                <option>Canada</option>
                            </select>
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-5">
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                            />
                            {errors.address && (
                                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                            )}
                        </div>

                        <div className="mt-5">
                            <input
                                type="text"
                                name="apartment"
                                placeholder="Apartment, suite, etc. (optional)"
                                value={formData.apartment}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                            />
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                                >
                                    <option value="">Select City</option>
                                    <option>Lahore</option>
                                    <option>Karachi</option>
                                    <option>Islamabad</option>
                                    <option>Rawalpindi</option>
                                    <option>Faisalabad</option>
                                    <option>Multan</option>
                                    <option>Peshawar</option>
                                </select>
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Postal Code(Optional)"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
                            />
                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                            )}
                        </div>

                        <div className="mt-6 space-y-4">
                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="saveInfo"
                                    checked={formData.saveInfo}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-green-600"
                                />
                                <span className="text-sm">Save this information for next time</span>
                            </label>

                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="smsOffers"
                                    checked={formData.smsOffers}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-green-600"
                                />
                                <span className="text-sm">Text me with news and offers</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="mb-6 text-xl font-semibold">Shipping Method</h2>
                        <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-5">
                            <div className="flex items-center gap-3">
                                <input type="radio" checked readOnly className="h-4 w-4 accent-green-600" />
                                <span className="text-sm md:text-base">Standard Shipping</span>
                            </div>
                            <span className="font-medium">$2.00</span>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-xl font-semibold">Payment</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            All transactions are secure and encrypted.
                        </p>

                        <div className="mt-6 rounded-md border border-green-200 bg-green-50">
                            <label className="flex cursor-pointer items-center justify-between p-5">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="Cash On Delivery"
                                        checked={formData.payment === "Cash On Delivery"}
                                        onChange={handleChange}
                                        className="accent-green-600"
                                    />
                                    <span className="font-medium">Cash On Delivery</span>
                                </div>
                                <span className="rounded bg-gray-100 px-3 py-1 text-xs">COD</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-10">
                        {successMessage && (
                            <div className="mb-5 rounded-md bg-green-100 p-4 text-green-700">
                                {successMessage}
                            </div>
                        )}

                        {serverError && (
                            <div className="mb-5 rounded-md bg-red-100 p-4 text-red-700">
                                {serverError}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full rounded-md py-4 text-white font-medium ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            {loading ? "Placing Order..." : "Pay Now"}
                        </button>
                    </div>
                </div>

                <div className="w-full lg:w-[420px] lg:sticky lg:top-20 lg:h-screen lg:overflow-hidden border-l border-gray-200 bg-gray-100">
                    <div className="flex h-full flex-col">
                        <div className="flex-1 overflow-y-auto px-8 py-8">
                            {cartItems.length === 0 ? (
                                <div className="py-10 text-center text-gray-500">
                                    Your cart is empty.
                                </div>
                            ) : (
                                cartItems.map((item, index) => (
                                    <div
                                        key={`${item.id}-${index}`}
                                        className="flex gap-4 border-b border-gray-100 py-5 last:border-none"
                                    >
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={item.main_image}
                                                alt={item.name}
                                                className="h-28 w-24 rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <h3 className="leading-6">{item.title}</h3>
                                            <p className="mt-1 text-sm text-gray-500">{item.category_id}</p>
                                        </div>
                                        <div className="whitespace-nowrap text-right">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="border-t border-gray-300 bg-gray-100 p-8">
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span className="font-medium text-gray-600">
                                        ${subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-gray-600">
                                        ${shipping.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-6 border-t border-gray-300 pt-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-semibold">Total</span>
                                    <span className="text-xl font-bold text-green-700">
                                        ${total.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;