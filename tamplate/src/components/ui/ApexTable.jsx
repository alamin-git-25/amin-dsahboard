import {
  ArrowDownNarrowWide,
  ArrowUpDown,
  ArrowUpWideNarrow,
  Filter,
  List,
  MoreVertical,
  MoveDown,
  MoveUp,
  Plus,
  Search,
} from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ApexButton from "./ApexButton";

function TableSkeleton({ columns = [], rows = 6, selectable, showActions }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {selectable && (
            <td className="p-2 border border-(--border)">
              <div className="h-4 w-4 bg-(--skeleton) mx-auto" />
            </td>
          )}

          {columns.map((col) => (
            <td
              key={col.key}
              style={{ width: col.width }}
              className="p-2 border border-(--border)"
            >
              <div className="animate-pulse bg-(--skeleton) h-4 w-full " />
            </td>
          ))}

          {showActions && (
            <td className="p-2 border border-(--border)">
              <div className="h-4 w-6 bg-(--skeleton) mx-auto" />
            </td>
          )}
        </tr>
      ))}
    </>
  );
}

export default function ApexTable({
  columns = [],
  data = [],
  loading = false,
  selectable = false,
  actions = [],
  renderActions,
  onRowClick,
  onSelect,
  search,
  setSearch,
  loadMore,
  hasMore,
  showAddBtn = true,
  Go,
  setGo,
  components,
  btn,
}) {
  const showActions = actions?.length > 0 || renderActions;
  const [sort, setSort] = useState({ key: "", dir: "asc" });
  const [selected, setSelected] = useState([]);

  /* ---------------- SEARCH ---------------- */
  const filtered = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    );
  }, [data, search, columns]);

  /* ---------------- SORT ---------------- */
  const sorted = useMemo(() => {
    if (!sort.key) return filtered;

    return [...filtered].sort((a, b) => {
      let A = a[sort.key];
      let B = b[sort.key];

      // null safety
      if (A == null) A = "";
      if (B == null) B = "";

      // number detect
      const numA = parseFloat(A);
      const numB = parseFloat(B);

      const bothNumber = !isNaN(numA) && !isNaN(numB);

      if (bothNumber) {
        return sort.dir === "asc" ? numA - numB : numB - numA;
      }

      // string sort
      return sort.dir === "asc"
        ? String(A).localeCompare(String(B))
        : String(B).localeCompare(String(A));
    });
  }, [filtered, sort]);

  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  /* ---------- OPEN ACTION MENU ---------- */
  const openActionMenu = (rowIndex, e) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setCoords({
      top: rect.bottom + window.scrollY + 6,
      left: rect.right - 160,
    });

    setOpenMenu(rowIndex);
  };
  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  /* ---------------- ACTIONS ---------------- */
  const toggleSort = (key, sortable) => {
    if (!sortable) return;
    setSort((s) => ({
      key,
      dir: s.key === key && s.dir === "asc" ? "desc" : "asc",
    }));
  };

  const toggleSelect = (row) => {
    const id = row.id;
    const exists = selected.includes(id);

    const next = exists ? selected.filter((r) => r !== id) : [...selected, id];

    setSelected(next);
    onSelect?.(next);
  };

  const selectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
      onSelect?.([]);
    } else {
      const allIds = data.map((row) => row.id);
      setSelected(allIds);
      onSelect?.(allIds);
    }
  };

  const colSpan = showActions
    ? columns.length + (actions ? 1 : 0) + (selectable ? 1 : 0)
    : columns.length;

  /* ---------------- RENDER ---------------- */
  return (
    <div className="space-y-3">
      {/* SEARCH */}
      <div className={`relative w-full flex gap-2`}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border   border-(--border) inset-shadow-2xs min-w-72 pl-12 py-1.5 text-sm md:w-1/3 w-full  outline-none"
        />
        <span className="absolute  bg-(--primary) text-white left-0 top-0 h-full w-11 flex justify-center items-center ">
          <Search size={16} />
        </span>

        <div className="flex border-l pl-2 border-(--border) justify-start items-center gap-2">
          {showAddBtn && (
            <ApexButton variant="primary" Icon={Plus} action={() => setGo(!Go)}>
              Add New
            </ApexButton>
          )}
          {btn}
        </div>
      </div>
      <div>{components}</div>

      {/* TABLE */}
      <div className="relative border border-(--border) max-h-[75vh] overflow-auto custom-scrollbar">
        <table className="w-full text-sm border-collapse table-fixed">
          {/* HEADER */}
          <thead className="sticky top-0 bg-blue-600 text-white z-10">
            <tr>
              {selectable && (
                <th className="w-10 p-2 border border-(--border) text-center">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    checked={selected.length === data.length && data.length > 0}
                    onChange={selectAll}
                  />
                </th>
              )}
              {columns.map((col) => {
                const isActive = sort.key === col.key;

                return (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key, col.sortable)}
                    style={{ width: col.width }}
                    className={`
                    p-2 border border-(--border) truncate whitespace-nowrap overflow-hidden
                    ${col.sortable ? "cursor-pointer select-none" : ""}
                  `}
                  >
                    <span className="flex gap-4 items-center">
                      {col.title}
                      {col.sortable && (
                        <span className="">
                          {isActive ? (
                            sort.dir === "asc" ? (
                              <ArrowUpWideNarrow size={16} />
                            ) : (
                              <ArrowDownNarrowWide size={16} />
                            )
                          ) : (
                            <ArrowUpDown size={16} />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}

              {showActions && (
                <th
                  className="p-2 border border-(--border)"
                  style={{ width: 100 }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {!loading && data?.length === 0 && (
              <tr>
                <td colSpan={colSpan} className="p-6 text-center text-gray-400">
                  No data found
                </td>
              </tr>
            )}
            {loading ? (
              <TableSkeleton
                columns={columns}
                selectable={selectable}
                showActions={renderActions}
                rows={8}
              />
            ) : (
              <>
                {" "}
                {sorted?.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => onRowClick?.(row)}
                    className="hover:bg-(--hover) cursor-pointer"
                  >
                    {selectable && (
                      <td className="p-1.5 border border-(--border)  text-center">
                        <input
                          type="checkbox"
                          className="cursor-pointer"
                          checked={selected.includes(row.id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleSelect(row)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        style={{
                          width: col.width,
                          textAlign: col.align ? col.align : "left",
                        }}
                        title={String(row[col.key] ?? "")}
                        className="p-1.5 border border-(--border) truncate whitespace-nowrap overflow-hidden"
                      >
                        {col.render
                          ? col.render(row[col.key], row, i)
                          : row[col.key]}
                      </td>
                    ))}

                    {showActions && (
                      <td className="p-1.5  border border-(--border) text-center">
                        <button
                          onClick={(e) => openActionMenu(i, e)}
                          className="p-1.5 cursor-pointer rounded hover:bg-(--hover)"
                        >
                          <List size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        {hasMore && !loading && (
          <div className="flex justify-center my-2">
            <button
              onClick={loadMore}
              className="px-6 py-1 cursor-pointer bg-indigo-600 text-white"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      {openMenu !== null &&
        createPortal(
          <div
            ref={menuRef}
            style={{ top: coords.top, left: coords.left }}
            className="absolute z-50 w-40 bg-(--card) border border-(--border)"
          >
            {(actions ? renderActions(data[openMenu]) : actions).map(
              (action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    action.onClick(data[openMenu]);
                    setOpenMenu(null);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-(--hover) 
                     flex items-center gap-2
                     text-sm
                    
                     shadow-(--shadow)
                     cursor-pointer"
                >
                  {action.Icon && <action.Icon size={16} />} {action.label}
                </button>
              ),
            )}
          </div>,
          document.body,
        )}
      {/* PAGINATION */}
    </div>
  );
}
