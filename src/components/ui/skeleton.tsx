import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100", className)} />;
}

export { Skeleton };
