"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface AuditLogEntry {
  timestamp: string;
  severity: "Crit" | "Warn" | "Info" | "Debg";
  source: string;
  message: string;
}

const initialLogs: AuditLogEntry[] = [
  { timestamp: "2026-06-22 14:23:45.092", severity: "Crit", source: "AUTH_SERVICE", message: "Brute-force detected: 50 failed attempts from IP 192.168.4.11" },
  { timestamp: "2026-06-22 14:23:42.115", severity: "Warn", source: "KERNEL_IO", message: "I/O Wait exceeding threshold (850ms) on Volume E-200" },
  { timestamp: "2026-06-22 14:23:38.552", severity: "Info", source: "SYNC_DAEMON", message: "Completed periodic synchronization of credentials vault" },
  { timestamp: "2026-06-22 14:23:30.221", severity: "Debg", source: "UI_GATEWAY", message: "Handshake initiated with client (v2.4.1) on channel 12" },
  { timestamp: "2026-06-22 14:23:25.881", severity: "Info", source: "NETWORK_MOD", message: "Firewall policy update applied successfully to external gateway" },
  { timestamp: "2026-06-22 14:23:12.981", severity: "Crit", source: "VAULT_LOCK", message: "Unauthorized lock initiation command intercepted" },
  { timestamp: "2026-06-22 14:23:01.442", severity: "Warn", source: "DB_CLUSTER_01", message: "Ingestion pipeline warning: latency spikes (420ms)" },
];

export default function AuditLogsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const severityBadgeClass = (sev: string) => {
    switch (sev) {
      case "Crit": return "bg-red-100 text-red-600 border border-red-200";
      case "Warn": return "bg-amber-100 text-amber-600 border border-amber-200";
      case "Info": return "bg-blue-100 text-blue-600 border border-blue-200";
      default: return "bg-slate-100 text-slate-500 border border-slate-200";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-lg lg:text-xl font-bold text-slate-800" style={{ fontFamily: "var(--font-mono, monospace)" }}>Audit Logs</h1>
        <p className="text-[10px] lg:text-xs text-slate-500 mt-1">Immutable system audit trail - read-only access</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col select-none">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-blue-50/50 border-b border-slate-200">
              <tr className="text-[9px] lg:text-[10px] font-bold text-slate-500 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                <th className="px-4 lg:px-5 py-3.5">INDEX</th>
                <th className="px-4 lg:px-5 py-3.5">Timestamp</th>
                <th className="px-4 lg:px-5 py-3.5">Severity</th>
                <th className="px-4 lg:px-5 py-3.5">Source</th>
                <th className="px-4 lg:px-5 py-3.5">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12px] lg:text-sm" style={{ fontFamily: "var(--font-mono, monospace)" }}>
              {initialLogs.map((log, idx) => {
                const itemIndex = (currentPage - 1) * pageSize + idx + 1;
                return (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors audit-row-hover">
                    <td className="px-4 lg:px-5 py-4 text-slate-500">{itemIndex}</td>
                    <td className="px-4 lg:px-5 py-4 text-slate-700">{log.timestamp}</td>
                    <td className="px-4 lg:px-5 py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] lg:text-[10px] font-bold uppercase ${severityBadgeClass(log.severity)}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="px-4 lg:px-5 py-4 font-bold text-blue-700">{log.source}</td>
                    <td className="px-4 lg:px-5 py-4 text-slate-600 leading-normal">{log.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 lg:px-5 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 select-none">
          <div className="text-[11px] lg:text-sm text-slate-500 font-medium">
            Showing 1 to {initialLogs.length} of 42,892,104 entries
          </div>
          <div className="flex items-center space-x-4 lg:space-x-6">
            <select value={`${pageSize}`} onChange={(e) => setPageSize(parseInt(e.target.value))} className="text-[10px] lg:text-xs font-bold text-blue-700 bg-transparent border-none focus:ring-0 cursor-pointer outline-none" style={{ fontFamily: "var(--font-mono, monospace)" }}>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
              <option value="200">200 per page</option>
            </select>
            <nav className="flex items-center space-x-1">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className="p-1.5 lg:p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30 transition-colors cursor-pointer">
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-1.5 lg:p-2 text-slate-400 hover:text-blue-600 disabled:opacity-30 transition-colors cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-1">
                <button className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-[10px] lg:text-xs font-bold" style={{ fontFamily: "var(--font-mono, monospace)" }}>1</button>
                <button className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200 text-[10px] lg:text-xs font-bold transition-colors cursor-pointer" style={{ fontFamily: "var(--font-mono, monospace)" }}>2</button>
                <button className="w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200 text-[10px] lg:text-xs font-bold transition-colors cursor-pointer" style={{ fontFamily: "var(--font-mono, monospace)" }}>3</button>
                <span className="px-1.5 text-slate-400 text-[10px] lg:text-xs">...</span>
                <button className="px-2 h-7 lg:h-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-200 text-[10px] lg:text-xs font-bold transition-colors cursor-pointer" style={{ fontFamily: "var(--font-mono, monospace)" }}>857842</button>
              </div>
              <button onClick={() => setCurrentPage(currentPage + 1)} className="p-1.5 lg:p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="p-1.5 lg:p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer">
                <ChevronsRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
