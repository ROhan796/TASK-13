"use client";

import { use } from "react";
import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";
import { mockTerminals } from "@/lib/mock-data";

export default function TerminalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const terminal = mockTerminals.find((t) => t.id === id);

  if (!terminal) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <Building2 size={48} className="text-slate-300 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Terminal Not Found</h2>
        <Link href="/admin/terminals" className="text-v3-primary hover:underline font-semibold text-sm">Back to Terminals</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link href="/admin/terminals" className="p-2 rounded-xl hover:bg-v3-surface-variant transition-colors">
          <ArrowLeft size={20} className="text-v3-on-surface-variant" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">{terminal.name}</h1>
          <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant">{terminal.location}</p>
        </div>
        <span className={`ml-auto px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full shrink-0 ${terminal.status === "operational" ? "bg-v3-secondary-container text-v3-on-secondary-container" : "bg-v3-tertiary-fixed text-v3-on-tertiary-fixed"}`}>
          {terminal.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 stagger-children">
        <div className="tonal-card p-4 lg:p-5 rounded-xl">
          <span className="text-[10px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Washrooms</span>
          <div className="text-[28px] lg:text-[36px] font-bold text-v3-on-surface leading-tight mt-1">{terminal.operationalWashrooms}/{terminal.totalWashrooms}</div>
        </div>
        <div className="tonal-card p-4 lg:p-5 rounded-xl">
          <span className="text-[10px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Devices</span>
          <div className="text-[28px] lg:text-[36px] font-bold text-v3-on-surface leading-tight mt-1">{terminal.devices.filter(d => d.status === "online").length}/{terminal.devices.length}</div>
        </div>
        <div className="tonal-card p-4 lg:p-5 rounded-xl">
          <span className="text-[10px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Avg WHI</span>
          <div className="text-[28px] lg:text-[36px] font-bold text-v3-on-surface leading-tight mt-1">{Math.round(terminal.washrooms.reduce((s, w) => s + w.whi, 0) / (terminal.washrooms.length || 1))}</div>
        </div>
        <div className="tonal-card p-4 lg:p-5 rounded-xl">
          <span className="text-[10px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Manager</span>
          <div className="text-[16px] lg:text-[18px] font-bold text-v3-on-surface mt-2">{terminal.manager}</div>
        </div>
      </div>

      {/* Washroom Grid */}
      <div className="tonal-card rounded-xl overflow-hidden">
        <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
          <h3 className="text-[16px] lg:text-[18px] font-semibold text-v3-on-surface">Washrooms</h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 stagger-children">
            {terminal.washrooms.map((wr) => {
              const bgClass = wr.status === "operational" ? "bg-v3-primary/10" : wr.status === "maintenance" ? "bg-amber-50" : "bg-v3-error-container/30";
              const barColor = wr.status === "operational" ? "bg-v3-primary" : wr.status === "maintenance" ? "bg-amber-500" : "bg-v3-error";
              return (
                <div key={wr.id} className={`${bgClass} rounded-xl p-4 border border-v3-outline-variant/30 v3-card-hover cursor-pointer`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] lg:text-[11px] font-semibold text-v3-on-surface-variant truncate">{wr.name.split(" - ").pop()}</span>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${wr.status === "operational" ? "bg-v3-primary" : wr.status === "maintenance" ? "bg-amber-500" : "bg-v3-error"}`}></span>
                  </div>
                  <div className="text-[22px] lg:text-[24px] font-bold text-v3-on-surface leading-none mb-2">{wr.whi}%</div>
                  <div className="w-full h-1.5 bg-v3-outline-variant/30 rounded-full overflow-hidden">
                    <div className={`h-full ${barColor} rounded-full`} style={{ width: `${wr.whi}%` }}></div>
                  </div>
                  <div className="text-[9px] lg:text-[10px] text-v3-on-surface-variant mt-2">WHI | {wr.cleanliness}% clean</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="tonal-card rounded-xl overflow-hidden">
        <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
          <h3 className="text-[16px] lg:text-[18px] font-semibold text-v3-on-surface">Devices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v3-surface-container-low/50">
                {["Name", "Type", "Status", "Battery", "RSSI", "Firmware"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v3-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v3-outline-variant/20">
              {terminal.devices.map((device) => (
                <tr key={device.id} className="hover:bg-v3-surface-container-low transition-colors v3-row-hover">
                  <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] font-semibold text-v3-on-surface">{device.name}</td>
                  <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant capitalize">{device.type}</td>
                  <td className="px-4 lg:px-5 py-3.5">
                    <span className={`px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full ${device.status === "online" ? "bg-v3-secondary-container text-v3-on-secondary-container" : device.status === "maintenance" ? "bg-amber-100 text-amber-700" : "bg-v3-error-container text-v3-on-error-container"}`}>
                      {device.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 lg:px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-v3-outline-variant/30 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${device.batteryLevel > 50 ? "bg-v3-secondary" : device.batteryLevel > 20 ? "bg-amber-500" : "bg-v3-error"}`} style={{ width: `${device.batteryLevel}%` }}></div>
                      </div>
                      <span className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">{device.batteryLevel}%</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant">{device.rssi} dBm</td>
                  <td className="px-4 lg:px-5 py-3.5 text-[11px] lg:text-[12px] text-v3-on-surface-variant" style={{ fontFamily: "var(--font-mono, monospace)" }}>{device.firmwareVersion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
