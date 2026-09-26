import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = `${import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api"}/auth`;

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await fetch(`${API_URL}/me`, {
                    method: "GET",
                    credentials: "include", // Ensures cookies are sent with the request
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Failed to fetch current user:", err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, [API_URL]);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);