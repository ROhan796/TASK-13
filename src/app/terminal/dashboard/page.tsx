"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockIncidents, mockLiveFeed } from "@/lib/mock-data";

export default function TerminalDashboard() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"heatmap" | "2d">("heatmap");
  const activeIncidents = mockIncidents.filter((inc) => inc.status !== "resolved");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
      {/* Top Stats Cards */}
      <div
        onClick={() => router.push("/terminal/washrooms")}
        className="sm:col-span-1 lg:col-span-3 bg-white p-4 rounded-xl shadow-sm border border-v1-outline-variant/40 hover:shadow-md cursor-pointer hover:scale-[1.01] transition-all duration-200 v1-card-hover"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] lg:text-[12px] text-v1-secondary font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Total Washrooms</span>
          <span className="material-symbols-outlined text-v1-primary text-xl">wc</span>
        </div>
        <div className="text-[32px] lg:text-[36px] font-bold text-v1-on-surface leading-tight">35</div>
        <div className="text-[10px] lg:text-[11px] text-v1-primary flex items-center gap-1 mt-2" style={{ fontFamily: "var(--font-hanken)" }}>
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          All functional
        </div>
      </div>

      <div
        onClick={() => router.push("/terminal/incidents")}
        className="sm:col-span-1 lg:col-span-3 bg-white p-4 rounded-xl shadow-sm border border-v1-outline-variant/40 hover:shadow-md cursor-pointer hover:scale-[1.01] transition-all duration-200 v1-card-hover"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] lg:text-[12px] text-v1-secondary font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Active Incidents</span>
          <span className="material-symbols-outlined text-v1-error text-xl">report_problem</span>
        </div>
        <div className="text-[32px] lg:text-[36px] font-bold text-v1-on-surface leading-tight">{activeIncidents.length}</div>
        <div className="text-[10px] lg:text-[11px] text-v1-error flex items-center gap-1 mt-2" style={{ fontFamily: "var(--font-hanken)" }}>
          <span className="material-symbols-outlined text-[14px]">warning</span>
          Requires attention
        </div>
      </div>

      <div
        onClick={() => router.push("/terminal/devices")}
        className="sm:col-span-1 lg:col-span-3 bg-white p-4 rounded-xl shadow-sm border border-v1-outline-variant/40 hover:shadow-md cursor-pointer hover:scale-[1.01] transition-all duration-200 v1-card-hover"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] lg:text-[12px] text-v1-secondary font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Online Devices</span>
          <span className="material-symbols-outlined text-v1-primary text-xl">sensors</span>
        </div>
        <div className="text-[32px] lg:text-[36px] font-bold text-v1-on-surface leading-tight">34</div>
        <div className="text-[10px] lg:text-[11px] text-v1-on-surface-variant flex items-center gap-1 mt-2" style={{ fontFamily: "var(--font-hanken)" }}>
          <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
          98.5% uptime
        </div>
      </div>

      {/* Low WHI Alert Card */}
      <div className="sm:col-span-1 lg:col-span-3 bg-v1-error-container/20 p-4 rounded-xl shadow-sm border border-v1-error/20 hover:shadow-md cursor-pointer hover:scale-[1.01] transition-all duration-200 relative overflow-hidden v1-card-hover">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] lg:text-[12px] text-v1-on-error-container font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Low WHI Alert</span>
          <span className="material-symbols-outlined text-v1-error text-xl">trending_down</span>
        </div>
        <div className="text-[32px] lg:text-[36px] font-bold text-v1-error leading-tight">42</div>
        <div className="text-[10px] lg:text-[11px] text-v1-error flex items-center gap-1 mt-2" style={{ fontFamily: "var(--font-hanken)" }}>
          <span className="material-symbols-outlined text-[14px]">priority_high</span>
          Critical Hygiene Threshold
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <span className="material-symbols-outlined text-[80px]">warning</span>
        </div>
      </div>

      {/* Main Interactive Heatmap */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-8 bg-white rounded-xl shadow-sm border border-v1-outline-variant/40 overflow-hidden flex flex-col h-[350px] sm:h-[400px] lg:h-[500px]">
        <div className="p-4 flex items-center justify-between border-b border-v1-outline-variant/40 bg-v1-surface-bright">
          <div>
            <h3 className="text-[16px] lg:text-[20px] font-semibold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Interactive Zone Map</h3>
            <p className="text-[10px] lg:text-[11px] text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>Terminal 2 - Concourse B Live View</p>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setViewMode("2d")}
              className={`px-3 py-1 text-[11px] lg:text-[12px] rounded-lg transition-colors cursor-pointer ${
                viewMode === "2d"
                  ? "bg-v1-primary text-v1-on-primary shadow-sm"
                  : "bg-v1-surface-container text-v1-on-surface hover:bg-v1-surface-container-high"
              }`}
              style={{ fontFamily: "var(--font-hanken)" }}
            >
              2D View
            </button>
            <button
              onClick={() => setViewMode("heatmap")}
              className={`px-3 py-1 text-[11px] lg:text-[12px] rounded-lg transition-colors cursor-pointer ${
                viewMode === "heatmap"
                  ? "bg-v1-primary text-v1-on-primary shadow-sm"
                  : "bg-v1-surface-container text-v1-on-surface hover:bg-v1-surface-container-high"
              }`}
              style={{ fontFamily: "var(--font-hanken)" }}
            >
              Heatmap
            </button>
          </div>
        </div>
        <div className="flex-1 relative bg-v1-surface-container-high overflow-hidden">
          <div className="absolute inset-0 heatmap-grid opacity-40"></div>
          {/* Floating Legend */}
          <div className="absolute bottom-4 left-4 p-3 bg-white/90 backdrop-blur-sm border border-v1-outline-variant rounded-xl flex flex-col gap-2 z-10 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-v1-primary rounded-full"></div>
              <span className="text-[9px] lg:text-[10px] font-bold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Good (&gt;80)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-v1-tertiary-container rounded-full"></div>
              <span className="text-[9px] lg:text-[10px] font-bold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Fair (60-80)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-v1-error rounded-full"></div>
              <span className="text-[9px] lg:text-[10px] font-bold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Critical (&lt;60)</span>
            </div>
          </div>
          {/* Tooltip */}
          <div className="absolute top-[40%] left-[30%] p-3 bg-v1-inverse-surface text-v1-inverse-on-surface rounded-xl shadow-lg flex flex-col gap-2 border animate-pulse z-10 cursor-pointer">
            <span className="text-[9px] lg:text-[10px] font-bold" style={{ fontFamily: "var(--font-hanken)" }}>G12 Washroom Area</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-v1-error rounded-full"></div>
              <span className="text-[9px] lg:text-[10px]" style={{ fontFamily: "var(--font-hanken)" }}>WHI: 42 (Critical)</span>
            </div>
          </div>
          {/* Grid overlay cells */}
          <div className="absolute inset-4 grid grid-cols-6 sm:grid-cols-8 grid-rows-3 lg:grid-rows-4 gap-1.5 lg:gap-2 opacity-30">
            {Array.from({ length: 32 }).map((_, i) => {
              const colors = ["bg-v1-primary/60", "bg-v1-primary/40", "bg-v1-tertiary-container/60", "bg-v1-error/40"];
              return <div key={i} className={`rounded-lg ${colors[i % 4]}`}></div>;
            })}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Live WHI Feed */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-white rounded-xl shadow-sm border border-v1-outline-variant/40 overflow-hidden flex flex-col h-[350px] sm:h-[400px] lg:h-[500px]">
        <div className="p-4 border-b border-v1-outline-variant/40 bg-v1-surface-bright flex items-center justify-between">
          <h3 className="text-[16px] lg:text-[20px] font-semibold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Live WHI Feed</h3>
          <span className="material-symbols-outlined text-v1-secondary cursor-pointer">more_vert</span>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-2.5">
          {mockLiveFeed.map((item: { id: string; zone: string; whi: number; message: string; time: string; status: string }) => {
            const borderClass =
              item.status === "critical" ? "border-v1-error" :
              item.status === "fair" ? "border-v1-tertiary-container" :
              "border-v1-primary-container";
            const textClass =
              item.status === "critical" ? "text-v1-error" :
              item.status === "fair" ? "text-v1-on-tertiary-container" :
              "text-v1-primary";
            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl bg-v1-surface-container-low border-l-4 ${borderClass} hover:bg-v1-surface-container transition-colors`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[11px] lg:text-[12px] font-semibold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>{item.zone}</span>
                  <span className={`text-[10px] lg:text-[11px] ${textClass} font-bold`} style={{ fontFamily: "var(--font-hanken)" }}>{item.whi}</span>
                </div>
                <p className="text-[10px] lg:text-[11px] text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>{item.message}</p>
                <span className="text-[9px] lg:text-[10px] text-v1-secondary mt-1 block" style={{ fontFamily: "var(--font-hanken)" }}>{item.time}</span>
              </div>
            );
          })}
        </div>
        <div className="p-3 text-center border-t border-v1-outline-variant/40">
          <Link href="/terminal/washrooms" className="text-v1-primary text-[11px] lg:text-[12px] font-semibold hover:underline block" style={{ fontFamily: "var(--font-hanken)" }}>
            View All Metrics
          </Link>
        </div>
      </div>

      {/* Active Incidents Table */}
      <div className="col-span-1 sm:col-span-2 bg-white rounded-xl shadow-sm border border-v1-outline-variant/40 overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-v1-outline-variant/40 bg-v1-surface-bright">
          <div className="flex items-center gap-3">
            <h3 className="text-[16px] lg:text-[20px] font-semibold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Active Incidents</h3>
            <span className="px-2 py-0.5 bg-v1-error-container text-v1-on-error-container text-[9px] lg:text-[10px] font-bold rounded-full" style={{ fontFamily: "var(--font-hanken)" }}>
              {activeIncidents.filter((inc) => inc.priority === "P1" || inc.priority === "P2").length} CRITICAL
            </span>
          </div>
          <Link
            href="/terminal/incidents"
            className="flex items-center gap-1 px-3 lg:px-4 py-1.5 bg-v1-inverse-surface text-v1-inverse-on-surface rounded-xl text-[11px] lg:text-[12px] font-semibold hover:bg-v1-on-surface-variant transition-colors"
            style={{ fontFamily: "var(--font-hanken)" }}
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            New Report
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v1-surface-container-low">
                {["Incident ID", "Location", "Issue", "Priority", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v1-secondary uppercase tracking-wider" style={{ fontFamily: "var(--font-hanken)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v1-outline-variant/40">
              {activeIncidents.map((incident) => {
                const priorityClass =
                  incident.priority === "P1" || incident.priority === "P2"
                    ? "bg-v1-error-container text-v1-error"
                    : "bg-v1-secondary-container text-v1-on-secondary-container";
                const statusDotColor =
                  incident.status === "active" ? "bg-v1-error" : "bg-v1-tertiary-container";
                return (
                  <tr
                    key={incident.id}
                    onClick={() => router.push("/terminal/incidents")}
                    className="hover:bg-v1-surface-container-low transition-colors cursor-pointer group"
                  >
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] font-bold text-v1-primary" style={{ fontFamily: "var(--font-hanken)" }}>{incident.id}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>{incident.terminalName || incident.terminalId}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface-variant truncate max-w-[200px]" style={{ fontFamily: "var(--font-hanken)" }}>{incident.title}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className={`px-2 py-1 text-[10px] lg:text-[11px] font-bold rounded-full ${priorityClass}`} style={{ fontFamily: "var(--font-hanken)" }}>
                        {incident.priority}
                      </span>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${statusDotColor} ${incident.status === "active" ? "animate-pulse" : ""}`}></div>
                        <span className="text-[13px] lg:text-[14px]" style={{ fontFamily: "var(--font-hanken)" }}>{incident.status}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className="material-symbols-outlined text-v1-secondary group-hover:text-v1-primary group-hover:translate-x-1 transition-all text-lg">
                        chevron_right
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
