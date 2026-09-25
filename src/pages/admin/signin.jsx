import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function AdminGate({ children }) {
    const [admin, setAdmin] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

    // Check session on mount via backend cookie verification
    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await fetch(`${apiUrl}/auth/me`, {
                    method: "GET",
                    credentials: "include" // Sends the HttpOnly cookie automatically
                });

                if (response.ok) {
                    const data = await response.json();
                    setAdmin(data.user || { role: "admin" });
                }
            } catch (err) {
                console.error("Session verification failed:", err);
            } finally {
                setInitializing(false);
            }
        };

        verifySession();
    }, [apiUrl]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("Please enter both email and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
                credentials: "include" // Crucial for receiving the HttpOnly cookie
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            // Token is now securely stored in the browser cookie by the backend!
            setAdmin(data.user || { email: formData.email, role: "admin" });
        } catch (err) {
            setError(err.message || "Invalid seeded admin credentials.");
        } finally {
            setLoading(false);
        }
    };

    if (initializing) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50">
                <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
            </div>
        );
    }

    if (admin) {
        return typeof children === "function" ? children(admin) : children;
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 px-4 py-12">
            <div className="w-full max-w-sm bg-white rounded-xl border border-neutral-200 shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-6">
                    <ShieldCheck className="w-5 h-5 text-emerald-900" />
                    <span className="text-sm font-medium text-neutral-500">Seeded Admin Access</span>
                </div>

                <h1 className="text-xl font-semibold text-neutral-900 mb-1">Sign in to the dashboard</h1>
                <p className="text-sm text-neutral-500 mb-6">Enter your seeded credentials.</p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email address</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-neutral-300 text-sm outline-none focus:border-emerald-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-neutral-300 text-sm outline-none focus:border-emerald-900"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg p-3">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-800 text-white text-sm font-medium py-2.5 rounded-lg transition"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}