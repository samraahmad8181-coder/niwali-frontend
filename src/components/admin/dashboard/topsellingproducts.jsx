import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function TopSellingProducts() {
    const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    const [period, setPeriod] = useState("this_month");
    const [products, setProducts] = useState([]);

    const periods = [
        { label: "This Month", value: "this_month" },
        { label: "Last Month", value: "last_month" },
        { label: "This Year", value: "this_year" },
    ];

    // Relative image paths are resolved against the server root
    const imgUrl = (path) => {
        if (!path) return "";
        if (path.startsWith("data:") || path.startsWith("http")) return path;
        return `${API}${path.startsWith("/") ? "" : "/"}${path}`;
    };

    useEffect(() => {
        fetch(`${API}/dashboard/top-products?period=${period}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load top selling products");
                return res.json();
            })
            .then(setProducts)
            .catch(console.error);
    }, [period]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Top Selling Products</h2>
                <div className="relative self-start sm:self-auto">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="appearance-none rounded-full bg-green-500 py-1.5 sm:py-2 pl-3 sm:pl-4 pr-8 text-xs text-white outline-none"
                    >
                        {periods.map((p) => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white" />
                </div>
            </div>

            {/* Responsive wrapper enabling horizontal scrolling on small screens */}
            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm min-w-[360px]">
                    <thead>
                        <tr className="text-left text-gray-900 border-b border-gray-100">
                            <th className="w-12 pb-3 text-xs sm:text-sm font-semibold">Sr.</th>
                            <th className="pb-3 text-xs sm:text-sm font-semibold">Product</th>
                            <th className="pb-3 text-right text-xs sm:text-sm font-semibold">Item Sold</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={3} className="py-6 text-center text-xs text-gray-400">
                                    No sales in this period
                                </td>
                            </tr>
                        )}
                        {products.map((p, i) => (
                            <tr key={p.id} className="border-t border-gray-100">
                                <td className="py-2.5 sm:py-3 text-xs text-gray-400">{i + 1}</td>
                                <td className="py-2.5 sm:py-3">
                                    <div className="flex items-center gap-2.5">
                                        <img
                                            src={imgUrl(p.img)}
                                            alt={p.name}
                                            className="h-10 w-10 sm:h-12 sm:w-12 rounded bg-gray-100 object-cover shrink-0"
                                        />
                                        <span className="text-xs sm:text-sm text-gray-900 font-medium line-clamp-2 max-w-[180px] sm:max-w-[220px]">
                                            {p.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-2.5 sm:py-3 text-right text-xs sm:text-sm text-gray-700 font-medium">
                                    {p.sold} pcs
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}