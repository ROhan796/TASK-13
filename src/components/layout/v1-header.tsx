"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function V1Header() {
  const pathname = usePathname();
  const [timeStr, setTimeStr] = useState("14:45 PM");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? "0" + minutes : minutes;
      setTimeStr(`${hours}:${minutesStr} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const getHeaderDetails = () => {
    switch (pathname) {
      case "/terminal/dashboard":
        return { title: "Airport Terminal Control", subtitle: "Terminal 2 Dashboard", showSearch: true };
      case "/terminal/washrooms":
        return { title: "Washrooms Inventory", subtitle: "Netaji Subhash Chandra Bose International Airport", showSearch: false };
      case "/terminal/incidents":
        return { title: "Active Incidents Dashboard", subtitle: "Terminal 2 Incidents Feed", showSearch: false };
      case "/terminal/devices":
        return { title: "Device Status", subtitle: "Terminal 2 IoT Network", showSearch: false };
      case "/terminal/settings":
        return { title: "System Settings", subtitle: "Hygiene & Security Configuration", showSearch: false };
      default:
        return { title: "Airport Terminal Control", subtitle: "Terminal 2 Ops", showSearch: false };
    }
  };

  const details = getHeaderDetails();

  return (
    <header className="h-16 lg:h-20 bg-white border-b border-v1-outline-variant flex items-center justify-between px-4 lg:px-6 z-40 shrink-0">
      {/* Left: Title */}
      <div className="flex flex-col pl-12 lg:pl-0">
        <h2 className="text-[18px] lg:text-[24px] text-v1-on-surface font-bold leading-tight" style={{ fontFamily: "var(--font-hanken)" }}>{details.title}</h2>
        <p className="text-[10px] lg:text-[11px] text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>{details.subtitle}</p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 lg:gap-6">
        {details.showSearch && (
          <div className="relative hidden md:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-v1-secondary text-xl">search</span>
            <input
              type="text"
              placeholder="Search facilities, devices..."
              className="bg-v1-surface-container-low border-none rounded-full pl-10 pr-4 py-1.5 text-[13px] w-56 lg:w-64 focus:ring-2 focus:ring-v1-primary/20 focus:outline-none transition-all"
              style={{ fontFamily: "var(--font-hanken)" }}
            />
          </div>
        )}

        <div className="flex items-center gap-2.5 bg-v1-primary/10 px-3 py-1 rounded-full border border-v1-primary/20">
          <span className="w-2 h-2 bg-v1-primary rounded-full animate-pulse"></span>
          <span className="text-[11px] text-v1-primary font-bold hidden sm:inline" style={{ fontFamily: "var(--font-hanken)" }}>System Live</span>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <button className="material-symbols-outlined p-2 hover:bg-v1-surface-container-high rounded-full transition-all text-v1-on-surface-variant cursor-pointer">
            notifications
          </button>
          <button className="hidden sm:block material-symbols-outlined p-2 hover:bg-v1-surface-container-high rounded-full transition-all text-v1-on-surface-variant cursor-pointer">
            schedule
          </button>
          <div className="hidden sm:block h-6 w-[1px] bg-v1-outline-variant/30"></div>
          <span className="text-[11px] lg:text-[12px] font-bold text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>{timeStr}</span>
        </div>
      </div>
    </header>
  );
}
