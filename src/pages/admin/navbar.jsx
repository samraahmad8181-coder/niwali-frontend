import { Bell, MessageSquare } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles = {
    "/admin": "Health Supplement Dashboard",
    "/admin/products": "Products",
    "/admin/orders": "Orders",
    "/admin/categories": "Categories",
    "/admin/settings": "Settings",
};

export default function AdminNavbar() {
    const location = useLocation();

    const pageTitle =
        pageTitles[location.pathname] || "Health Supplement Dashboard";

    return (
        <nav className="flex items-center justify-between bg-white px-6 shadow-md">

            {/* Dynamic Page Title */}
            <h1 className="text-2xl font-bold text-gray-800">
                {pageTitle}
            </h1>

            {/* Right */}
            <div className="flex items-center gap-6">

                {/* Messages */}
                <button className="text-gray-600 hover:text-green-600 transition">
                    <MessageSquare size={20} />
                </button>

                {/* Notifications */}
                <button className="text-gray-600 hover:text-green-600 transition">
                    <Bell size={20} />
                </button>

                {/* Profile Image */}
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer">
                    <img
                        src="https://cdn.vectorstock.com/i/500p/46/72/cute-cartoon-girl-avatar-black-hair-yellow-shir-vector-58404672.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </nav>
    );
}