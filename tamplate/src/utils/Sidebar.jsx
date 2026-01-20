// sidebarRoutes.js
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Settings,
    List,
} from "lucide-react";

export const sidebarRoutes = [
    {
        label: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
    },
    {
        label: "Users",
        icon: Users,
        children: [
            {
                label: "All Users",
                path: "/users",
                icon: List,
            },
            {
                label: "Add User",
                path: "/users/create",
                icon: List,
            },
        ],
    },
    {
        label: "Products",
        icon: ShoppingCart,
        children: [
            {
                label: "All Products",
                path: "/products",
            },
            {
                label: "Categories",
                path: "/products/categories",
            },
        ],
    },
    {
        label: "Settings",
        path: "/settings",
        icon: Settings,
    },
];
