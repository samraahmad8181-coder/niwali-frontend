import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.email || !formData.password) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";
            const endpoint = `${API_URL}/auth/login`;

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.message || "Invalid email or password.");
            }

            if (data.token) {
                localStorage.setItem("authToken", data.token);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
            }

            setSuccess("Logged in successfully. Redirecting...");
            setTimeout(() => navigate("/"), 1200);

        } catch (err) {
            setError(err.message || "Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-neutral-50 px-4 py-12">
            <div className="w-full max-w-md bg-white shadow-sm border border-neutral-200/80 rounded-2xl p-8 sm:p-10">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-1">Log in</h2>
                <p className="text-neutral-500 text-sm mb-6">Enter your details to continue.</p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Email address
                        </label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-neutral-300 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 focus:border-emerald-900 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg p-3">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg p-3">
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{success}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {loading ? "Please wait..." : "Log in"}
                    </button>
                </form>

                <p className="text-sm text-neutral-500 mt-6 text-center">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-emerald-800 hover:text-emerald-900 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}