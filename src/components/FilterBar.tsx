"use client";
import * as React from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { selectFilters } from "@/store/selectors";
import { clearAll, removeFilterChip } from "@/store/slices/filters";
import { gradients, borders, shadows } from "@/theme/colors";

export function FilterBar({
  total,
  totalRows,
}: {
  total: number;
  totalRows: number;
}) {
  const f = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const chips = [
    ...f.statuses.map((s) => ({
      type: "status" as const,
      value: s,
      label: `Status: ${s}`,
    })),
    ...f.categories.map((c) => ({
      type: "category" as const,
      value: c,
      label: `Category: ${c}`,
    })),
    ...f.days.map((d) => ({ type: "day" as const, value: d, label: d })),
  ];

  const [visible, setVisible] = React.useState(false);
  React.useLayoutEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (chips.length === 0) return null;

  return (
    <div
      className={[
        gradients.creamBand,
        borders.bandBottom,
        "flex items-center justify-between px-8 py-2 text-sm backdrop-blur-md",
        "will-change-transform transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
        visible
          ? "opacity-100 translate-y-0 scale-y-100"
          : "opacity-0 translate-y-[100%] scale-y-[0.98]",
      ].join(" ")}
      style={{
        borderRadius: "0",
        transformOrigin: "top center",
        transition:
          "transform 0.9s cubic-bezier(0.19,1,0.22,1), box-shadow 0.6s cubic-bezier(0.19,1,0.22,1) 0.2s",
        boxShadow: visible
          ? "0 6px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06)"
          : "none",
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-gray-700 font-medium mr-1">
          Filters applied ({chips.length}):
        </span>

        {chips.map((c, i) => {
          const isStatus = c.type === "status";

          const chipBg =
            isStatus
              ? "bg-gradient-to-r from-[#F3E8FF] to-[#E9D5FF]" 
              : "bg-gradient-to-r from-[#FCE7F3] to-[#FFE4E6]"; 
          const chipBorder = isStatus ? "#C4B5FD" : "#F9A8D4"; 
          const chipText = isStatus ? "#6D28D9" : "#BE185D"; 

          return (
            <span
              key={i}
              className={[
                "inline-flex items-center gap-2 rounded-full",
                chipBg,
                "px-3 py-1 text-xs",
                "border",
                shadows.chip,
                "transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:shadow-md hover:scale-[1.03]",
              ].join(" ")}
              style={{ borderColor: chipBorder }}
            >
              <span style={{ color: chipText }}>{c.label}</span>

              <button
                className="rounded-full border px-1 leading-none hover:bg-white/60 transition-colors"
                style={{
                  borderColor: `${chipText}26`, 
                  color: chipText,
                }}
                onClick={() =>
                  dispatch(removeFilterChip({ type: c.type, value: c.value }))
                }
                aria-label="Remove filter"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          {total} of {totalRows} items
        </span>
        <button
          className="font-medium text-gray-900 hover:underline hover:text-fuchsia-600 transition-colors"
          onClick={() => dispatch(clearAll())}
        >
          Clear all
        </button>
      </div>
    </div>
  );
}