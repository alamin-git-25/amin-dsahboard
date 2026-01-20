import { Outlet } from "react-router";

import { useEffect, useState } from "react";
import ApexSidebar from "../components/ui/ApexSideBar";
import ApexTopNavigation from "../components/ui/ApexTopBar";





const SIDEBAR_KEY = 'sidebar-open'
export default function ApexLayout() {
    const [open, setOpen] = useState(() => {
        const saved = localStorage.getItem(SIDEBAR_KEY)
        return saved !== null ? JSON.parse(saved) : true
    })


    useEffect(() => {
        localStorage.setItem(SIDEBAR_KEY, JSON.stringify(open))
    }, [open])
    return (
        <div className="bg-(--bg) fixed w-full min-h-screen">
            <div className="flex">
                <ApexSidebar open={open} />

                <div className=" w-full">
                    <ApexTopNavigation open={open} setOpen={setOpen} />
                    <div className="md:p-2 p-1  h-screen overflow-y-auto custom-scrollbar">
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    );
}
