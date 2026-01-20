

export function ApexGrid({
    col = 2,
    sm,
    md,
    lg,
    xl,
    gap = "gap-2",
    children,
    clx
}) {

    const base = {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-5",
        6: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-6",
        7: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-7",
        8: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-8",
        9: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-9",
        10: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-10",
        11: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-11",
        12: "grid-cols-1 sm:grid-cols-3 lg:grid-cols-12",
    };


    const responsive = [
        base[col] || base[2],
        sm && `sm:grid-cols-${sm}`,
        md && `md:grid-cols-${md}`,
        lg && `lg:grid-cols-${lg}`,
        xl && `xl:grid-cols-${xl}`,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={`grid ${clx} ${responsive} ${gap}`}>
            {children}
        </div>
    );
}

export function ApexCol({
    colSpan = 1,
    sm,
    md,
    lg,
    xl,
    children
}) {

    const base = {
        1: "col-span-1",
        2: "col-span-1 sm:col-span-2",
        3: "col-span-1 sm:col-span-2 lg:col-span-3",
        4: "col-span-1 sm:col-span-2 lg:col-span-4",
        5: "col-span-1 sm:col-span-3 lg:col-span-5",
        6: "col-span-1 sm:col-span-3 lg:col-span-6",
        12: "col-span-12",
    };

    const responsive = [
        base[colSpan] || base[1],
        sm && `sm:col-span-${sm}`,
        md && `md:col-span-${md}`,
        lg && `lg:col-span-${lg}`,
        xl && `xl:col-span-${xl}`,
    ]
        .filter(Boolean)
        .join(" ");

    return <div className={responsive}>{children}</div>;
}


