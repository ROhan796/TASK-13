"use client";

import Link from "next/link";
import { Building2, ArrowUpRight } from "lucide-react";
import { mockTerminals, mockDevices } from "@/lib/mock-data";

export default function TerminalsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">Terminals</h1>
        <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mt-1">Manage and monitor all airport terminals</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
        <div className="tonal-card p-5 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Total Terminals</span>
          <div className="text-[32px] lg:text-[36px] font-bold text-v3-on-surface leading-tight">{mockTerminals.length}</div>
        </div>
        <div className="tonal-card p-5 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Online Devices</span>
          <div className="text-[32px] lg:text-[36px] font-bold text-v3-on-surface leading-tight">{mockDevices.filter(d => d.status === "online").length}</div>
        </div>
        <div className="tonal-card p-5 rounded-xl flex flex-col gap-2 v3-card-hover cursor-default">
          <span className="text-[11px] lg:text-[12px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Offline Devices</span>
          <div className="text-[32px] lg:text-[36px] font-bold text-v3-on-surface leading-tight">{mockDevices.filter(d => d.status === "offline").length}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger-children">
        {mockTerminals.map((terminal) => (
          <Link key={terminal.id} href={`/admin/terminals/${terminal.id}`}>
            <div className="tonal-card rounded-xl p-5 v3-card-hover cursor-pointer h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-v3-primary-fixed flex items-center justify-center shrink-0">
                    <Building2 size={22} className="text-v3-primary" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-v3-on-surface">{terminal.name}</h3>
                    <p className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">{terminal.code}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full shrink-0 ${terminal.status === "operational" ? "bg-v3-secondary-container text-v3-on-secondary-container" : "bg-v3-tertiary-fixed text-v3-on-tertiary-fixed"}`}>
                  {terminal.status.replace("_", " ").toUpperCase()}
                </span>
              </div>
              <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mb-4">{terminal.location}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-v3-surface-container-low rounded-xl p-3">
                  <p className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">Washrooms</p>
                  <p className="text-[16px] lg:text-[18px] font-bold text-v3-on-surface">{terminal.operationalWashrooms}/{terminal.totalWashrooms}</p>
                </div>
                <div className="bg-v3-surface-container-low rounded-xl p-3">
                  <p className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">Devices</p>
                  <p className="text-[16px] lg:text-[18px] font-bold text-v3-on-surface">{terminal.devices.filter(d => d.status === "online").length}/{terminal.devices.length}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-v3-outline-variant/30">
                <div>
                  <p className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">Manager</p>
                  <p className="text-[12px] lg:text-[13px] font-semibold text-v3-on-surface">{terminal.manager}</p>
                </div>
                <ArrowUpRight size={16} className="text-v3-on-surface-variant group-hover:text-v3-primary transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
