import { CalendarRange, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const format = (d) =>
    d.toISOString().split("T")[0];   // internal value (YYYY-MM-DD)



export default function ApexDatePicker({
    label,
    value,
    onChange,
}) {
    const formattedDate = value
        ? new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
            .format(new Date(value))
            .replace(/ /g, "-")
        : "";

    const [open, setOpen] = useState(false);
    const [view, setView] = useState(
        value ? new Date(value) : new Date()
    );
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

    const wrapperRef = useRef(null);
    const dropdownRef = useRef(null);


    useEffect(() => {
        const h = (e) =>
            !wrapperRef.current?.contains(e.target) &&
            !dropdownRef.current?.contains(e.target) &&
            setOpen(false);

        document.addEventListener("mousedown", h);
        return () => document.removeEventListener("mousedown", h);
    }, []);

    useEffect(() => {
        if (open && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setDropdownPos({
                top: rect.bottom + window.scrollY + 1,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    }, [open]);
    const days = [];
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const startDay = first.getDay();

    for (let i = 0; i < startDay; i++) days.push(null);

    const total = new Date(
        view.getFullYear(),
        view.getMonth() + 1,
        0
    ).getDate();

    for (let i = 1; i <= total; i++) days.push(i);

    const select = (day) => {
        const d = new Date(
            view.getFullYear(),
            view.getMonth(),
            day
        );

        onChange(format(d));
        setOpen(false);
    };

    const isActive = (day) => {
        if (!value || !day) return false;
        const d = new Date(value);
        return (
            d.getDate() === day &&
            d.getMonth() === view.getMonth() &&
            d.getFullYear() === view.getFullYear()
        );
    };

    return (
        <div className="mb-2 relative" ref={wrapperRef}>

            {label && (
                <label className="block text-md mb-0.5 text-(--text)">
                    {label}
                </label>
            )}


            <div
                onClick={() => setOpen(true)}
                className="
          border border-(--border)
          h-9 flex justify-start items-center 
              cursor-pointer text-sm inset-shadow-sm
         relative
        "
            >
                <span className="w-10 shadow-(--bs) text-white h-full bg-(--icon) absolute flex justify-center items-center">
                    <CalendarRange size={18} />
                </span>
                <span className="pl-12">
                    {formattedDate || "Select date"}
                </span>

            </div>

            {/* Popup */}
            {open && createPortal(<div
                ref={dropdownRef}
                style={{
                    position: "fixed",
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: dropdownPos.width,
                }}

                className="
           
            bg-(--card)
            border border-(--border)
            shadow-(--bs)
            p-3 w-full
          "
            >

                {/* Header */}
                <div className="flex justify-between items-center mb-2">

                    <button
                        onClick={() =>
                            setView(
                                new Date(
                                    view.getFullYear(),
                                    view.getMonth() - 1,
                                    1
                                )
                            )
                        }
                    >
                        <ChevronLeft />
                    </button>

                    <div className="text-sm font-semibold">
                        {view.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        })}
                    </div>

                    <button
                        onClick={() =>
                            setView(
                                new Date(
                                    view.getFullYear(),
                                    view.getMonth() + 1,
                                    1
                                )
                            )
                        }
                    >

                        <ChevronRight />
                    </button>
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm">

                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                        <div key={d} className="text-(--muted) text-xs">
                            {d}
                        </div>
                    ))}

                    {days.map((d, i) => (
                        <div
                            key={i}
                            onClick={() => d && select(d)}
                            className={`
                  p-2 w-12 cursor-pointer
                  ${isActive(d)
                                    ? "bg-(--primary) text-white"
                                    : "hover:bg-(--hover)"
                                }
                `}
                        >
                            {d}
                        </div>
                    ))}

                </div>

                {/* Footer */}
                <div className="mt-2 flex justify-between text-sm">

                    <button
                        onClick={() => {
                            onChange(format(new Date()));
                            setOpen(false);
                        }}
                        className="text-(--primary)"
                    >
                        Today
                    </button>

                    {value && (
                        <button
                            onClick={() => onChange("")}
                            className="text-(--muted)"
                        >
                            Clear
                        </button>
                    )}

                </div>

            </div>, document.body)}
        </div>
    );
}
