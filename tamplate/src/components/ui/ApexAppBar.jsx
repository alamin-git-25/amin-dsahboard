import React from "react";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {"start" | "center" | "end" | "between" | "around"} [props.align]
 * @param {"top" | "bottom" | "left" | "right" | "none"} [props.position]
 * @param {"row" | "col"} [props.direction]
 * @param {string} [props.gap] - Tailwind gap class e.g. "gap-2"
 * @param {string} [props.padding] - Tailwind padding class e.g. "p-4"
 * @param {string} [props.className] - Additional custom classes
 */
export default function ApexAppBar({
    children,
    align = "start",
    // position = "top",
    direction = "row",
    gap = "gap-2",
    padding = "",
    className = "",
}) {
    // Tailwind safe mapping
    const alignMap = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
    };

    // const borderMap = {
    //     top: "border-t",
    //     bottom: "border-b",
    //     left: "border-l",
    //     right: "border-r",
    //     none: "",
    // };

    const directionMap = {
        row: "flex-row",
        col: "flex-col",
    };

    return (
        <section
            className={`
        flex mt-4
        ${directionMap[direction] || "flex-row"}
        ${alignMap[align] || "justify-start"}
        ${gap}
   
        border-(--border)
        ${padding}
        ${className}
      `}
        >
            {children}
        </section>
    );
}

