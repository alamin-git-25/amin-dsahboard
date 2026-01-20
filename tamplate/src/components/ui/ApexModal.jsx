
import { X } from "lucide-react";
import { useEffect } from "react";

/**
 * @typedef {'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full' | 'custom'} Size
 */

/**
 * ApexModal - Modal component with size suggestion
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {() => void} props.onClose - Function to close the modal
 * @param {string} props.title - Modal title
 * @param {React.ReactNode} props.children - Modal content
 * @param {Size} [props.size='md'] - Modal size
 * @param {string} [props.className] - Additional class names
 */
export default function ApexModal({
    open,
    onClose,
    title,
    children,
    size = "md",
    className = "",
}) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);


    if (!open) return null;

    const sizes = {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        xxl: "max-w-5xl",
        full: "max-w-[95%]",
        custom: "",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center "

        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-(--card) transition-transform duration-700  shadow-(--bs) border border-(--border) w-full ${sizes[size]} ${className} animate-in fade-in zoom-in-95`}
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-(--border) bg-(--icon) flex justify-between items-center">
                    <h3 className="font-semibold text-xl text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className=" cursor-pointer text-(--warning) hover:text-(--text) text-lg"
                    >
                        <X />
                    </button>
                </div>

                {/* Body */}
                <div className="p-2 max-h-[75vh] overflow-auto custom-scrollbar">{children}</div>
            </div>
        </div>
    );
}

