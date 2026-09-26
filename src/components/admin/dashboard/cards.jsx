import { useEffect, useState } from "react";
import {
    Package,
    List,
    PackageX,
    Clock,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

export default function Cards() {
    const API = import.meta.env.VITE_API_URL || "https://niwali-backend-production.up.railway.app/api";
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    const [stats, setStats] = useState(null);

    const cards = [
        { key: "totalProducts", label: "Total Products", icon: Package, note: "in the last 1 month" },
        { key: "currentOrders", label: "Current Orders", icon: List, note: "vs yesterday" },
        { key: "totalOrders", label: "Total Orders", icon: List, note: "in the last 1 month" },
        { key: "cancelOrders", label: "Cancel Order", icon: PackageX, note: "in the last 1 month" },
        { key: "pendingOrders", label: "Pending Orders", icon: Clock, note: "in the last 1 month" },
    ];

    useEffect(() => {
        fetch(`${API}/dashboard/cards`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load dashboard cards");
                return res.json();
            })
            .then(setStats)
            .catch(console.error);
    }, []);

    return (
        /* Updated grid to scale smoothly up to 5 columns on extra-large screens */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {cards.map(({ key, label, icon: Icon, note }) => {
                const stat = stats?.[key];
                const up = stat?.up ?? true;

                return (
                    <div key={key} className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500">
                                <Icon className="h-4 w-4 text-white" />
                            </span>
                            <span className="text-xs font-medium text-gray-700 truncate">{label}</span>
                        </div>

                        <p className="mt-3 text-[22px] font-bold text-gray-900">
                            {stat ? Number(stat.value).toLocaleString() : "—"}
                        </p>

                        <p className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-gray-400">
                            {up ? (
                                <TrendingUp className="h-3 w-3 shrink-0 text-green-500" />
                            ) : (
                                <TrendingDown className="h-3 w-3 shrink-0 text-red-500" />
                            )}
                            <span className={up ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                                {stat?.change ?? 0}%
                            </span>
                            <span className="truncate">{note}</span>
                        </p>
                    </div>
                );
            })}
        </div>
    );
}