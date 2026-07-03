"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useNotificationsStore } from "@/store/notifications-store";

export function V3Header() {
  const { user } = useAuthStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationsStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifTypeIcon = (type: string) => {
    switch (type) {
      case "error": return "error";
      case "warning": return "warning";
      case "success": return "check_circle";
      default: return "info";
    }
  };

  const notifTypeColor = (type: string) => {
    switch (type) {
      case "error": return "text-v3-error";
      case "warning": return "text-amber-500";
      case "success": return "text-v3-secondary";
      default: return "text-v3-primary";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-v3-outline-variant/50 px-4 lg:px-8 py-3 flex justify-between items-center shrink-0">
      {/* Left: Page title (hidden on mobile since hamburger is there) */}
      <div className="pl-12 lg:pl-0">
        <h1 className="text-[17px] lg:text-[20px] text-v3-on-surface leading-tight font-bold">
          {user?.role === "AAI_ADMIN" ? "AAI Admin Dashboard" : "Terminal Dashboard"}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 lg:gap-5">
        {/* Search - hidden on mobile */}
        <div className="relative hidden md:flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-v3-on-surface-variant text-xl">search</span>
          <input
            className="pl-10 pr-4 py-2 bg-v3-surface-container-low border-none rounded-full text-[13px] w-56 lg:w-64 focus:ring-2 focus:ring-v3-primary/30 focus:outline-none transition-all placeholder:text-v3-on-surface-variant/50"
            placeholder="Search facilities..."
            type="text"
          />
        </div>

        {/* Mobile search */}
        <button className="md:hidden p-2 rounded-full hover:bg-v3-surface-variant transition-colors text-v3-on-surface-variant">
          <span className="material-symbols-outlined text-xl">search</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-full hover:bg-v3-surface-variant transition-colors text-v3-on-surface-variant"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-v3-error text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 lg:w-96 bg-white rounded-xl shadow-xl border border-v3-outline-variant/50 overflow-hidden animate-scale-in z-50">
              <div className="px-4 py-3 border-b border-v3-outline-variant/30 flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-v3-on-surface">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllAsRead()}
                    className="text-[11px] text-v3-primary font-semibold hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-[13px] text-v3-on-surface-variant">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => { markAsRead(n.id); if (n.actionUrl) setNotifOpen(false); }}
                      className={`w-full text-left px-4 py-3 border-b border-v3-outline-variant/20 hover:bg-v3-surface-container-low transition-colors ${
                        !n.read ? "bg-v3-surface-container-low/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`material-symbols-outlined text-lg mt-0.5 shrink-0 ${notifTypeColor(n.type)}`}>
                          {notifTypeIcon(n.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-v3-on-surface truncate">{n.title}</p>
                          <p className="text-[11px] text-v3-on-surface-variant mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-v3-primary shrink-0 mt-1.5" />}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button className="hidden sm:block p-2 hover:bg-v3-surface-variant rounded-full transition-colors text-v3-on-surface-variant">
          <span className="material-symbols-outlined text-xl">help_outline</span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block h-7 w-[1px] bg-v3-outline-variant/50"></div>

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-bold text-v3-on-surface leading-normal">{user?.name || "AAI Super Admin"}</p>
            <p className="text-[10px] text-v3-primary font-semibold leading-normal">AeroMetric Insight</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-v3-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-v3-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
