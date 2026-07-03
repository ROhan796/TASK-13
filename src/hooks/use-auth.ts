"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import type { UserRole } from "@/types";

const ROLE_ROUTES: Record<UserRole, string> = {
  AAI_ADMIN: "/admin/dashboard",
  TERMINAL_ADMIN: "/terminal/dashboard",
  AUDIT_VIEWER: "/audit/dashboard",
};

const PROTECTED_PREFIXES: Record<UserRole, string[]> = {
  AAI_ADMIN: ["/admin"],
  TERMINAL_ADMIN: ["/terminal"],
  AUDIT_VIEWER: ["/audit"],
};

export function useAuth(requiredRole?: UserRole) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, checkSession, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      checkSession();
    }
  }, [isAuthenticated, checkSession]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isLoading && isAuthenticated && user && requiredRole && user.role !== requiredRole) {
      router.push(ROLE_ROUTES[user.role]);
    }
  }, [isAuthenticated, isLoading, user, requiredRole, router]);

  const hasAccess = (role: UserRole) => {
    if (!user) return false;
    if (user.role === "AAI_ADMIN") return true;
    return user.role === role;
  };

  const canAccessRoute = (pathname: string) => {
    if (!user) return false;
    if (user.role === "AAI_ADMIN") return true;
    return PROTECTED_PREFIXES[user.role].some((prefix) => pathname.startsWith(prefix));
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    hasAccess,
    canAccessRoute,
    logout,
    dashboardRoute: user ? ROLE_ROUTES[user.role] : "/login",
  };
}
