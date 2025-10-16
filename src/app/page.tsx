"use client";
import * as React from "react";
import { Card } from "@/components/Card";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChartDaily } from "@/components/charts/BarChartDaily";
import { DataTable } from "@/components/DataTable";
import { FilterBar } from "@/components/FilterBar";
import { useRows } from "@/hooks/useRows";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  computeBuckets,
  filterRows,
  selectFilters,
  sortRows,
} from "@/store/selectors";
import {
  toggleCategory,
  toggleDay,
  toggleStatus,
  setDateRange,
} from "@/store/slices/filters";
import { gradients, borders, shadows } from "@/theme/colors";

export default function Page() {
  const rows = useRows() || [];
  const f = useAppSelector(selectFilters);
  const d = useAppDispatch();

  const { statusCounts, categoryCounts, daily } = React.useMemo(
    () => computeBuckets(rows),
    [rows]
  );
  const filtered = useAppSelector((s) => filterRows(rows, s as any));
  const sorted = React.useMemo(
    () => sortRows(filtered, f.sort.key, f.sort.dir),
    [filtered, f.sort]
  );

  const statusData = Object.keys(statusCounts).map((k) => ({
    name: k,
    value: statusCounts[k as keyof typeof statusCounts],
  }));
  const categoryData = Object.keys(categoryCounts).map((k) => ({
    name: k,
    value: categoryCounts[k as keyof typeof categoryCounts],
  }));

  return (
    <main className="w-full pb-5 space-y-6">
      <section className={`w-full  overflow-hidden ${shadows.soft}`}>
        <header className={`w-full px-5 py-5 bg-[#FFFFFE] ${borders.bandBottom}`}>
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl ${gradients.pinkPurple} shadow-lg flex items-center justify-center flex-shrink-0`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-5 h-5"
              >
                <rect x="4" y="13" width="3" height="7" rx="1.5" fill="white" />
                <rect x="10.5" y="9" width="3" height="11" rx="1.5" fill="white" />
                <rect x="17" y="5" width="3" height="15" rx="1.5" fill="white" />
              </svg>
            </div>

            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-sm text-fuchsia-700 leading-tight">
                Interactive Dashboard
              </h1>
              <p className="text-sm text-gray-600 leading-snug">
                Click chart segments or bars to filter the data table. Multiple
                selections within the same chart use OR logic; selections across
                different charts use AND logic.
              </p>
            </div>
          </div>
        </header>
        <div >
          <FilterBar total={sorted.length} totalRows={rows.length} />
        </div>
      </section>

      <section className="w-[80%] mx-auto charts-row">
        <Card title="Status Distribution">
          <DonutChart
            data={statusData}
            active={f.statuses}
            onToggle={(n) => d(toggleStatus(n as any))}
            type="status"
          />
        </Card>

        <Card title="Category Distribution">
          <DonutChart
            data={categoryData}
            active={f.categories}
            onToggle={(n) => d(toggleCategory(n as any))}
            type="category"
          />
        </Card>

        <Card
          fitContent={true}
          grad="blue"
          title="Items by Day"
          action={
            <div className="flex gap-2">
              {(["7d", "30d", "all"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => d(setDateRange(r))}
                  className={`btn-tab ${
                    f.dateRange === r
                      ? `${gradients.pinkPurple} text-white border-none`
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {r === "all" ? "All" : r}
                </button>
              ))}
            </div>
          }
        >
          <BarChartDaily
            data={daily}
            activeDays={f.days}
            range={f.dateRange}
            onToggleDay={(dstr) => d(toggleDay(dstr))}
          />
        </Card>
      </section>

      <section className="table-wrap mx-auto space-y-3">
        <DataTable rows={sorted} />
      </section>
    </main>
  );
}