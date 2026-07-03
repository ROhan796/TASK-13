"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export function AuditSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: "AI Admin", href: "/audit/dashboard", icon: "shield" },
    { name: "Audit Logs", href: "/audit/logs", icon: "description" },
    { name: "Search", href: "/audit/search", icon: "search" },
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
      <div className="p-5 border-b border-white/[0.08]">
        <div className="flex items-center space-x-3">
          <div className="bg-audit-brand-blue p-2.5 rounded-xl text-white shadow-sm shadow-audit-brand-blue/25">
            <span className="material-symbols-outlined text-xl">shield</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-[15px] leading-tight tracking-wider" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
              AUDIT_LOCK
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
              Enterprise Security
            </p>
          </div>
        </div>
      </div>

      {/* Section Label */}
      <div className="px-5 mt-5 mb-2">
        <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
          Ecosystem
        </p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative ${
                isActive
                  ? "bg-audit-brand-blue text-white shadow-lg shadow-audit-brand-blue/25 font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.07]"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-white rounded-r-full" />
              )}
              <span className="material-symbols-outlined text-[20px] w-5 h-5 mr-3 shrink-0">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout & Status */}
      <div className="mt-auto border-t border-white/[0.08] px-3 py-4 space-y-3">
        <button
          onClick={logout}
          className="w-full flex items-center px-3.5 py-2.5 text-sm font-medium rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.07] transition-all duration-200 text-left"
        >
          <span className="material-symbols-outlined text-[20px] w-5 h-5 mr-3 opacity-60">logout</span>
          Sign Out
        </button>
        <div className="px-3.5 flex items-center space-x-2">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
            System Stable
          </span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-xl bg-audit-brand-sidebar shadow-lg border border-white/10 hover:bg-audit-brand-dark transition-colors"
        aria-label="Open navigation menu"
      >
        <span className="material-symbols-outlined text-white text-xl">menu</span>
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-full w-[260px] bg-audit-brand-sidebar text-slate-300 flex-col shrink-0 fixed left-0 top-0 z-50 border-r border-white/[0.06]">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[55]" onClick={closeMobile}>
          <div className="sidebar-overlay" />
          <aside
            className="fixed left-0 top-0 h-full w-[280px] bg-audit-brand-sidebar text-slate-300 flex flex-col z-[60] animate-slide-in-left"
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
