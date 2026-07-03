"use client";

import { useAuthStore } from "@/store/auth-store";

export function AuditHeader() {
  const { user } = useAuthStore();

  return (
    <header className="h-14 lg:h-16 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40 shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-2xl relative pl-10 lg:pl-0">
        <div className="absolute inset-y-0 left-0 lg:left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <span className="material-symbols-outlined text-xl">search</span>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Global search for trace IDs, source IPs, or event types..."
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-4 lg:space-x-6 ml-4 lg:ml-8">
        <div className="hidden sm:flex items-center space-x-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-800 tracking-tight">
            Status:{" "}
            <span className="text-slate-900 font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
              Nominal
            </span>
          </span>
        </div>
        <div className="hidden sm:block h-8 w-px bg-slate-200"></div>
        <div className="flex items-center space-x-3 lg:space-x-4">
          <button className="relative p-1 text-slate-600 hover:text-blue-600 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
          <button className="hidden sm:block p-1 text-slate-600 hover:text-blue-600 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="flex items-center space-x-2.5 ml-1">
            <div className="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
            <span className="text-sm font-bold text-slate-800 hidden md:inline" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
              {user?.role === "AAI_ADMIN" ? "Admin" : "Viewer"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
