"use client";

import Link from "next/link";
import { mockDashboardMetrics, mockWashrooms, mockIncidents, mockTerminals } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";

export default function AdminDashboard() {
  const metrics = mockDashboardMetrics;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">Dashboard</h1>
          <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mt-1">Overview of all terminals and washrooms</p>
        </div>
        <div className="flex items-center gap-2 text-[12px] lg:text-[13px] text-v3-on-surface-variant">
          <div className="w-2 h-2 rounded-full bg-v3-secondary animate-pulse" />
          <span>Live Monitoring</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <div className="tonal-card p-5 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Total Washrooms</span>
            <span className="material-symbols-outlined text-v3-primary text-xl">wc</span>
          </div>
          <div className="text-[32px] lg:text-[36px] font-bold text-v3-on-surface leading-tight">{metrics.totalWashrooms}</div>
          <div className="text-[11px] text-v3-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            12% increase
          </div>
        </div>
        <div className="tonal-card p-5 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Active Incidents</span>
            <span className="material-symbols-outlined text-v3-error text-xl">warning</span>
          </div>
          <div className="text-[32px] lg:text-[36px] font-bold text-v3-on-surface leading-tight">{metrics.activeIncidents}</div>
          <div className="text-[11px] text-v3-error flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">priority_high</span>
            {metrics.criticalIncidents} critical
          </div>
        </div>
        <div className="tonal-card p-5 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Online Devices</span>
            <span className="material-symbols-outlined text-v3-primary text-xl">sensors</span>
          </div>
          <div className="text-[32px] lg:text-[36px] font-bold text-v3-on-surface leading-tight">{metrics.onlineDevices}/{metrics.totalDevices}</div>
          <div className="text-[11px] text-v3-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            98.5% uptime
          </div>
        </div>
        <div className="tonal-card p-5 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <div className="flex justify-between items-start">
            <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Avg WHI Score</span>
            <span className="material-symbols-outlined text-v3-primary text-xl">monitoring</span>
          </div>
          <div className="text-[32px] lg:text-[36px] font-bold text-v3-on-surface leading-tight">{metrics.avgWhi}<span className="text-[18px]">%</span></div>
          <div className="text-[11px] text-v3-secondary flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            5% increase
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WHI Trend */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Washroom Hygiene Index - 24h Trend</h3>
          </div>
          <div className="p-5">
            <div className="h-[200px] lg:h-[220px] bg-v3-surface-container-low/50 rounded-xl border border-dashed border-v3-outline-variant/60 p-4 relative overflow-hidden">
              <svg viewBox="0 0 400 180" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="whiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#004cb5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#004cb5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <path d="M0,120 L50,100 L100,80 L150,90 L200,60 L250,70 L300,50 L350,55 L400,40" fill="none" stroke="#004cb5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M0,120 L50,100 L100,80 L150,90 L200,60 L250,70 L300,50 L350,55 L400,40 L400,180 L0,180 Z" fill="url(#whiGradient)" />
              </svg>
              <div className="absolute bottom-2 left-4 text-[10px] text-v3-on-surface-variant">00:00</div>
              <div className="absolute bottom-2 left-1/4 text-[10px] text-v3-on-surface-variant">06:00</div>
              <div className="absolute bottom-2 left-1/2 text-[10px] text-v3-on-surface-variant">12:00</div>
              <div className="absolute bottom-2 left-3/4 text-[10px] text-v3-on-surface-variant">18:00</div>
              <div className="absolute bottom-2 right-4 text-[10px] text-v3-on-surface-variant">24:00</div>
            </div>
          </div>
        </div>
        {/* Incident Trend */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Incident Trends (7 Days)</h3>
          </div>
          <div className="p-5">
            <div className="h-[200px] lg:h-[220px] bg-v3-surface-container-low/50 rounded-xl border border-dashed border-v3-outline-variant/60 p-4 relative overflow-hidden">
              <div className="flex items-end justify-between h-full gap-1.5 sm:gap-2 px-1 sm:px-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                  const critical = [2, 1, 3, 0, 1, 2, 1][i];
                  const warning = [4, 3, 5, 2, 3, 4, 2][i];
                  const info = [6, 5, 8, 4, 5, 6, 3][i];
                  const total = critical + warning + info;
                  return (
                    <div key={day} className="flex flex-col items-center gap-1 flex-1">
                      <div className="w-full flex flex-col-reverse rounded-t overflow-hidden" style={{ height: `${(total / 16) * 150}px` }}>
                        <div className="bg-v3-primary/80" style={{ height: `${(info / total) * 100}%` }}></div>
                        <div className="bg-v3-tertiary-container" style={{ height: `${(warning / total) * 100}%` }}></div>
                        <div className="bg-v3-error" style={{ height: `${(critical / total) * 100}%` }}></div>
                      </div>
                      <span className="text-[9px] lg:text-[10px] text-v3-on-surface-variant">{day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-2 lg:gap-3">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-v3-error rounded-full"></div><span className="text-[8px] lg:text-[9px] text-v3-on-surface-variant">Critical</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-v3-tertiary-container rounded-full"></div><span className="text-[8px] lg:text-[9px] text-v3-on-surface-variant">Warning</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-v3-primary/80 rounded-full"></div><span className="text-[8px] lg:text-[9px] text-v3-on-surface-variant">Info</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Status + Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Washroom Status Distribution */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Washroom Status</h3>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-36 h-36 lg:w-40 lg:h-40">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e5eeff" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#004cb5" strokeWidth="4" strokeDasharray="65 35" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-65" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ba1a1a" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-85" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[22px] lg:text-[24px] font-bold text-v3-on-surface">35</div>
                    <div className="text-[10px] text-v3-on-surface-variant">Total</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-v3-primary rounded-full"></div><span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant">Operational</span></div>
                <span className="text-[11px] lg:text-[12px] font-bold text-v3-on-surface">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full"></div><span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant">Maintenance</span></div>
                <span className="text-[11px] lg:text-[12px] font-bold text-v3-on-surface">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-v3-error rounded-full"></div><span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant">Out of Order</span></div>
                <span className="text-[11px] lg:text-[12px] font-bold text-v3-on-surface">15%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footfall Analysis */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Footfall Analysis - 24h</h3>
          </div>
          <div className="p-5">
            <div className="h-[180px] lg:h-[200px] bg-v3-surface-container-low/50 rounded-xl border border-dashed border-v3-outline-variant/60 p-4 relative overflow-hidden">
              <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="footfallGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <path d="M0,140 L50,120 L100,60 L150,30 L200,10 L250,40 L300,80 L350,100 L400,130" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M0,140 L50,120 L100,60 L150,30 L200,10 L250,40 L300,80 L350,100 L400,130 L400,160 L0,160 Z" fill="url(#footfallGradient)" />
              </svg>
              <div className="absolute top-3 right-3 text-[18px] lg:text-[20px] font-bold text-v3-on-surface">12.4K</div>
              <div className="absolute top-7 lg:top-8 right-3 text-[10px] text-v3-on-surface-variant">visitors today</div>
            </div>
          </div>
        </div>

        {/* Terminal Status */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Terminal Status</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {mockTerminals.map((terminal) => (
                <Link
                  key={terminal.id}
                  href={`/admin/terminals/${terminal.id}`}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-v3-surface-container-low transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-v3-primary-fixed flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-v3-primary text-[18px]">domain</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-v3-on-surface group-hover:text-v3-primary transition-colors truncate">{terminal.name}</p>
                      <p className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">
                        {terminal.operationalWashrooms}/{terminal.totalWashrooms} operational
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full shrink-0 ml-2 ${terminal.status === "operational" ? "bg-v3-secondary-container text-v3-on-secondary-container" : "bg-v3-tertiary-fixed text-v3-on-tertiary-fixed"}`}>
                    {terminal.status.replace("_", " ").toUpperCase()}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Incidents + Washroom Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Recent Incidents</h3>
            <Link href="/admin/incidents" className="text-[12px] lg:text-[13px] text-v3-primary hover:underline font-semibold flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {mockIncidents.slice(0, 5).map((incident) => {
                const priorityClass = incident.priority === "P1" || incident.priority === "P2"
                  ? "bg-v3-error-container text-v3-error"
                  : "bg-v3-secondary-container text-v3-on-secondary-container";
                return (
                  <div key={incident.id} className="flex items-start gap-3 p-3 rounded-xl bg-v3-surface-container-low hover:bg-v3-surface-container transition-colors">
                    <div className={`w-1 min-h-[40px] rounded-full shrink-0 ${incident.priority === "P1" || incident.priority === "P2" ? "bg-v3-error" : "bg-v3-primary"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[12px] lg:text-[13px] font-semibold text-v3-on-surface truncate">{incident.title}</p>
                        <span className={`px-2 py-0.5 text-[8px] lg:text-[9px] font-bold rounded-full shrink-0 ${priorityClass}`}>
                          {incident.priority}
                        </span>
                      </div>
                      <p className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">{timeAgo(incident.createdAt)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Washroom Overview */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Washroom Overview</h3>
            <Link href="/admin/washrooms" className="text-[12px] lg:text-[13px] text-v3-primary hover:underline font-semibold flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {mockWashrooms.slice(0, 5).map((wr) => (
                <div key={wr.id} className="flex items-center justify-between p-3 rounded-xl bg-v3-surface-container-low hover:bg-v3-surface-container transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${wr.status === "operational" ? "bg-v3-secondary" : wr.status === "maintenance" ? "bg-amber-500" : "bg-v3-error"}`} />
                    <div className="min-w-0">
                      <p className="text-[12px] lg:text-[13px] font-semibold text-v3-on-surface truncate">{wr.name}</p>
                      <p className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">WHI: {wr.whi} | Cleanliness: {wr.cleanliness}%</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full shrink-0 ml-2 ${wr.status === "operational" ? "bg-v3-secondary-container text-v3-on-secondary-container" : wr.status === "maintenance" ? "bg-amber-100 text-amber-700" : "bg-v3-error-container text-v3-error"}`}>
                    {wr.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
