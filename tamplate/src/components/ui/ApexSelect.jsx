import { useState, useRef, useEffect } from "react";
import ApexButton from "./ApexButton";
import { Plus, Loader2, CircleAlert } from "lucide-react";
import { ErrorMessage } from "@hookform/error-message";
import { createPortal } from "react-dom";

const OptionSkeleton = ({ count = 6 }) => (
    <div className="animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="p-1">
                <div className="h-6 w-full bg-(--skeleton)" />
            </div>
        ))}
    </div>
);

export default function ApexSelect({
    label,
    options = [],
    value,
    defaultValue,
    onChange,
    placeholder = "Select...",
    Icon,
    name,
    errors,
    search = "",
    setSearch = () => { },
    optionValue = "value",
    optionLabel = "label",
    showAdd = false,
    modal,
    setModal,
    hasMore = false,
    loadMore,
    loading = false,
    hasSearch = true,   // ← typo fix
}) {
    const [open, setOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState(null);

    const wrapperRef = useRef(null);
    const dropdownRef = useRef(null);

    /* ─── Dropdown Position ───────────────────────────────────────────── */
    useEffect(() => {
        if (!open || !wrapperRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();

        setDropdownStyle({
            top: rect.bottom + window.scrollY + 2,
            left: rect.left + window.scrollX,
            width: rect.width,
        });
    }, [open, options.length]);

    /* ─── Outside Click Close ─────────────────────────────────────────── */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
                setSearch("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [setSearch]);

    /* ─── Selected Value ──────────────────────────────────────────────── */
    const selected = options?.find(
        (o) => String(o[optionValue]) === String(value)
    );

    const handleSelect = (o) => {
        onChange?.(o[optionValue]);
        setOpen(false);
        setSearch("");
    };

    return (
        <div className="mb-2 relative" ref={wrapperRef}>
            {label && (
                <label className="block text-md mb-0.5 text-(--text)">
                    {label}
                </label>
            )}

            {/* ─── Select Box ─────────────────────────────────────────────── */}
            <div className="flex w-full gap-1">
                <div
                    onClick={() => !loading && setOpen((p) => !p)}
                    className={`
            border border-(--border)
            h-9 cursor-pointer
            inset-shadow-sm w-full
            flex items-center relative
            ${loading ? "opacity-70 cursor-not-allowed" : ""}
          `}
                >
                    <span className="w-10 h-full bg-(--icon) text-white flex items-center justify-center absolute">
                        {loading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            Icon && <Icon size={18} />
                        )}
                    </span>

                    <span className="pl-12 text-sm flex-1 truncate">
                        {loading
                            ? "Loading..."
                            : selected?.[optionLabel] ||
                            defaultValue ||
                            placeholder}
                    </span>

                    {value && !loading && (
                        <span
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(null);
                            }}
                            className="px-2 text-(--muted) hover:text-(--text)"
                        >
                            ✕
                        </span>
                    )}
                </div>

                {showAdd && (
                    <ApexButton
                        action={() => setModal?.(!modal)}
                        size="xs"
                        variant="success"
                        Icon={Plus}
                        disabled={loading}
                    />
                )}
            </div>

            {/* ─── Error ───────────────────────────────────────────────────── */}
            {errors?.[name] && (
                <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }) => (
                        <p className="text-red-400 flex justify-start items-center gap-1 mt-1 text-sm transition-opacity duration-300 ease-in-out">
                            <CircleAlert size={16} />  {message === "Required" ? "This field is required" : message}
                        </p>
                    )}
                />
            )}

            {/* ─── Dropdown Portal ─────────────────────────────────────────── */}
            {open &&
                dropdownStyle &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        style={dropdownStyle}
                        className="absolute z-50 bg-(--card) border border-(--border) shadow-(--bs)"
                    >
                        {/* Search */}
                        {hasSearch && (
                            <div className="p-1 border-b border-(--border)">
                                <input
                                    autoFocus
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full px-2 py-1.5 inset-shadow-sm outline-0 text-sm border border-(--border)"
                                />
                            </div>
                        )}

                        {/* Options */}
                        <div className="max-h-48 overflow-auto custom-scrollbar">
                            {loading && <OptionSkeleton />}

                            {!loading && options.length === 0 && (
                                <div className="p-3 text-sm text-(--muted)">
                                    No data found
                                </div>
                            )}

                            {!loading &&
                                options.map((o) => (
                                    <div
                                        key={o[optionValue]}
                                        onClick={() => handleSelect(o)}
                                        className={`
                      px-2 py-2 text-sm cursor-pointer
                      hover:bg-(--hover)
                      ${String(value) ===
                                                String(o[optionValue])
                                                ? "bg-(--hover)"
                                                : ""
                                            }
                    `}
                                    >
                                        {o[optionLabel]}
                                    </div>
                                ))}
                        </div>

                        {/* Load more */}
                        {hasMore && !loading && (
                            <div className="border-t border-(--border) flex justify-center p-1">
                                <ApexButton
                                    action={loadMore}
                                    size="md"
                                    loading={loading}
                                >
                                    Load More
                                </ApexButton>
                            </div>
                        )}
                    </div>,
                    document.body
                )}
        </div>
    );
}
