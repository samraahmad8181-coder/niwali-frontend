import React from "react";
import Cards from "@/components/admin/dashboard/cards";
import BarChart from "@/components/admin/dashboard/chart";
import TopSellingProducts from "@/components/admin/dashboard/topsellingproducts";
import LatestOrders from "@/components/admin/dashboard/latestorders";
import BuyerSegmentation from "@/components/admin/dashboard/buyersegmentation";

export default function Dashboard() {
    return (
        <div className="space-y-4 p-4 bg-gray-50">
            <Cards />

            {/* Added md:grid-cols-2 so tablets also get a side-by-side view */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr]">
                <BarChart />
                <TopSellingProducts />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr]">
                <LatestOrders />
                <BuyerSegmentation />
            </div>
        </div>
    );
}