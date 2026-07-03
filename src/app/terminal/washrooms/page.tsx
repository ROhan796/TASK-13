"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockWashrooms } from "@/lib/mock-data";

const occupancyTrend = [
  { hour: "06:00", occupancy: 20 }, { hour: "08:00", occupancy: 45 },
  { hour: "10:00", occupancy: 78 }, { hour: "12:00", occupancy: 95 },
  { hour: "14:00", occupancy: 62 }, { hour: "16:00", occupancy: 80 },
  { hour: "18:00", occupancy: 50 }, { hour: "20:00", occupancy: 30 },
];

export default function TerminalWashroomsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All Genders");

  const filtered = mockWashrooms.filter((w) => {
    if (searchTerm && !w.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 stagger-children">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-v1-outline-variant/40 flex flex-col gap-2 hover:shadow-md transition-all v1-card-hover">
          <div className="flex justify-between items-start">
            <span className="text-[10px] lg:text-[12px] text-v1-on-surface-variant uppercase tracking-wider font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Total Units</span>
            <span className="material-symbols-outlined text-v1-primary text-lg">wc</span>
          </div>
          <div className="text-[28px] lg:text-[36px] font-bold text-v1-primary leading-tight">35</div>
          <div className="text-[10px] lg:text-[11px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>Operational across T2</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-v1-outline-variant/40 flex flex-col gap-2 hover:shadow-md transition-all v1-card-hover">
          <div className="flex justify-between items-start">
            <span className="text-[10px] lg:text-[12px] text-v1-on-surface-variant uppercase tracking-wider font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Average WHI</span>
            <span className="material-symbols-outlined text-v1-primary text-lg">monitoring</span>
          </div>
          <div className="text-[28px] lg:text-[36px] font-bold text-v1-primary leading-tight">74<span className="text-[18px]">%</span></div>
          <div className="text-[10px] lg:text-[11px] text-v1-primary" style={{ fontFamily: "var(--font-hanken)" }}>↑ 2.4% from last hour</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-v1-outline-variant/40 flex flex-col gap-2 border-l-4 border-l-v1-error hover:shadow-md transition-all v1-card-hover">
          <div className="flex justify-between items-start">
            <span className="text-[10px] lg:text-[12px] text-v1-on-surface-variant uppercase tracking-wider font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Critical Units</span>
            <span className="material-symbols-outlined text-v1-error text-lg">warning</span>
          </div>
          <div className="text-[28px] lg:text-[36px] font-bold text-v1-error leading-tight">03</div>
          <div className="text-[10px] lg:text-[11px] text-v1-error" style={{ fontFamily: "var(--font-hanken)" }}>Action required immediately</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-v1-outline-variant/40 flex flex-col gap-2 hover:shadow-md transition-all v1-card-hover">
          <div className="flex justify-between items-start">
            <span className="text-[10px] lg:text-[12px] text-v1-on-surface-variant uppercase tracking-wider font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Maintenance</span>
            <span className="material-symbols-outlined text-v1-secondary text-lg">engineering</span>
          </div>
          <div className="text-[28px] lg:text-[36px] font-bold text-v1-secondary leading-tight">05</div>
          <div className="text-[10px] lg:text-[11px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>Scheduled cleaning cycle</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-v1-outline-variant/40 overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-v1-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-v1-on-surface-variant text-xl">search</span>
            <input type="text" placeholder="Search by Unit ID or Personnel..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-v1-surface-container-low border border-v1-outline-variant rounded-full text-[13px] focus:ring-2 focus:ring-v1-primary/20 focus:outline-none transition-all" style={{ fontFamily: "var(--font-hanken)" }} />
          </div>
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="bg-v1-surface-container-low border border-v1-outline-variant rounded-xl px-3 py-2.5 text-[11px] lg:text-[12px] font-semibold focus:ring-v1-primary focus:border-v1-primary focus:outline-none cursor-pointer" style={{ fontFamily: "var(--font-hanken)" }}>
            <option>All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v1-surface-container-low/50">
                {["Unit ID", "Location", "WHI Score", "Cleanliness", "Footfall", "Status"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v1-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "var(--font-hanken)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v1-outline-variant/40">
              {filtered.map((w) => {
                const statusClass = w.status === "operational" ? "bg-v1-primary-container/10 text-v1-primary" : w.status === "maintenance" ? "bg-v1-surface-container-highest text-v1-on-surface" : "bg-v1-error-container text-v1-on-error-container";
                const barColor = w.status === "out_of_order" ? "bg-v1-error" : "bg-v1-primary";
                const fontColor = w.status === "out_of_order" ? "text-v1-error" : "text-v1-primary";
                return (
                  <tr key={w.id} className="hover:bg-v1-surface-container-low transition-colors v1-row-hover cursor-pointer">
                    <td className="px-4 lg:px-5 py-3.5">
                      <div className="text-[13px] lg:text-[14px] font-bold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>{w.id}</div>
                      <div className="text-[10px] lg:text-[11px] text-v1-on-surface-variant truncate max-w-[180px]" style={{ fontFamily: "var(--font-hanken)" }}>{w.name}</div>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>{w.floor}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 bg-v1-outline-variant/30 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor} rounded-full`} style={{ width: `${w.whi}%` }}></div>
                        </div>
                        <span className={`text-[13px] lg:text-[14px] font-bold ${fontColor}`} style={{ fontFamily: "var(--font-hanken)" }}>{w.whi}%</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>{w.cleanliness}%</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>{w.footfall}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] lg:text-[11px] font-bold ${statusClass}`} style={{ fontFamily: "var(--font-hanken)" }}>
                        {w.status.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 lg:px-5 py-3 bg-v1-surface-container-low/30 border-t border-v1-outline-variant/40 flex items-center justify-between">
          <span className="text-[11px] lg:text-[12px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>Showing {filtered.length} of 35 washrooms</span>
          <div className="flex gap-1.5">
            <button className="px-3 py-1 rounded-lg bg-v1-primary text-v1-on-primary text-[11px] lg:text-[12px] font-semibold cursor-pointer shadow-sm" style={{ fontFamily: "var(--font-hanken)" }}>1</button>
            <button className="px-3 py-1 rounded-lg border border-v1-outline-variant hover:bg-v1-surface-container-high text-[11px] lg:text-[12px] cursor-pointer transition-colors" style={{ fontFamily: "var(--font-hanken)" }}>2</button>
            <button className="px-3 py-1 rounded-lg border border-v1-outline-variant hover:bg-v1-surface-container-high text-[11px] lg:text-[12px] cursor-pointer transition-colors" style={{ fontFamily: "var(--font-hanken)" }}>3</button>
          </div>
        </div>
      </div>

      {/* Occupancy Chart */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-v1-outline-variant/40">
        <h3 className="text-[16px] lg:text-[20px] font-semibold text-v1-on-surface mb-4" style={{ fontFamily: "var(--font-hanken)" }}>Occupancy Trends</h3>
        <div className="h-[200px] lg:h-[220px] bg-v1-surface-container-low/50 rounded-xl border border-dashed border-v1-outline-variant/60 p-4 relative overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={occupancyTrend} margin={{ top: 20, right: 10, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006e2f" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#006e2f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "#565e74" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#565e74" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#2d3133", borderColor: "#6d7b6c", borderRadius: "12px", color: "#fff", fontSize: "11px" }} />
              <Area type="monotone" dataKey="occupancy" stroke="#006e2f" strokeWidth={3} fillOpacity={1} fill="url(#occupancyGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
