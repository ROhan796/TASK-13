"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function V3Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "dashboard" },
    { name: "Terminals", href: "/admin/terminals", icon: "domain" },
    { name: "Incidents", href: "/admin/incidents", icon: "warning" },
    { name: "Washrooms", href: "/admin/washrooms", icon: "wc" },
    { name: "Devices", href: "/admin/devices", icon: "sensors" },
    { name: "Users", href: "/admin/users", icon: "group" },
    { name: "Audit Logs", href: "/admin/audit-logs", icon: "history" },
    { name: "Settings", href: "/admin/settings", icon: "settings" },
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
      <div className="flex items-center gap-3 px-5 py-5 mb-2">
        <div className="w-10 h-10 rounded-xl bg-v3-primary flex items-center justify-center shadow-sm shadow-v3-primary/20">
          <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_balance
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-bold text-[17px] leading-tight tracking-tight">AAI SMART</span>
          <span className="text-[10px] text-v3-primary-fixed-dim tracking-widest uppercase font-semibold">
            Washroom Admin
          </span>
        </div>
      </div>

      {/* Profile Section */}
      <Link
        href="/admin/settings"
        className="mx-3 mb-6 rounded-xl p-3 flex items-center gap-3 bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-all duration-200 group cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-v3-primary/20 flex items-center justify-center overflow-hidden shrink-0">
          <span className="material-symbols-outlined text-v3-inverse-primary text-xl">person</span>
        </div>
        <div className="overflow-hidden flex-1 min-w-0">
          <p className="text-[13px] font-bold truncate group-hover:text-v3-inverse-primary transition-colors text-white">{user?.name || "AAI Super Admin"}</p>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shrink-0"></span>
            <span className="truncate">Active</span>
          </p>
        </div>
      </Link>

      {/* Section Label */}
      <div className="px-5 mb-2">
        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Navigation</span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-0.5 px-3 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "bg-v3-primary text-white font-semibold shadow-md shadow-v3-primary/25"
                  : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
              }`}
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
          className="w-full flex items-center gap-3 px-3.5 py-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 text-left"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="text-[13.5px] font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-xl bg-white shadow-lg border border-v3-outline-variant/30 hover:bg-v3-surface-container-low transition-colors"
        aria-label="Open navigation menu"
      >
        <span className="material-symbols-outlined text-v3-on-surface text-xl">menu</span>
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen w-[260px] shrink-0 bg-v3-on-background border-r border-white/[0.08] flex-col fixed left-0 top-0 z-50">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[55]" onClick={closeMobile}>
          <div className="sidebar-overlay" />
          <aside
            className="fixed left-0 top-0 h-full w-[280px] bg-v3-on-background border-r border-white/[0.08] flex flex-col z-[60] animate-slide-in-left"
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
