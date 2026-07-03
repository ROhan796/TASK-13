"use client";

import { useState } from "react";
import { Search, MoreVertical } from "lucide-react";

const heatmapData = [
  { region: "US-East-1 (Nova)", percentage: 64, colorClass: "bg-blue-700" },
  { region: "EU-West-1 (Dublin)", percentage: 22, colorClass: "bg-blue-500" },
  { region: "AP-South-1 (Mumbai)", percentage: 14, colorClass: "bg-blue-400" },
];

const activeModels = [
  { name: "Protocol-Alpha-V4", type: "L-70B", status: "active" as const },
  { name: "Shield-Guardian-LLM", type: "L-7B", status: "active" as const },
  { name: "Legacy-Audit-Node", type: "Idle", status: "idle" as const },
];

interface LogEntry {
  timestamp: string;
  eventType: string;
  originId: string;
  model: string;
  latency: string;
  status: string;
}

const mockLogs: LogEntry[] = [
  { timestamp: "2026-06-20 10:00:02.645", eventType: "PROMPT_EXEC", originId: "NODE-8821-XP", model: "Protocol-Alpha-V4", latency: "128ms", status: "200 OK" },
  { timestamp: "2026-06-20 10:00:02.112", eventType: "PROMPT_EXEC", originId: "NODE-4192-TY", model: "Shield-Guardian-LLM", latency: "84ms", status: "200 OK" },
  { timestamp: "2026-06-20 09:59:58.983", eventType: "GUARD_BLOCK", originId: "NODE-1120-ZW", model: "Shield-Guardian-LLM", latency: "12ms", status: "403 BLOCKED" },
  { timestamp: "2026-06-20 09:59:45.301", eventType: "PROMPT_EXEC", originId: "NODE-8821-XP", model: "Protocol-Alpha-V4", latency: "141ms", status: "200 OK" },
  { timestamp: "2026-06-20 09:59:12.774", eventType: "SYNC_CHECK", originId: "NODE-9902-LK", model: "Legacy-Audit-Node", latency: "190ms", status: "200 OK" },
];

export default function AuditDashboard() {
  const [filterText, setFilterText] = useState("");

  const filteredLogs = mockLogs.filter((log) =>
    Object.values(log).some((val) =>
      val.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Neural Graphic */}
      <div className="neural-graphic flex flex-col items-center justify-center p-8 lg:p-12 text-center min-h-[280px] lg:min-h-[380px] w-full relative select-none rounded-xl border border-slate-200 bg-white">
        <div className="relative w-36 h-36 lg:w-48 lg:h-48 mb-6 lg:mb-8 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-blue-100/70 rotate-45 transform scale-110 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-0 border-2 border-blue-300 rotate-45 transform animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute inset-4 border-2 border-blue-400 rotate-45 transform scale-90 animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-8 border-2 border-blue-600 rotate-45 transform scale-75 shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center">
            <div className="w-3.5 h-3.5 bg-blue-600 rounded-full animate-ping"></div>
            <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
          </div>
        </div>
        <div className="z-10 relative">
          <h4 className="text-blue-800 font-bold tracking-widest text-xs lg:text-sm mb-2 uppercase" style={{ fontFamily: "var(--font-mono, monospace)" }}>
            Processing Vector Clusters
          </h4>
          <p className="text-slate-500 text-[11px] lg:text-xs max-w-xs leading-relaxed mx-auto">
            Analyzing multi-dimensional attention maps for divergent output detection.
          </p>
        </div>
        <div className="absolute bottom-4 left-4 text-[9px] lg:text-[10px] text-slate-400" style={{ fontFamily: "var(--font-mono, monospace)" }}>
          Support: 0x932...AF1
        </div>
      </div>

      {/* Origin Heatmap + Active Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {/* Origin Heatmap */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[9px] lg:text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-5" style={{ fontFamily: "var(--font-mono, monospace)" }}>
            Origin Heatmap
          </div>
          <div className="space-y-5">
            {heatmapData.map((item) => (
              <div key={item.region}>
                <div className="flex justify-between text-[11px] lg:text-xs font-medium text-slate-600 mb-2" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                  <span>{item.region}</span>
                  <span className="text-blue-600 font-semibold">{item.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.colorClass} rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Models */}
        <div className="bg-[#1e293b] text-slate-300 p-5 rounded-xl shadow-inner h-full flex flex-col justify-between">
          <div>
            <div className="text-[9px] lg:text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-mono, monospace)" }}>
              Active Models
            </div>
            <div className="space-y-3">
              {activeModels.map((model) => (
                <div
                  key={model.name}
                  className="flex justify-between items-center text-[11px] lg:text-xs py-2.5 border-b border-slate-700/50 last:border-b-0"
                  style={{ fontFamily: "var(--font-mono, monospace)" }}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-2 h-2 rounded-full ${model.status === "active" ? "bg-emerald-500" : "bg-slate-500"}`}></span>
                    <span>{model.name}</span>
                  </div>
                  <span className="text-slate-500">{model.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Engine Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-slate-100 flex-wrap gap-3">
          <h3 className="font-bold text-slate-800 text-xs lg:text-sm" style={{ fontFamily: "var(--font-mono, monospace)" }}>AI Engine Logs</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="pl-10 pr-4 py-1.5 border border-slate-200 rounded-lg text-[11px] lg:text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-52 lg:w-64 transition-all"
                placeholder="Filter events..."
              />
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {["Timestamp", "Event Type", "Origin ID", "Model", "Latency", "Status"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[12px] lg:text-sm divide-y divide-slate-100" style={{ fontFamily: "var(--font-mono, monospace)" }}>
              {filteredLogs.map((log, index) => {
                const isError = log.status.includes("403") || log.eventType.includes("BLOCK");
                const statusColor = isError ? "text-rose-600" : "text-emerald-600";
                const dotColor = isError ? "bg-rose-500" : "bg-emerald-500";
                const badgeClass = isError
                  ? "bg-rose-50 text-rose-700 border border-rose-100"
                  : "bg-blue-50 text-blue-700 border border-blue-100";
                return (
                  <tr key={index} className="hover:bg-slate-50/70 transition-colors audit-row-hover">
                    <td className="px-4 lg:px-5 py-3.5 text-slate-500 text-[10px] lg:text-xs">{log.timestamp}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded text-[9px] lg:text-[10px] font-bold ${badgeClass}`}>
                        {log.eventType}
                      </span>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5 text-slate-600 text-[10px] lg:text-xs">{log.originId}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-slate-800 text-[10px] lg:text-xs">{log.model}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-slate-600 text-[10px] lg:text-xs">{log.latency}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <div className={`flex items-center ${statusColor} font-bold text-[10px] lg:text-xs`}>
                        <span className={`w-2 h-2 rounded-full ${dotColor} mr-2`}></span>
                        {log.status}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 text-xs">
                    No events match filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
