"use client";
import * as React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { statusColors, categoryColors, gradients } from "@/theme/colors";
import ChartTooltip from "./ChartTooltip";

type Item = { name: string; value: number };

export function DonutChart({
  data,
  active,
  onToggle,
  type,
}: {
  data: Item[];
  active: string[];
  onToggle: (name: string) => void;
  type: "status" | "category";
}) {
  const colors = type === "status" ? statusColors : categoryColors;
  const total = React.useMemo(() => data.reduce((a, b) => a + b.value, 0), [data]);

  const addOnly = (name?: string) => {
    if (!name) return;
    if (active.includes(name)) return;
    onToggle(name);
  };

  const softCard =
    (gradients as any)?.softCard || "bg-gradient-to-r from-violet-50 to-rose-50";

  return (
    <div className="flex flex-col">
      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              onClick={(e: any) => addOnly(e?.name)}
              isAnimationActive={false}
              className="[&_path]:outline-none [&_path]:focus:outline-none"
            >
              {data.map((entry, idx) => {
                const isSelected = active.length === 0 || active.includes(entry.name);
                return (
                  <Cell
                    key={idx}
                    fill={colors[entry.name] || "#cccccc"}
                    opacity={isSelected ? 1 : 0.85}
                    stroke="#ffffff"
                    strokeWidth={4}
                    cursor="pointer"
                  />
                );
              })}
            </Pie>

            <Tooltip
              content={<ChartTooltip mode="donut" total={total} />}
              wrapperStyle={{ outline: "none" }}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 border-t pt-4 grid grid-cols-2 gap-x-10 gap-y-4">
        {data.map((d) => {
          const percent = total ? ((d.value / total) * 100).toFixed(1) : "0.0";
          const isActive = active.includes(d.name);
          return (
            <button
              key={d.name}
              onClick={() => addOnly(d.name)}
              aria-pressed={isActive}
              className={[
                "flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition",
                "shadow-sm hover:shadow-md focus:outline-none focus:ring-0 active:outline-none",
                isActive ? softCard : "bg-white hover:bg-gray-50",
              ].join(" ")}
            >
              <span
                className="h-3.5 w-3.5 rounded-full shrink-0"
                style={{ background: colors[d.name] || "#999" }}
              />
              <div className="leading-5">
                <div className={`text-[13px] ${isActive ? "text-black font-semibold" : "text-gray-500"}`}>
                  {d.name}
                </div>
                <div className="text-xs text-gray-500">
                  {d.value} ({percent}%)
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}