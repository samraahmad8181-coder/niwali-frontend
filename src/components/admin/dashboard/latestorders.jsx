import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function LatestOrders() {
    const API = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    const [period, setPeriod] = useState("today");
    const [orders, setOrders] = useState([]);

    const periods = [
        { label: "Today", value: "today" },
        { label: "This Week", value: "this_week" },
        { label: "This Month", value: "this_month" },
    ];
    const statusStyles = {
        Completed: "bg-[#7BC67E]",
        Pending: "bg-[#B0B0B0]",
        Canceled: "bg-[#FF5A1F]",
        Returned: "bg-[#8B5CF6]",
    };

    useEffect(() => {
        fetch(`${API}/dashboard/latest-orders?period=${period}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load latest orders");
                return res.json();
            })
            .then(setOrders)
            .catch(console.error);
    }, [period]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Latest Orders</h2>
                <div className="relative self-start sm:self-auto">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="appearance-none rounded-full bg-green-500 py-1.5 sm:py-2 pl-3 sm:pl-4 pr-8 sm:pr-10 text-xs text-white outline-none"
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
                <table className="w-full text-sm min-w-[450px]">
                    <thead>
                        <tr className="text-left text-gray-900 border-b border-gray-100">
                            <th className="pb-3 text-xs sm:text-sm font-semibold">Customer</th>
                            <th className="pb-3 text-xs sm:text-sm font-semibold">Product</th>
                            <th className="pb-3 text-center text-xs sm:text-sm font-semibold">Qty</th>
                            <th className="pb-3 text-center text-xs sm:text-sm font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-6 text-center text-xs text-gray-400">
                                    No orders in this period
                                </td>
                            </tr>
                        )}
                        {orders.map((o, i) => (
                            <tr key={`${o.order_id}-${i}`} className="border-t border-gray-100">
                                <td className="py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 max-w-[120px] truncate">
                                    {o.customer}
                                </td>
                                <td className="py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 max-w-[140px] truncate">
                                    {o.product}
                                </td>
                                <td className="py-2.5 sm:py-3 text-center text-xs sm:text-sm text-gray-700">
                                    {o.qty} {o.qty === 1 ? "pc" : "pcs"}
                                </td>
                                <td className="py-2.5 sm:py-3 text-center">
                                    <span
                                        className={`inline-block rounded px-2.5 py-0.5 text-[10px] font-medium text-white ${statusStyles[o.status] || "bg-[#B0B0B0]"
                                            }`}
                                    >
                                        {o.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}