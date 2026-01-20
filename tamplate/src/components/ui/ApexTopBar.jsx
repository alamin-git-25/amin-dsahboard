import { ExpandIcon, ShrinkIcon, TextAlignStart } from 'lucide-react'
import React from 'react'
import ThemeToggle from '../../hooks/useTheme'
import { useState } from 'react';
import { toggleFullScreen } from '../../utils/fullScreen';
import { useEffect } from 'react';

export default function ApexTopBar({ open, setOpen }) {
    const [isFullscreen, setIsFullscreen] = useState(false);


    const handleFullScreen = () => {
        toggleFullScreen();
        setIsFullscreen((prev) => !prev);
    };


    useEffect(() => {
        const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", handleChange);
        return () => document.removeEventListener("fullscreenchange", handleChange);
    }, []);
    return (
        <header>
            <nav className='h-14 shadow-(--bs) border-b border-(--border) px-5 w-full bg-(--card) flex justify-between items-center'>
                <TextAlignStart onClick={() => setOpen(!open)} className='cursor-pointer' />
                <div className='flex justify-center items-center gap-10'>
                    <button onClick={handleFullScreen} className="cursor-pointer">
                        {
                            isFullscreen ? <ShrinkIcon size={20} /> : <ExpandIcon size={20} />
                        }
                    </button>
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}
