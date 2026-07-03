import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

export function getWhiColor(whi: number): string {
  if (whi >= 80) return "text-emerald-500";
  if (whi >= 60) return "text-amber-500";
  if (whi >= 40) return "text-orange-500";
  return "text-red-500";
}

export function getWhiStatus(whi: number): string {
  if (whi >= 80) return "Excellent";
  if (whi >= 60) return "Good";
  if (whi >= 40) return "Fair";
  return "Poor";
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "operational":
    case "online":
    case "active":
    case "resolved":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    case "maintenance":
    case "acknowledged":
    case "in_progress":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "out_of_order":
    case "offline":
    case "closed":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "partial_outage":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    default:
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "P1":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "P2":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "P3":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "P4":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity) {
    case "critical":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "error":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "warning":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "info":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
}

export function getRoleBadgeColor(role: string): string {
  switch (role) {
    case "AAI_ADMIN":
      return "bg-violet-500/10 text-violet-500 border-violet-500/20";
    case "TERMINAL_ADMIN":
      return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
    case "AUDIT_VIEWER":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    default:
      return "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now.getTime() - past.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(date);
}
