import { useEffect, useState } from "react";
import {
    BarChart as ReBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function BarChart() {
    const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
    const [data, setData] = useState([]);

    const green = "#10e778";
    const dark = "#262626";
    const legend = [
        { label: "This month", color: green },
        { label: "Prev month", color: dark },
    ];

    useEffect(() => {
        fetch(`${API}/dashboard/sales`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load sales data");
                return res.json();
            })
            .then(setData)
            .catch(console.error);
    }, []);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">Sales Data</h2>

            {/* Responsive wrapper: stacks legend below chart on mobile, side-by-side on larger screens */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="h-[240px] sm:h-[260px] min-w-0 flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <ReBarChart data={data} barGap={-7} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke="#EEF0F3" />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: "#4B5563" }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: "#4B5563" }}
                                tickFormatter={(v) => `$${v.toLocaleString()}`}
                                width={50}
                            />
                            <Tooltip
                                cursor={false}
                                content={({ active, payload }) =>
                                    active && payload?.length ? (
                                        <div className="rounded-md bg-white px-3 py-1.5 shadow-md border border-gray-100">
                                            <p className="text-[10px] text-gray-500">Revenue</p>
                                            <p className="text-sm font-bold text-gray-900">
                                                ${payload[0].payload.thisMonth.toLocaleString()}
                                            </p>
                                        </div>
                                    ) : null
                                }
                            />
                            <Bar dataKey="thisMonth" fill={green} barSize={7} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="prevMonth" fill={dark} barSize={7} radius={[4, 4, 0, 0]} />
                        </ReBarChart>
                    </ResponsiveContainer>
                </div>

                {/* Responsive Legend Layout */}
                <div className="flex flex-row sm:flex-col items-center sm:items-start justify-center gap-4 sm:gap-4 pr-2">
                    {legend.map(({ label, color }) => (
                        <div key={label} className="flex items-center gap-2">
                            <span className="block h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                            <span className="block text-[11px] text-gray-600">{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}