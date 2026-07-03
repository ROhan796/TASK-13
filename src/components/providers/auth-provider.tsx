"use client";

import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/store/auth-store";

export function AuthProvider({ children }: { children: ReactNode }) {
  const checkSession = useAuthStore((s) => s.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return <>{children}</>;
}
