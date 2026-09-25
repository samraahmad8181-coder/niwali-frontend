import {
    LayoutDashboard,
    Package,
    ListOrdered,
    Tags,
    Settings,
    Store,
} from "lucide-react"

import { Link, useLocation } from "react-router-dom"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { title: "Products", icon: Package, path: "/admin/products" },
    { title: "Orders", icon: ListOrdered, path: "/admin/orders" },
    { title: "Categories", icon: Tags, path: "/admin/categories" },
    { title: "Setting", icon: Settings, path: "/admin/settings" },
]

export function AppSidebar() {
    const location = useLocation();
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <Sidebar
            className="border-0 bg-white dark:bg-[#1E2126] transition-all duration-300 px-3 sm:px-6 py-4 sm:py-6"
            collapsible="icon"
        >
            {/* Green Sidebar Container */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-tr-[36px] sm:rounded-br-[36px] bg-green-600 py-4 sm:py-6 text-white shadow-lg">

                {/* Logo */}
                <SidebarHeader className="px-4 sm:px-6 pb-6 sm:pb-8 pt-2">
                    <div className={`flex h-12 sm:h-14 items-center justify-center rounded-2xl bg-white px-3 sm:px-4 transition-all ${isCollapsed ? "px-1" : ""}`}>
                        <img
                            src="https://niwali.com/cdn/shop/files/Logo-52d55b9c.png?v=1732260211&width=285"
                            alt="Niwali Logo"
                            className="h-6 sm:h-8 w-auto object-contain"
                        />
                    </div>
                </SidebarHeader>

                {/* Navigation */}
                <SidebarContent className="px-0">
                    <SidebarMenu className="gap-1">
                        {menuItems.map((item) => {
                            const isActive =
                                item.path === "/admin"
                                    ? location.pathname === "/admin"
                                    : location.pathname.startsWith(item.path);

                            return (
                                <SidebarMenuItem
                                    key={item.title}
                                    className="relative w-full"
                                >
                                    <SidebarMenuButton
                                        asChild
                                        className="h-auto w-full p-0 hover:bg-transparent"
                                    >
                                        <Link
                                            to={item.path}
                                            className={`
                                                group relative flex h-11 sm:h-12 w-full
                                                items-center gap-3
                                                px-4 sm:px-6 text-sm font-medium
                                                transition-all duration-200
                                                ${isActive
                                                    ? "ml-2 sm:ml-4 w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] rounded-l-full bg-white text-green-600 shadow-sm"
                                                    : "rounded-none text-white/90 hover:bg-white/10 hover:text-white"
                                                }
                                            `}
                                        >
                                            {/* Active top curve */}
                                            {isActive && (
                                                <div
                                                    className="
                                                        absolute -right-0 -top-4
                                                        h-4 w-4
                                                        bg-white
                                                        [mask-image:radial-gradient(circle_at_0_0,transparent_16px,black_16px)]
                                                    "
                                                />
                                            )}

                                            {/* Icon */}
                                            <item.icon
                                                className={`
                                                    h-5 w-5 shrink-0
                                                    transition-colors
                                                    ${isActive
                                                        ? "text-green-600"
                                                        : "text-white/90 group-hover:text-white"
                                                    }
                                                `}
                                            />

                                            {/* Title */}
                                            <span className="whitespace-nowrap">
                                                {item.title}
                                            </span>

                                            {/* Active bottom curve */}
                                            {isActive && (
                                                <div
                                                    className="
                                                        absolute -bottom-4
                                                        right-0
                                                        h-4 w-4
                                                        bg-white
                                                        [mask-image:radial-gradient(circle_at_0_0,transparent_16px,black_16px)]
                                                    "
                                                />
                                            )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarContent>

                {/* Footer */}
                <SidebarFooter className="mt-auto px-4 sm:px-6 pt-4">
                    <SidebarMenu>
                        <SidebarMenuItem className="w-full">
                            <SidebarMenuButton
                                asChild
                                className="h-auto w-full p-0 hover:bg-transparent"
                            >
                                <Link
                                    to="/"
                                    className="
                                        flex h-11 sm:h-12 w-full
                                        items-center gap-3
                                        rounded-xl px-3 sm:px-4
                                        text-sm font-medium
                                        text-white/90
                                        transition-all duration-200
                                        hover:bg-white/10
                                        hover:text-white
                                    "
                                >
                                    <Store className="h-5 w-5 shrink-0" />
                                    <span>Visit Store</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>

            </div>
        </Sidebar>
    );
}