"use client";

import { useState } from "react";
import { mockIncidents } from "@/lib/mock-data";

export default function TerminalIncidentsPage() {
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = mockIncidents.filter((inc) => {
    if (statusFilter && inc.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[20px] lg:text-[24px] font-bold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Active Incidents Dashboard</h1>
          <p className="text-[10px] lg:text-[11px] text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>Terminal 2 Incidents Feed</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-v1-outline-variant/40 overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-v1-outline-variant/40 flex items-center gap-3">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-v1-surface-container-low border border-v1-outline-variant rounded-xl px-3 py-2.5 text-[11px] lg:text-[12px] font-semibold focus:ring-v1-primary focus:border-v1-primary focus:outline-none cursor-pointer" style={{ fontFamily: "var(--font-hanken)" }}>
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <span className="text-[11px] lg:text-[12px] text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>{filtered.length} incidents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v1-surface-container-low/50">
                {["ID", "Issue", "Priority", "Status", "Assigned", "Time"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v1-secondary uppercase tracking-wider" style={{ fontFamily: "var(--font-hanken)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v1-outline-variant/40">
              {filtered.map((incident) => {
                const priorityClass = incident.priority === "P1" || incident.priority === "P2" ? "bg-v1-error-container text-v1-error" : "bg-v1-secondary-container text-v1-on-secondary-container";
                return (
                  <tr key={incident.id} className="hover:bg-v1-surface-container-low transition-colors cursor-pointer v1-row-hover">
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] font-bold text-v1-primary" style={{ fontFamily: "var(--font-hanken)" }}>{incident.id}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface-variant truncate max-w-[200px]" style={{ fontFamily: "var(--font-hanken)" }}>{incident.title}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className={`px-2 py-1 text-[10px] lg:text-[11px] font-bold rounded-full ${priorityClass}`} style={{ fontFamily: "var(--font-hanken)" }}>{incident.priority}</span>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${incident.status === "active" ? "bg-v1-error animate-pulse" : "bg-v1-tertiary-container"}`}></div>
                        <span className="text-[13px] lg:text-[14px]" style={{ fontFamily: "var(--font-hanken)" }}>{incident.status}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>{incident.assignedTo || "-"}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[11px] lg:text-[12px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>{new Date(incident.createdAt).toLocaleDateString()}</td>
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
