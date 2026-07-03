"use client";

import { useAuth } from "@/hooks/use-auth";
import { AuditSidebar } from "@/components/layout/audit-sidebar";
import { AuditHeader } from "@/components/layout/audit-header";

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth("AUDIT_VIEWER");

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0f172a] text-white" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}>
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Verifying Security Protocol...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex overflow-hidden w-screen select-none">
      <AuditSidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-50 lg:ml-[260px]">
        <AuditHeader />
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="p-4 lg:p-6 xl:p-8 animate-fade-in max-w-[1440px] w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
