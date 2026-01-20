import { BaggageClaim, BookCheckIcon, Boxes, IdCardIcon, IdCardLanyard, Monitor, Package, Puzzle, Shapes, ShieldUser, ShoppingBag, Truck, User, UserCheck } from "lucide-react";

export const menuItems = [
    {
        icon: <Monitor size={18} />,
        name: "Dashboard",
        path: "/",
    },
    {
        icon: <Package size={18} />,
        name: "Products",
        path: "/products",
    },
    {
        icon: <Shapes size={18} />,
        name: "Categories",
        path: "/categories",
    },
    {
        icon: <BookCheckIcon size={18} />,
        name: "Brands",
        path: "/brands",
    },
    {
        icon: <Puzzle size={18} />,
        name: "Attributes",
        path: "/attributes",
    },
    {
        icon: <Boxes size={18} />,
        name: "Inventory",
        path: "/inventory/stock",
    },
    {
        icon: <BaggageClaim size={18} />,
        name: "Purchases",
        path: "/purchase",
    },
    {
        icon: <ShoppingBag size={18} />,
        name: "Sales",
        path: "/sales",
    },
    {
        icon: <IdCardIcon size={18} />,
        name: "CRM",
        submenu: [
            {
                icon: <Truck size={16} />,
                name: "Suppliers",
                path: "/suppliers",
            },
            {
                icon: <User size={16} />,
                name: "Customers",
                path: "/customer",
            },
        ],
    },
    {
        icon: <IdCardIcon size={18} />,
        name: "Roles & Permissions",
        submenu: [
            {
                icon: <ShieldUser size={16} />,
                name: "Roles",
                path: "/roles",
            },
            {
                icon: <UserCheck size={16} />,
                name: "Manage Permissions",
                path: "/manage-permission",
            },
        ],
    },
    {
        icon: <IdCardLanyard size={18} />,
        name: "Employees",
        path: "/employees",
    },
];
