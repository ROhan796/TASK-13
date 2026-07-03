import { type ReactNode } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertProps {
  variant: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  className?: string;
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const styles = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export function Alert({ variant, title, children, className }: AlertProps) {
  const Icon = icons[variant];
  return (
    <div className={cn("flex gap-3 rounded-xl border p-4", styles[variant], className)}>
      <Icon size={20} className="shrink-0 mt-0.5" />
      <div className="space-y-1">
        {title && <p className="text-[13px] lg:text-sm font-semibold">{title}</p>}
        <div className="text-[12px] lg:text-sm">{children}</div>
      </div>
    </div>
  );
}
