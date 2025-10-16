"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { selectFilters } from "@/store/selectors";
import { setPage, setPageSize, setSort } from "@/store/slices/filters";
import type { Row, SortKey } from "@/types";
import { Badge } from "./Badge";
import { ArrowUpDown } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { gradients } from "@/theme/colors";

export function DataTable({ rows }: { rows: Row[] }) {
  const f = useAppSelector(selectFilters);
  const d = useAppDispatch();

  const start = (f.page - 1) * f.pageSize;
  const current = rows.slice(start, start + f.pageSize);
  const pages = Math.max(1, Math.ceil(rows.length / f.pageSize));

  const Header = ({ k, label }: { k: SortKey; label: string }) => (
    <button
      className="inline-flex items-center gap-1 text-xs px-1 py-0.5 rounded hover:bg-gray-100"
      onClick={() => d(setSort({ key: k }))}
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <span className={`h-5 w-[3px] rounded ${gradients.orange}`} />
          <h2 className="font-semibold">Data Items</h2>
        </div>
        <SearchInput />
      </div>

      <div className="px-5 pb-4">
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr className="leading-tight">
                <th className="text-left px-5 py-3 w-32">
                  <Header k="id" label="ID" />
                </th>
                <th className="text-left px-5 py-3">
                  <Header k="title" label="Title" />
                </th>
                <th className="text-left px-5 py-3">
                  <Header k="category" label="Category" />
                </th>
                <th className="text-left px-5 py-3">
                  <Header k="status" label="Status" />
                </th>
                <th className="text-left px-5 py-3">
                  <Header k="dateISO" label="Date" />
                </th>
                <th className="text-left px-5 py-3">
                  <Header k="amount" label="Amount" />
                </th>
              </tr>
            </thead>

            <tbody>
              {current.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50/60">
                  <td className="px-5 py-2 text-gray-700 font-medium leading-tight">
                    <span className="inline-block rounded-lg py-1 bg-white">
                      {r.id}
                    </span>
                  </td>
                  <td className="px-5 py-2 leading-tight">{r.title}</td>
                  <td className="px-5 py-2 leading-tight">
                    <Badge type="category" value={r.category} />
                  </td>
                  <td className="px-5 py-2 leading-tight">
                    <Badge type="status" value={r.status} />
                  </td>
                  <td className="px-5 py-2 leading-tight">{fmtDate(r.dateISO)}</td>
                  <td className="px-5 py-2 leading-tight">{fmtMoney(r.amount)}</td>
                </tr>
              ))}

              {current.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-4 text-sm">
        <div className="flex items-center gap-2">
          Rows per page:
          <select
            className="border rounded px-2 py-1 bg-white"
            value={f.pageSize}
            onChange={(e) => d(setPageSize(Number(e.target.value)))}
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-600">
            Page {f.page} of {pages} ({rows.length} items)
          </span>
          <button
            className="border rounded px-3 py-1 disabled:opacity-50 bg-white"
            onClick={() => d(setPage(Math.max(1, f.page - 1)))}
            disabled={f.page <= 1}
          >
            Previous
          </button>
          <button
            className="border rounded px-3 py-1 disabled:opacity-50 bg-white"
            onClick={() => d(setPage(Math.min(pages, f.page + 1)))}
            disabled={f.page >= pages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
