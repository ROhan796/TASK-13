import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

export function MetricCard({ title, value, subtitle, icon, trend, className }: MetricCardProps) {
  return (
    <Card className={cn("p-5 v3-card-hover cursor-default", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] lg:text-sm font-medium text-slate-500">{title}</p>
          <p className="text-xl lg:text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="text-[10px] lg:text-xs text-slate-400">{subtitle}</p>}
          {trend && (
            <div className={cn("flex items-center gap-1 text-[10px] lg:text-xs font-semibold", trend.isPositive ? "text-emerald-600" : "text-red-600")}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className="text-slate-400">vs last week</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
