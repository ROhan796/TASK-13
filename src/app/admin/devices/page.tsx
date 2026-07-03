"use client";

import { useState } from "react";
import { mockDevices } from "@/lib/mock-data";

export default function DevicesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = mockDevices.filter((d) => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && d.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">Device Status</h1>
        <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mt-1">Terminal 2 IoT Network</p>
      </div>

      <div className="tonal-card rounded-xl overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-v3-outline-variant/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-v3-on-surface-variant text-xl">search</span>
            <input type="text" placeholder="Search devices..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-2.5 bg-v3-surface-container-low border border-v3-outline-variant rounded-full text-[13px] focus:ring-2 focus:ring-v3-primary/30 focus:outline-none transition-all" />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-v3-surface-container-low border border-v3-outline-variant rounded-xl px-3 py-2.5 text-[11px] lg:text-[12px] font-semibold focus:ring-v3-primary focus:border-v3-primary focus:outline-none cursor-pointer">
            <option value="">All Types</option>
            <option value="sensor">Sensor</option>
            <option value="gateway">Gateway</option>
            <option value="controller">Controller</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v3-surface-container-low/50">
                {["Name", "Type", "Status", "Battery", "RSSI", "Firmware", "Last Seen"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v3-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v3-outline-variant/20">
              {filtered.map((device) => (
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
                  <td className="px-4 lg:px-5 py-3.5 text-[11px] lg:text-[12px] text-v3-on-surface-variant">{new Date(device.lastSeen).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 lg:px-5 py-3 bg-v3-surface-container-low/30 border-t border-v3-outline-variant/30">
          <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant">Showing {filtered.length} of {mockDevices.length} devices</span>
        </div>
      </div>
    </div>
  );
}
