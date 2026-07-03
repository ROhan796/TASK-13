"use client";

import { useState } from "react";
import { mockAuditLogs } from "@/lib/mock-data";

export default function AuditSearchPage() {
  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [results, setResults] = useState<typeof mockAuditLogs>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const filtered = mockAuditLogs.filter((log) => {
      if (query && !log.details.toLowerCase().includes(query.toLowerCase()) && !log.userName.toLowerCase().includes(query.toLowerCase())) return false;
      if (userId && log.userId !== userId) return false;
      if (dateFrom && new Date(log.timestamp) < new Date(dateFrom)) return false;
      if (dateTo && new Date(log.timestamp) > new Date(dateTo)) return false;
      return true;
    });
    setResults(filtered);
    setHasSearched(true);
  };

  const severityBadgeClass = (sev: string) => {
    switch (sev) {
      case "critical": return "bg-red-100 text-red-600 border border-red-200";
      case "warning": return "bg-amber-100 text-amber-600 border border-amber-200";
      case "error": return "bg-orange-100 text-orange-600 border border-orange-200";
      default: return "bg-blue-100 text-blue-600 border border-blue-200";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-lg lg:text-xl font-bold text-slate-800" style={{ fontFamily: "var(--font-mono, monospace)" }}>Advanced Search</h1>
        <p className="text-[10px] lg:text-xs text-slate-500 mt-1">Search across all audit log entries</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-xs lg:text-sm mb-4" style={{ fontFamily: "var(--font-mono, monospace)" }}>Search Parameters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <div>
              <label className="text-[10px] lg:text-xs font-medium text-slate-600 uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-mono, monospace)" }}>Search Query</label>
              <input type="text" placeholder="Search details, user names..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[12px] lg:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" style={{ fontFamily: "var(--font-mono, monospace)" }} />
            </div>
            <div>
              <label className="text-[10px] lg:text-xs font-medium text-slate-600 uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-mono, monospace)" }}>User ID</label>
              <input type="text" placeholder="e.g., usr-001" value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[12px] lg:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" style={{ fontFamily: "var(--font-mono, monospace)" }} />
            </div>
            <div>
              <label className="text-[10px] lg:text-xs font-medium text-slate-600 uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-mono, monospace)" }}>Date From</label>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[12px] lg:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" style={{ fontFamily: "var(--font-mono, monospace)" }} />
            </div>
            <div>
              <label className="text-[10px] lg:text-xs font-medium text-slate-600 uppercase tracking-wider block mb-1.5" style={{ fontFamily: "var(--font-mono, monospace)" }}>Date To</label>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[12px] lg:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all" style={{ fontFamily: "var(--font-mono, monospace)" }} />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-md text-[12px] lg:text-sm active:scale-[0.98]" style={{ fontFamily: "var(--font-mono, monospace)" }}>
              Search
            </button>
          </div>
        </div>
      </div>

      {hasSearched && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-xs lg:text-sm" style={{ fontFamily: "var(--font-mono, monospace)" }}>Search Results ({results.length})</h3>
          </div>
          {results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[12px] lg:text-sm text-slate-400">No results found for your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {["Timestamp", "User", "Role", "Action", "Details", "Severity"].map((h) => (
                      <th key={h} className="px-4 lg:px-5 py-3.5 text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono, monospace)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[12px] lg:text-sm" style={{ fontFamily: "var(--font-mono, monospace)" }}>
                  {results.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors audit-row-hover">
                      <td className="px-4 lg:px-5 py-3.5 text-slate-500 text-[10px] lg:text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="px-4 lg:px-5 py-3.5 font-bold text-slate-800">{log.userName}</td>
                      <td className="px-4 lg:px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] lg:text-[10px] font-bold ${log.userRole === "AAI_ADMIN" ? "bg-blue-100 text-blue-600 border border-blue-200" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                          {log.userRole}
                        </span>
                      </td>
                      <td className="px-4 lg:px-5 py-3.5 text-slate-600">{log.action.replace("_", " ")}</td>
                      <td className="px-4 lg:px-5 py-3.5 text-slate-600 max-w-xs truncate">{log.details}</td>
                      <td className="px-4 lg:px-5 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] lg:text-[10px] font-bold uppercase ${severityBadgeClass(log.severity)}`}>{log.severity}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
