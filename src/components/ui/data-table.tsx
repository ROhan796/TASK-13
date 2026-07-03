"use client";

import { type ReactNode } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "./button";
import type { PaginationState } from "@/types";

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  pagination,
  onPageChange,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {columns.map((col) => (
                <th key={col.key} className={`px-4 py-3 text-left text-[10px] lg:text-xs font-semibold text-slate-500 uppercase tracking-wider ${col.className || ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-[12px] lg:text-sm text-slate-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 text-[12px] lg:text-sm ${col.className || ""}`}>
                      {col.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
          <p className="text-[11px] lg:text-sm text-slate-500">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
            {pagination.total.toLocaleString()} entries
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => onPageChange?.(1)} disabled={pagination.page === 1}>
              <ChevronsLeft size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onPageChange?.(pagination.page - 1)} disabled={pagination.page === 1}>
              <ChevronLeft size={16} />
            </Button>
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const start = Math.max(1, pagination.page - 2);
              const p = start + i;
              if (p > pagination.totalPages) return null;
              return (
                <Button
                  key={p}
                  variant={p === pagination.page ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange?.(p)}
                >
                  {p}
                </Button>
              );
            })}
            <Button variant="ghost" size="sm" onClick={() => onPageChange?.(pagination.page + 1)} disabled={pagination.page === pagination.totalPages}>
              <ChevronRight size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onPageChange?.(pagination.totalPages)} disabled={pagination.page === pagination.totalPages}>
              <ChevronsRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
