
import { ChevronDown, CloudDownload, Search, } from 'lucide-react';
import React, { useEffect, useState } from 'react';


import { NavLink, useLocation } from 'react-router';
import { menuItems } from '../../utils/sidebar.config';

export default function ApexSidebar({ open }) {
    const [openMenu, setOpenMenu] = useState(null);
    const [search, setSearch] = useState('')
    const location = useLocation();




    const toggleSubmenu = (name) => {
        setOpenMenu((prev) => (prev === name ? null : name));
    };

    const isActiveMenu = (item) => {

        if (item.path === location.pathname) return true;

        if (item.submenu) {
            return item.submenu.some((sub) => sub.path === location.pathname);
        }
        return false;
    };
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const filteredMenuItems = menuItems
        .map((item) => {
            if (!search) return item

            const query = search.toLowerCase()
            const matchMain = item.name.toLowerCase().includes(query)

            if (item.submenu) {
                const filteredSub = item.submenu.filter((sub) =>
                    sub.name.toLowerCase().includes(query)
                )

                if (matchMain || filteredSub.length > 0) {
                    return { ...item, submenu: filteredSub }
                }
                return null
            }

            return matchMain ? item : null
        })
        .filter(Boolean)

    const isSearching = search.length > 0
    useEffect(() => {

        const checkInstalled = () => {
            if (window.matchMedia("(display-mode: standalone)").matches) {
                setTimeout(() => setIsInstalled(true), 0);
            }
        };
        checkInstalled();


        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);


        const handleAppInstalled = () => {
            setIsInstalled(true);
        };
        window.addEventListener("appinstalled", handleAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
            setDeferredPrompt(null);
            setIsInstalled(true);
        }
    };


    return (

        <nav className="">
            <aside
                className={`transition-[width]  duration-300 shadow-(--bs) overflow-hidden ${open ? 'w-60 border-r border-(--border)' : 'w-0'
                    }   flex flex-col justify-between h-screen bg-(--card)`}
            >

                <span className={`h-14 flex items-center px-4 border-b text-nowrap border-(--border) text-lg font-semibold ${!open && "hidden"}`}>
                    IMS
                </span>
                {open && (
                    <div className="p-1 relative border-b border-(--border)">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={'Search...'}
                            className="w-full px-3 pr-10 py-2 text-sm
               bg-(--card) inset-shadow-sm border border-(--border)

               focus:outline-none focus:ring-1 focus:ring-(--primary)"
                        />

                        <Search
                            size={16}
                            className="absolute right-3 top-1/2 -translate-y-1/2
               text-(--muted)
               pointer-events-none"
                        />
                    </div>

                )}
                <ul className="mt-1 flex-1 gap-0 flex flex-col  overflow-y-auto">
                    {filteredMenuItems.map((item) => (
                        <li key={item.name} className="relative ">
                            {item.submenu ? (
                                <>
                                    <div
                                        onClick={() => toggleSubmenu(item.name)}
                                        className={`relative flex  items-center gap-3 px-4 py-2 cursor-pointer
                    transition-colors hover:bg-(--hover)
                    ${openMenu === item.name || isActiveMenu(item)
                                                ? 'bg-(--hover) font-medium'
                                                : ''}`}
                                    >
                                        {(openMenu === item.name || isActiveMenu(item)) && (
                                            <span className="absolute left-0 top-0 bottom-0 w-1 bg-(--primary)" />
                                        )}
                                        <span className="text-lg">{item.icon}</span>
                                        {open && <span>{item.name}</span>}
                                        {open && (
                                            <span
                                                className={`ml-auto transition-transform duration-300
                        ${openMenu === item.name ? 'rotate-180' : ''}`}
                                            >
                                                <ChevronDown size={18} />
                                            </span>
                                        )}
                                    </div>

                                    {/* Submenu */}
                                    <ul
                                        className={`overflow-hidden inset-shadow-2xs transition-[max-height] duration-500
                    ${openMenu === item.name || isSearching ? 'max-h-40' : 'max-h-0'}`}
                                    >
                                        {item.submenu.map((sub) => (
                                            <NavLink
                                                key={sub.name}
                                                to={sub.path}
                                                onClick={() => setSearch('')}
                                                className={({ isActive }) =>
                                                    `relative flex  items-center gap-3 px-4 py-2 text-sm transition-colors
        hover:bg-(--hover)
        ${isActive ? 'border-l-4 bg-(--hover) border-(--primary) ' : 'border-l-4 border-transparent'}`
                                                }
                                            >
                                                {/* Submenu Icon */}
                                                <span className="text-base opacity-80">
                                                    {sub.icon}
                                                </span>

                                                {/* Submenu Text */}
                                                <span>{sub.name}</span>
                                            </NavLink>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <NavLink
                                    to={item.path}
                                    onClick={() => {
                                        setOpenMenu(null)
                                        setSearch('')
                                    }}
                                    className={({ isActive }) =>
                                        `relative  flex items-center  gap-3 px-4 py-2 transition-colors
                    hover:bg-(--hover)
                    ${isActive ? 'bg-(--hover) font-medium' : ''}`
                                    }
                                >
                                    {location.pathname === item.path && (
                                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-(--primary)" />
                                    )}
                                    <span className="text-lg">{item.icon}</span>
                                    {open && <span>{item.name}</span>}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Bottom Install App */}
                {!isInstalled && deferredPrompt && (<div className='shrink-0 w-full'>
                    <button
                        onClick={handleInstallClick}
                        className="w-full flex whitespace-nowrap justify-center items-center gap-3 px-4 py-2  text-white font-semibold cursor-pointer bg-(--primary) transition-colors"
                    >
                        <CloudDownload />  <p>Install App</p>
                    </button>
                </div>)}

            </aside>
        </nav>

    );
}

