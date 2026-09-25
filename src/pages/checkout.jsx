import React, { useEffect } from "react"; // 1. Import useEffect
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import Order from "@/components/order";

const CheckoutPage = () => {

    // 2. Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-h-screen bg-white">

            {/* Checkout Header */}
            <header className="border-b border-gray-200">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8 sm:px-12 lg:px-16">

                    {/* Logo */}

                    <div>
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl sm:text-3xl font-serif font-medium">
                                Niwali
                            </span>
                        </Link>
                    </div>


                    {/* Cart */}
                    <Link
                        to="/addtocart"
                        className="relative rounded-full p-2 transition hover:bg-gray-100"
                    >
                        <ShoppingBag className="h-5 w-5 text-green-500" />
                    </Link>

                </div>
            </header>

            {/* Checkout */}
            <Order />

        </div>
    );
};

export default CheckoutPage;