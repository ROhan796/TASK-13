"use client";

import { useState } from "react";
import { mockIncidents } from "@/lib/mock-data";

export default function IncidentsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filtered = mockIncidents.filter((inc) => {
    if (statusFilter && inc.status !== statusFilter) return false;
    if (priorityFilter && inc.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">Active Incidents Dashboard</h1>
        <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mt-1">Terminal 2 Incidents Feed</p>
      </div>

      <div className="tonal-card rounded-xl overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-v3-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-v3-surface-container-low border border-v3-outline-variant rounded-xl px-3 py-2.5 text-[11px] lg:text-[12px] font-semibold focus:ring-v3-primary focus:border-v3-primary focus:outline-none cursor-pointer">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="bg-v3-surface-container-low border border-v3-outline-variant rounded-xl px-3 py-2.5 text-[11px] lg:text-[12px] font-semibold focus:ring-v3-primary focus:border-v3-primary focus:outline-none cursor-pointer">
              <option value="">All Priorities</option>
              <option value="P1">P1 - Critical</option>
              <option value="P2">P2 - High</option>
              <option value="P3">P3 - Medium</option>
              <option value="P4">P4 - Low</option>
            </select>
          </div>
          <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant">{filtered.length} incidents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v3-surface-container-low/50">
                {["ID", "Location", "Issue", "Priority", "Status", "Assigned", "Time"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v3-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v3-outline-variant/20">
              {filtered.map((incident) => {
                const priorityClass = incident.priority === "P1" || incident.priority === "P2" ? "bg-v3-error-container text-v3-error" : "bg-v3-secondary-container text-v3-on-secondary-container";
                return (
                  <tr key={incident.id} className="hover:bg-v3-surface-container-low transition-colors cursor-pointer v3-row-hover">
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] font-bold text-v3-primary">{incident.id}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface">{incident.terminalName || "-"}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant truncate max-w-[200px]">{incident.title}</td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <span className={`px-2 py-1 text-[10px] lg:text-[11px] font-bold rounded-full ${priorityClass}`}>{incident.priority}</span>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${incident.status === "active" ? "bg-v3-error animate-pulse" : incident.status === "in_progress" ? "bg-amber-500" : "bg-v3-secondary"}`}></div>
                        <span className="text-[13px] lg:text-[14px]">{incident.status.replace("_", " ")}</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant">{incident.assignedTo || "-"}</td>
                    <td className="px-4 lg:px-5 py-3.5 text-[11px] lg:text-[12px] text-v3-on-surface-variant">{new Date(incident.createdAt).toLocaleDateString()}</td>
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
