"use client";

import { useState } from "react";
import { mockDevices } from "@/lib/mock-data";

export default function TerminalDevicesPage() {
  const [search, setSearch] = useState("");

  const filtered = mockDevices.filter((d) => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[20px] lg:text-[24px] font-bold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Device Status</h1>
        <p className="text-[10px] lg:text-[11px] text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>Terminal 2 IoT Network</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-v1-outline-variant/40 overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-v1-outline-variant/40">
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-v1-on-surface-variant text-xl">search</span>
            <input type="text" placeholder="Search devices..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-v1-surface-container-low border border-v1-outline-variant rounded-full text-[13px] focus:ring-2 focus:ring-v1-primary/20 focus:outline-none transition-all" style={{ fontFamily: "var(--font-hanken)" }} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v1-surface-container-low/50">
                {["Name", "Type", "Status", "Battery", "RSSI", "Last Seen"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v1-secondary uppercase tracking-wider" style={{ fontFamily: "var(--font-hanken)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v1-outline-variant/40">
              {filtered.map((device) => (
                <tr key={device.id} className="hover:bg-v1-surface-container-low transition-colors v1-row-hover">
                  <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] font-semibold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>{device.name}</td>
                  <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface-variant capitalize" style={{ fontFamily: "var(--font-hanken)" }}>{device.type}</td>
                  <td className="px-4 lg:px-5 py-3.5">
                    <span className={`px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full ${device.status === "online" ? "bg-v1-primary-container/10 text-v1-primary" : device.status === "maintenance" ? "bg-v1-surface-container-highest text-v1-on-surface" : "bg-v1-error-container text-v1-error"}`} style={{ fontFamily: "var(--font-hanken)" }}>
                      {device.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 lg:px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-v1-outline-variant/30 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${device.batteryLevel > 50 ? "bg-v1-primary" : device.batteryLevel > 20 ? "bg-amber-500" : "bg-v1-error"}`} style={{ width: `${device.batteryLevel}%` }}></div>
                      </div>
                      <span className="text-[10px] lg:text-[11px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>{device.batteryLevel}%</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>{device.rssi} dBm</td>
                  <td className="px-4 lg:px-5 py-3.5 text-[11px] lg:text-[12px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>{new Date(device.lastSeen).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 lg:px-5 py-3 bg-v1-surface-container-low/30 border-t border-v1-outline-variant/40">
          <span className="text-[11px] lg:text-[12px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>Showing {filtered.length} of {mockDevices.length} devices</span>
        </div>
      </div>
    </div>
  );
}
