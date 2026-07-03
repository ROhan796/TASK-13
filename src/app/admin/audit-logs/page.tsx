"use client";

import { useState } from "react";
import { Download, Lock } from "lucide-react";
import { mockAuditLogs } from "@/lib/mock-data";

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");

  const filtered = mockAuditLogs.filter((log) => {
    if (search && !log.details.toLowerCase().includes(search.toLowerCase()) && !log.userName.toLowerCase().includes(search.toLowerCase())) return false;
    if (severityFilter && log.severity !== severityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">Audit Log & History</h1>
          <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mt-1">Security Action Registry</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-v3-surface-container-low border border-v3-outline-variant rounded-xl text-[11px] lg:text-[12px] font-semibold text-v3-on-surface-variant hover:bg-v3-surface-container-high transition-colors active:scale-[0.98]">
          <Download size={14} />
          Export
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2 text-[12px] lg:text-[13px] text-amber-800">
        <Lock size={14} className="shrink-0" />
        <span>Audit logs are immutable. No create, update, or delete operations are permitted.</span>
      </div>

      <div className="tonal-card rounded-xl overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-v3-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-v3-on-surface-variant text-xl">search</span>
            <input type="text" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-v3-surface-container-low border border-v3-outline-variant rounded-full text-[13px] focus:ring-2 focus:ring-v3-primary/30 focus:outline-none transition-all" />
          </div>
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="bg-v3-surface-container-low border border-v3-outline-variant rounded-xl px-3 py-2.5 text-[11px] lg:text-[12px] font-semibold focus:ring-v3-primary focus:border-v3-primary focus:outline-none cursor-pointer">
            <option value="">All Severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v3-surface-container-low/50">
                {["Timestamp", "User", "Role", "Action", "Resource", "Details", "Severity"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v3-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v3-outline-variant/20">
              {filtered.map((log) => {
                const severityClass = log.severity === "critical" ? "bg-v3-error-container text-v3-error" : log.severity === "warning" ? "bg-amber-100 text-amber-700" : log.severity === "error" ? "bg-orange-100 text-orange-700" : "bg-v3-primary-fixed text-v3-on-primary-fixed";
                return (
                  <tr key={log.id} className="hover:bg-v3-surface-container-low transition-colors v3-row-hover">
                    <td className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] text-v3-on-surface-variant" style={{ fontFamily: "var(--font-mono, monospace)" }}>{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] font-semibold text-v3-on-surface">{log.userName}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className={`px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full ${log.userRole === "AAI_ADMIN" ? "bg-v3-primary-fixed text-v3-on-primary-fixed" : log.userRole === "TERMINAL_ADMIN" ? "bg-v3-secondary-container text-v3-on-secondary-container" : "bg-v3-tertiary-fixed text-v3-on-tertiary-fixed"}`}>
                        {log.userRole.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant capitalize">{log.action.replace("_", " ")}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant">{log.resource}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[12px] lg:text-[13px] text-v3-on-surface-variant max-w-xs truncate">{log.details}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className={`px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full ${severityClass}`}>{log.severity}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 lg:px-5 py-3 bg-v3-surface-container-low/30 border-t border-v3-outline-variant/30">
          <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant">Showing {filtered.length} of {mockAuditLogs.length} entries</span>
        </div>
      </div>
    </div>
  );
}
