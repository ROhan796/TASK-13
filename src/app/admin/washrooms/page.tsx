"use client";

import { useState } from "react";
import { mockWashrooms, mockTerminals } from "@/lib/mock-data";

export default function WashroomsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = mockWashrooms.filter((wr) => {
    if (search && !wr.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && wr.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">Washrooms Inventory</h1>
        <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mt-1">Netaji Subhash Chandra Bose International Airport</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 stagger-children">
        <div className="tonal-card p-4 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-[10px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Total Units</span>
            <span className="material-symbols-outlined text-v3-primary text-lg">wc</span>
          </div>
          <div className="text-[28px] lg:text-[36px] font-bold text-v3-primary leading-tight">35</div>
        </div>
        <div className="tonal-card p-4 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-[10px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Average WHI</span>
            <span className="material-symbols-outlined text-v3-primary text-lg">monitoring</span>
          </div>
          <div className="text-[28px] lg:text-[36px] font-bold text-v3-primary leading-tight">74<span className="text-[18px]">%</span></div>
        </div>
        <div className="tonal-card p-4 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default border-l-4 border-l-v3-error">
          <div className="flex justify-between items-start">
            <span className="text-[10px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Critical Units</span>
            <span className="material-symbols-outlined text-v3-error text-lg">warning</span>
          </div>
          <div className="text-[28px] lg:text-[36px] font-bold text-v3-error leading-tight">03</div>
        </div>
        <div className="tonal-card p-4 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-[10px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Maintenance</span>
            <span className="material-symbols-outlined text-v3-on-surface-variant text-lg">engineering</span>
          </div>
          <div className="text-[28px] lg:text-[36px] font-bold text-v3-on-surface-variant leading-tight">05</div>
        </div>
      </div>

      <div className="tonal-card rounded-xl overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-v3-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-v3-on-surface-variant text-xl">search</span>
            <input type="text" placeholder="Search by Unit ID or Personnel..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-v3-surface-container-low border border-v3-outline-variant rounded-full text-[13px] focus:ring-2 focus:ring-v3-primary/30 focus:outline-none transition-all" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-v3-surface-container-low border border-v3-outline-variant rounded-xl px-4 py-2.5 text-[11px] lg:text-[12px] font-semibold focus:ring-v3-primary focus:border-v3-primary focus:outline-none cursor-pointer">
            <option value="">All Statuses</option>
            <option value="operational">Operational</option>
            <option value="maintenance">Maintenance</option>
            <option value="out_of_order">Out of Order</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v3-surface-container-low/50">
                {["Unit ID", "Terminal", "Level", "WHI Score", "Cleanliness", "Footfall", "Status"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v3-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v3-outline-variant/20">
              {filtered.map((wr) => {
                const terminal = mockTerminals.find((t) => t.id === wr.terminalId);
                const barColor = wr.status === "operational" ? "bg-v3-primary" : wr.status === "maintenance" ? "bg-amber-500" : "bg-v3-error";
                const fontColor = wr.status === "out_of_order" ? "text-v3-error" : "text-v3-primary";
                const statusClass = wr.status === "operational" ? "bg-v3-primary/10 text-v3-primary" : wr.status === "maintenance" ? "bg-amber-100 text-amber-700" : "bg-v3-error-container text-v3-error";
                return (
                  <tr key={wr.id} className="hover:bg-v3-surface-container-low transition-colors v3-row-hover cursor-pointer">
                    <td className="px-4 lg:px-5 py-3.5">
                      <div className="text-[13px] lg:text-[14px] font-bold text-v3-on-surface">{wr.id}</div>
                      <div className="text-[10px] lg:text-[11px] text-v3-on-surface-variant truncate max-w-[180px]">{wr.name}</div>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface">{terminal?.name || wr.terminalId}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface">{wr.floor}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 bg-v3-outline-variant/30 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor} rounded-full`} style={{ width: `${wr.whi}%` }}></div>
                        </div>
                        <span className={`text-[13px] lg:text-[14px] font-bold ${fontColor}`}>{wr.whi}%</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant">{wr.cleanliness}%</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant">{wr.footfall}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] lg:text-[11px] font-bold ${statusClass}`}>
                        {wr.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 lg:px-5 py-3 bg-v3-surface-container-low/30 border-t border-v3-outline-variant/30 flex items-center justify-between">
          <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant">Showing {filtered.length} of 35 washrooms</span>
        </div>
      </div>
    </div>
  );
}
