import React, { useState, useEffect } from "react";
import ReactDataTable from "react-data-table-component";
import {
    Search,
    Eye,
    Check,
    XCircle,
    Phone,
    Globe,
    Home,
    MapPin,
    Hash,
    Printer,
    X,                  // <-- Add X here
    Image as ImageIcon
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Safe API URL fallback check
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const STATUS_STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="truncate text-sm font-medium text-gray-900">{value || "—"}</p>
        </div>
    </div>
);

const OrderStatusTimeline = ({ status }) => {
    if (status === "Cancelled" || status === "cancel") {
        return (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5">
                <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                <p className="text-sm font-medium text-red-700">
                    This order was cancelled
                </p>
            </div>
        );
    }

    const currentIndex = STATUS_STEPS.findIndex(
        (step) => step.toLowerCase() === (status || "").toLowerCase()
    );

    return (
        <div className="overflow-x-auto py-2">
            <div className="flex min-w-[320px] items-center rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-4 sm:px-5">
                {STATUS_STEPS.map((step, index) => {
                    const isComplete = index <= currentIndex;
                    const isLast = index === STATUS_STEPS.length - 1;

                    return (
                        <div key={step} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
                            <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                                <div
                                    className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors duration-300 ${isComplete
                                        ? "border-emerald-500 bg-emerald-500 text-white"
                                        : "border-gray-300 bg-white text-gray-400"
                                        }`}
                                >
                                    {isComplete ? <Check className="h-3.5 w-3.5" /> : index + 1}
                                </div>
                                <span
                                    className={`whitespace-text text-[10px] sm:text-xs font-medium ${isComplete ? "text-gray-900" : "text-gray-400"
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>
                            {!isLast && (
                                <div
                                    className={`mx-1 sm:mx-2 h-0.5 flex-1 rounded-full transition-colors duration-300 ${index < currentIndex ? "bg-emerald-500" : "bg-gray-200"
                                        }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function OrderListTable() {
    const [orders, setOrders] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const endpoint = `${API_URL}/orders`;
            const res = await fetch(endpoint);

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Server returned ${res.status}: ${errorText || res.statusText}`);
            }

            const data = await res.json();
            const orderData = Array.isArray(data) ? data : (data.orders || data.data || []);

            setOrders(orderData);
            setFiltered(orderData);
        } catch (err) {
            console.error("Failed to load orders:", err);
            setError(err.message || "Failed to fetch orders. Check if backend is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Search Filtering
    useEffect(() => {
        const keyword = search.toLowerCase();
        const result = orders.filter((item) =>
            [
                item.firstname,
                item.lastname,
                item.email,
                item.phone,
                item.city,
                item.country,
                item.track_id,
                String(item.order_id || item.id),
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(keyword))
        );
        setFiltered(result);
    }, [search, orders]);

    const handlePrint = () => {
        if (!selectedOrder) return;

        const productRows = (selectedOrder.products || [])
            .map(
                (p) => `
                <tr>
                    <td>${p.product_name || p.title || ""}</td>
                    <td>${p.quantity}</td>
                    <td>$${Number(p.price).toFixed(2)}</td>
                </tr>`
            )
            .join("");

        const invoiceHtml = `
        <html>
        <head>
            <title>Invoice ${selectedOrder.track_id || ""}</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
                h1 { font-size: 20px; margin-bottom: 4px; }
                .muted { color: #666; font-size: 13px; }
                table { width: 100%; border-collapse: collapse; margin-top: 24px; }
                th, td { text-align: left; padding: 8px; border-bottom: 1px solid #eee; font-size: 13px; }
                .total { text-align: right; font-size: 15px; font-weight: bold; margin-top: 16px; }
                .section { margin-top: 20px; }
            </style>
        </head>
        <body>
            <h1>Invoice</h1>
            <p class="muted">Tracking ID: ${selectedOrder.track_id || "—"}</p>

            <div class="section">
                <strong>${selectedOrder.firstname} ${selectedOrder.lastname}</strong><br/>
                ${selectedOrder.address}${selectedOrder.apartment ? ", " + selectedOrder.apartment : ""}<br/>
                ${selectedOrder.city}, ${selectedOrder.country}<br/>
                ${selectedOrder.phone}<br/>
                ${selectedOrder.email}
            </div>

            <table>
                <thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead>
                <tbody>${productRows}</tbody>
            </table>

            <p class="total">Total: $${Number(selectedOrder.total_amount).toFixed(2)}</p>
        </body>
        </html>
    `;

        const printWindow = window.open("", "_blank");
        printWindow.document.write(invoiceHtml);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    };

    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`${API_URL}/orders/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error("Failed to update order status");
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDetail = (order) => {
        setSelectedOrder(order);
        setDetailOpen(true);
    };

    const columns = [
        {
            name: "No.",
            cell: (row, index) => index + 1,
            width: "70px",
        },
        {
            name: "Order ID",
            selector: (row) => row.order_id || row.id,
            sortable: true,
            width: "110px",
        },
        {
            name: "Track ID",
            selector: (row) => row.track_id,
            sortable: true,
            width: "140px",
        },
        {
            name: "Customer",
            selector: (row) => `${row.firstname || ""} ${row.lastname || ""}`,
            sortable: true,
        },
        {
            name: "Phone",
            selector: (row) => row.phone,
            sortable: true,
        },
        {
            name: "City",
            selector: (row) => row.city,
            sortable: true,
        },
        {
            name: "Payment",
            selector: (row) => (row.cashOnDelivery ? "COD" : "COD"),
            sortable: true,
            width: "100px",
        },
        {
            name: "Amount",
            selector: (row) => Number(row.total_amount || 0),
            sortable: true,
            cell: (row) => `$${Number(row.total_amount || 0).toFixed(2)}`,
            width: "110px",
        },
        {
            name: "Status",
            width: "150px",
            cell: (row) => {
                const currentStatus = row.status || "Pending";
                return (
                    <select
                        value={currentStatus}
                        onChange={(e) => updateStatus(row.order_id || row.id, e.target.value)}
                        className={`rounded-lg border px-2 py-1 text-xs font-medium outline-none ${currentStatus.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : currentStatus.toLowerCase() === "processing"
                                ? "bg-blue-100 text-blue-700"
                                : currentStatus.toLowerCase() === "shipped"
                                    ? "bg-purple-100 text-purple-700"
                                    : currentStatus.toLowerCase() === "delivered" || currentStatus.toLowerCase() === "complete"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                            }`}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                );
            },
        },
        {
            name: "Actions",
            width: "90px",
            cell: (row) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        title="View Order"
                        onClick={() => handleDetail(row)}
                        className="h-8 w-8 rounded-full text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#16a34a",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "14px",
            },
        },
        headCells: {
            style: {
                color: "#ffffff",
            },
        },
        rows: {
            style: {
                minHeight: "58px",
                borderBottom: "1px solid #f1f5f9",
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
            <div className="mx-auto max-w-7xl rounded-xl border bg-white shadow-sm overflow-hidden">
                <div className="border-b p-4 sm:p-6">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Order List</h1>
                </div>

                <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 text-sm"
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 m-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
                        <strong>API Connection Error:</strong> {error}
                    </div>
                )}

                {/* Responsive View: Cards for Mobile, Data Table for Medium Screens and Up */}
                <div className="block md:hidden divide-y divide-gray-100">
                    {loading ? (
                        <div className="p-8 text-center text-sm text-gray-500">Loading orders...</div>
                    ) : filtered.length === 0 ? (
                        <div className="p-8 text-center text-sm text-gray-500">No orders found.</div>
                    ) : (
                        filtered.map((row, index) => {
                            const currentStatus = row.status || "Pending";
                            return (
                                <div key={row.order_id || row.id || index} className="p-4 space-y-3 bg-white">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-gray-500">
                                            #{row.order_id || row.id} ({row.track_id || "No Track ID"})
                                        </span>
                                        <span className="text-xs font-bold text-emerald-600">
                                            ${Number(row.total_amount || 0).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {row.firstname} {row.lastname}
                                            </p>
                                            <p className="text-xs text-gray-500">{row.city} • {row.phone}</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDetail(row)}
                                            className="h-8 gap-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                        >
                                            <Eye className="h-3.5 w-3.5" /> View
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <select
                                            value={currentStatus}
                                            onChange={(e) => updateStatus(row.order_id || row.id, e.target.value)}
                                            className="rounded-lg border px-2 py-1 text-xs font-medium outline-none bg-gray-50"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className="hidden md:block">
                    <ReactDataTable
                        columns={columns}
                        data={filtered}
                        progressPending={loading}
                        pagination
                        responsive
                        highlightOnHover
                        customStyles={customStyles}
                    />
                </div>
            </div>

            {/* Order Details Dialog */}
            <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
                <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-hidden p-0 rounded-2xl shadow-2xl border-none">
                    {/* Header matching ProductDetailForm */}
                    <div className="flex items-center justify-between bg-green-600 px-5 py-3">
                        <div>
                            <DialogTitle className="font-semibold text-white text-base sm:text-lg">
                                Order Details (ID: {selectedOrder?.order_id || selectedOrder?.id || "N/A"})
                            </DialogTitle>
                            <p className="text-xs text-white/90 mt-0.5">
                                Track ID: {selectedOrder?.track_id || "—"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePrint}
                                className="gap-2 bg-white text-green-700 hover:bg-green-50 hover:text-green-800 border-none h-8 text-xs font-medium"
                            >
                                <Printer className="h-4 w-4" />
                                Print Invoice
                            </Button>
                            <button
                                type="button"
                                onClick={() => setDetailOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10 hover:text-white"
                            >
                                {/* <X className="h-5 w-5" /> */}
                            </button>
                        </div>
                    </div>

                    {/* Scrollable Body */}
                    {selectedOrder && (
                        <div className="max-h-[75vh] space-y-5 overflow-y-auto p-5 bg-gray-50/50">
                            {/* Ordered Products */}
                            {selectedOrder.products && selectedOrder.products.length > 0 && (
                                <div className="rounded-xl bg-white shadow-sm border p-4 space-y-3">
                                    <h3 className="font-semibold text-sm sm:text-base text-gray-800">Ordered Products</h3>
                                    {selectedOrder.products.map((product, idx) => (
                                        <div
                                            key={product.product_id || idx}
                                            className="flex items-center gap-3 sm:gap-4 border-b pb-3 last:border-b-0 last:pb-0"
                                        >
                                            <img
                                                src={product.image_url}
                                                alt={product.title}
                                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-xs sm:text-sm text-gray-900 truncate">
                                                    {product.product_name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Qty: {product.quantity}
                                                </p>
                                                <p className="text-green-600 text-xs sm:text-sm font-semibold">
                                                    ${product.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Total Amount */}
                            <div className="flex justify-between items-center bg-white rounded-xl border p-4 shadow-sm">
                                <h2 className="text-sm sm:text-base font-semibold text-gray-800">
                                    Total Amount
                                </h2>
                                <span className="text-base sm:text-lg font-bold text-green-600">
                                    ${selectedOrder.total_amount}
                                </span>
                            </div>

                            {/* Customer Information */}
                            <div className="rounded-xl bg-white shadow-sm border p-4">
                                <div className="flex items-center gap-3 border-b pb-4">
                                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs sm:text-sm font-semibold text-white">
                                        {`${selectedOrder.firstname?.[0] ?? ""}${selectedOrder.lastname?.[0] ?? ""}`.toUpperCase() || "?"}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                                            {selectedOrder.firstname} {selectedOrder.lastname}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">{selectedOrder.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    <InfoRow icon={Phone} label="Phone" value={selectedOrder.phone} />
                                    <InfoRow icon={Globe} label="Country" value={selectedOrder.country} />
                                </div>
                            </div>

                            {/* Order Progression */}
                            <div className="rounded-xl border p-4 bg-white shadow-sm">
                                <h3 className="font-semibold mb-3 text-xs sm:text-sm text-gray-800">
                                    Order Progression
                                </h3>
                                <OrderStatusTimeline status={selectedOrder.status} />
                            </div>

                            {/* Shipping Address */}
                            <div className="rounded-xl border shadow-sm bg-white p-4">
                                <h3 className="font-semibold mb-3 text-xs sm:text-sm text-gray-900">
                                    Shipping Address
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoRow icon={Home} label="Address" value={selectedOrder.address} />
                                    <InfoRow icon={Home} label="Apartment" value={selectedOrder.apartment} />
                                    <InfoRow icon={MapPin} label="City" value={selectedOrder.city} />
                                    <InfoRow icon={Hash} label="Postal Code" value={selectedOrder.postalcode} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Controls matching ProductDetailForm */}
                    <div className="flex items-center justify-end bg-gray-100 px-5 py-3 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => setDetailOpen(false)}
                            className="rounded-full border border-gray-400 px-6 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                        >
                            Close
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}