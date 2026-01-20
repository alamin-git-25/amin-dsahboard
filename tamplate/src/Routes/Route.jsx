import { createBrowserRouter } from "react-router";
import ApexLayout from "../layout/Layout";
import Dashboard from "../Pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: '/', element: <ApexLayout />, children: [
            { path: "/", element: <Dashboard /> }
        ]
    }
])