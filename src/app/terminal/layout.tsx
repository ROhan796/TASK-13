"use client";

import { useAuth } from "@/hooks/use-auth";
import { V1Sidebar } from "@/components/layout/v1-sidebar";
import { V1Header } from "@/components/layout/v1-header";
import { V1Footer } from "@/components/layout/v1-footer";

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth("TERMINAL_ADMIN");

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-v1-background">
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          <div className="w-10 h-10 border-4 border-v1-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex overflow-hidden w-screen select-none">
      <V1Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-v1-background lg:ml-[260px]">
        <V1Header />
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="p-4 lg:p-5 xl:p-6 animate-fade-in max-w-[1440px] w-full mx-auto">{children}</div>
        </main>
        <V1Footer />
      </div>
    </div>
  );
}
