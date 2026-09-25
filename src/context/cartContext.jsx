import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem("cart");
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Helper to get consistent ID whether product uses id or _id
    const getItemId = (item) => item?.id || item?._id;

    const addToCart = (product, quantity = 1) => {
        const prodId = getItemId(product);
        if (!prodId) return;

        setCartItems((prev) => {
            const existing = prev.find((item) => getItemId(item) === prodId);
            if (existing) {
                return prev.map((item) =>
                    getItemId(item) === prodId
                        ? { ...item, quantity: Number(item.quantity || 1) + Number(quantity) }
                        : item
                );
            }
            return [...prev, { ...product, id: prodId, quantity: Number(quantity) }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => getItemId(item) !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) => (getItemId(item) === id ? { ...item, quantity: Number(quantity) } : item))
        );
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cart: cartItems, // Aliased so components using `cart` or `cartItems` both work!
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};