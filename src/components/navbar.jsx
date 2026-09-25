import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiMenu,
    FiX,
    FiSearch,
    FiUser,
    FiShoppingBag,
} from "react-icons/fi";
import { useCart } from "../context/cartContext";

const Navbar = ({ setCurrentRoute }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { cart } = useCart();

    const totalItems = (cart || []).reduce((sum, item) => {
        return sum + Number(item.quantity || item.qty || 1);
    }, 0);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Shop", path: "/shop" },
        { name: "Contact", path: "/contact" },
        { name: "Certifications", path: "/certifications" },
    ];

    // Navigation Helper Functions
    const openSearch = () => {
        setIsOpen(false);
        setIsSearchOpen(true);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
    };

    const handleAuthClick = () => {
        setIsSearchOpen(false);
        setIsOpen(false);
        navigate("/login");
    };

    const handleCartClick = () => {
        setIsSearchOpen(false);
        setIsOpen(false);
        navigate("/addtocart");
    };

    // Live Search API Call with Debounce
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const delayDebounceFn = setTimeout(async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/search?q=${encodeURIComponent(searchQuery.trim())}`);
                const data = await response.json();

                if (data.success) {
                    setSearchResults(data.products || []);
                }
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            closeSearch();
        }
    };

    const handleSelectProduct = (productId) => {
        navigate(`/product/${productId}`);
        closeSearch();
    };

    return (
        <>
            <nav className="w-full bg-white shadow-sm relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {isSearchOpen ? (
                        <div className="relative flex items-center justify-center h-16 sm:h-20">
                            <div className="w-full max-w-xl flex items-center gap-3 sm:gap-4 relative">
                                <form onSubmit={handleSearchSubmit} className="flex-1 min-w-0">
                                    <div className="relative flex-1">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 text-lg">
                                            <FiSearch />
                                        </span>
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search products..."
                                            className="w-full pl-11 pr-4 py-2.5 text-base bg-gray-50 border-2 border-black rounded-full focus:outline-none"
                                            autoFocus
                                        />
                                    </div>
                                </form>
                                <button
                                    type="button"
                                    onClick={closeSearch}
                                    className="text-gray-500 hover:text-gray-700 transition text-3xl flex-shrink-0"
                                    aria-label="Close search"
                                >
                                    <FiX />
                                </button>

                                {/* Live Search Results Dropdown */}
                                {searchQuery.trim() && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-[60vh] sm:max-h-96 overflow-y-auto z-50">
                                        {isLoading ? (
                                            <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                                        ) : searchResults.length > 0 ? (
                                            <div className="py-2">
                                                {searchResults.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        onClick={() => handleSelectProduct(product.id)}
                                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition"
                                                    >
                                                        <img
                                                            src={product.main_image}
                                                            alt={product.title}
                                                            className="w-10 h-10 object-cover rounded-md border flex-shrink-0"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-800 truncate">{product.title}</p>
                                                            <p className="text-xs text-gray-500">${product.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={handleSearchSubmit}
                                                    className="w-full text-center py-2 text-xs font-semibold text-green-500 hover:bg-green-50 border-t border-gray-100 transition"
                                                >
                                                    View all results for "{searchQuery}"
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-gray-500 text-sm">No products found.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 sm:h-20">
                            {/* Left: mobile menu button + desktop links */}
                            <div className="flex items-center justify-self-start">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="lg:hidden -ml-2 flex items-center justify-center p-2 text-2xl text-gray-700 hover:text-green-500 transition"
                                    aria-label="Toggle menu"
                                    aria-expanded={isOpen}
                                >
                                    {isOpen ? <FiX /> : <FiMenu />}
                                </button>

                                <div className="hidden lg:flex items-center gap-5 xl:gap-8 text-gray-600 text-sm xl:text-base">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className="hover:border-b-2 transition duration-200 whitespace-nowrap"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Center Logo */}
                            <Link to="/" className="flex items-center justify-self-center" onClick={() => setIsOpen(false)}>
                                <img
                                    src="https://niwali.com/cdn/shop/files/Logo-52d55b9c.png?v=1732260211&width=285"
                                    alt="Niwali Logo"
                                    className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                                />
                            </Link>

                            {/* Right Side Icons (search + cart on mobile, account too on desktop) */}
                            <div className="flex items-center justify-end justify-self-end gap-4 sm:gap-5 xl:gap-6 text-xl text-gray-700">
                                <button
                                    type="button"
                                    onClick={openSearch}
                                    aria-label="Search"
                                    className="hover:text-green-500 transition duration-200"
                                >
                                    <FiSearch />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAuthClick}
                                    aria-label="Account"
                                    className="hidden lg:block hover:text-green-500 transition duration-200"
                                >
                                    <FiUser />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCartClick}
                                    aria-label="Shopping bag"
                                    className="relative hover:text-green-500 transition duration-200"
                                >
                                    <FiShoppingBag />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile menu panel */}
                {isOpen && !isSearchOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-md">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="py-3 text-gray-700 border-b border-gray-100 hover:text-green-500 transition"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                type="button"
                                onClick={handleAuthClick}
                                className="flex items-center gap-2 py-3 text-left text-gray-700 hover:text-green-500 transition"
                            >
                                <FiUser />
                                Account
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Backdrop Overlay */}
            {isSearchOpen && (
                <div
                    className="fixed inset-0 top-16 sm:top-20 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
                    onClick={closeSearch}
                />
            )}
        </>
    );
};

export default Navbar;