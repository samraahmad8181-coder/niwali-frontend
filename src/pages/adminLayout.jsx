import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "@/pages/admin/navbar";

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-white dark:bg-[#1E2126]">
                <AppSidebar />

                {/* Added max-w-full and overflow-x-hidden to prevent layout blowout on mobile */}
                <main className="flex min-h-screen flex-1 flex-col w-full max-w-full overflow-x-hidden">
                    {/* Sidebar Trigger with proper dark mode styling and bottom border */}
                    <div className="flex items-center px-4 py-2.5 bg-white dark:bg-[#1E2126] text-black dark:text-white border-b border-gray-100 dark:border-gray-800">
                        <SidebarTrigger />
                    </div>

                    <div className="w-full">
                        <AdminNavbar />
                    </div>

                    {/* Page Content */}
                    <div className="flex-1 w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}