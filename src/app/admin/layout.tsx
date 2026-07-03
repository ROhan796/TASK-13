"use client";

import { useAuth } from "@/hooks/use-auth";
import { V3Sidebar } from "@/components/layout/v3-sidebar";
import { V3Header } from "@/components/layout/v3-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth("AAI_ADMIN");

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-v3-background text-v3-on-background">
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <div className="w-10 h-10 border-4 border-v3-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-v3-on-surface-variant">Verifying Session Integrity...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex overflow-hidden w-screen select-none">
      <V3Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-v3-background lg:ml-[260px]">
        <V3Header />
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="p-4 lg:p-6 xl:p-8 animate-fade-in max-w-[1440px] w-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
