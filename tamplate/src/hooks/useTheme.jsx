
import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";



function getInitialTheme() {
    if (typeof window === "undefined") return "light";

    const stored = localStorage.getItem("theme")
    if (stored) return stored;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function useTheme() {
    const [theme, setTheme] = useState(getInitialTheme);


    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return { theme, toggleTheme };
}

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="
                 transition-colors cursor-pointer"
        >
            {theme === "dark" ? <Sun /> : <MoonStar />}
        </button>
    );
}