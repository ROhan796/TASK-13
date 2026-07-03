"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function V1Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/terminal/dashboard", icon: "dashboard" },
    { name: "Washrooms", path: "/terminal/washrooms", icon: "wc" },
    { name: "Incidents", path: "/terminal/incidents", icon: "warning" },
    { name: "Devices", path: "/terminal/devices", icon: "router" },
    { name: "Settings", path: "/terminal/settings", icon: "settings" },
  ];

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const sidebarContent = (
    <>
      {/* Brand Logo */}
      <div className="px-5 py-5 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-v1-primary flex items-center justify-center shadow-sm shadow-v1-primary/20">
            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance
            </span>
          </div>
          <div>
            <h1 className="text-white text-[17px] font-bold leading-tight tracking-tight" style={{ fontFamily: "var(--font-hanken)" }}>AAI Smart</h1>
            <p className="text-[10px] text-emerald-300/70 tracking-widest uppercase font-semibold" style={{ fontFamily: "var(--font-hanken)" }}>Terminal 2 Ops</p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="mx-3 mb-6 flex items-center gap-3 p-3 bg-white/[0.06] rounded-xl border border-white/[0.08]">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-v1-primary/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-emerald-300 text-xl">person</span>
        </div>
        <div className="overflow-hidden flex-1 min-w-0">
          <p className="text-[13px] font-bold text-white truncate" style={{ fontFamily: "var(--font-hanken)" }}>
            {useAuthStore.getState().user?.name || "Alex Thompson"}
          </p>
          <p className="text-[11px] text-slate-400" style={{ fontFamily: "var(--font-hanken)" }}>T2 Ops Lead</p>
        </div>
      </div>

      {/* Section Label */}
      <div className="px-5 mb-2">
        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase" style={{ fontFamily: "var(--font-hanken)" }}>Navigation</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3.5 py-2.5 transition-all duration-200 rounded-xl cursor-pointer relative ${
                isActive
                  ? "bg-v1-primary text-white font-semibold shadow-md shadow-v1-primary/25"
                  : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-hanken)" }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-white rounded-r-full" />
              )}
              <span
                className="material-symbols-outlined text-[20px] shrink-0"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[13.5px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-3 px-3 border-t border-white/[0.08]">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3.5 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 rounded-xl text-[13.5px] text-left w-full"
          style={{ fontFamily: "var(--font-hanken)" }}
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-xl bg-white shadow-lg border border-v1-outline-variant/30 hover:bg-v1-surface-container-low transition-colors"
        aria-label="Open navigation menu"
      >
        <span className="material-symbols-outlined text-v1-on-surface text-xl">menu</span>
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen w-[260px] shrink-0 bg-v1-on-background border-r border-white/[0.08] flex-col fixed left-0 top-0 z-50">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[55]" onClick={closeMobile}>
          <div className="sidebar-overlay" />
          <aside
            className="fixed left-0 top-0 h-full w-[280px] bg-v1-on-background border-r border-white/[0.08] flex flex-col z-[60] animate-slide-in-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeMobile}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close navigation menu"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
