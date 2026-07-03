"use client";

import { create } from "zustand";
import type { User, UserRole } from "@/types";
import { mockUsers, demoCredentials } from "@/lib/mock-data";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
  checkSession: () => boolean;
}

function generateToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    terminalId: user.terminalId,
    iat: Date.now(),
    exp: Date.now() + 8 * 60 * 60 * 1000,
  }));
  const signature = btoa(`${header}.${payload}.aai-washroom-secret`);
  return `${header}.${payload}.${signature}`;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    await new Promise((r) => setTimeout(r, 800));

    const cred = Object.entries(demoCredentials).find(
      ([, c]) => c.email === email && c.password === password
    );

    if (!cred) {
      set({ isLoading: false, error: "Invalid email or password" });
      return { success: false, error: "Invalid email or password" };
    }

    const role = cred[0] as UserRole;
    const user = mockUsers.find((u) => u.role === role);

    if (!user) {
      set({ isLoading: false, error: "User account not found" });
      return { success: false, error: "User account not found" };
    }

    const token = generateToken(user);

    if (typeof window !== "undefined") {
      document.cookie = `aai_token=${token}; path=/; max-age=${8 * 60 * 60}; SameSite=Lax`;
      document.cookie = `aai_role=${user.role}; path=/; max-age=${8 * 60 * 60}; SameSite=Lax`;
      document.cookie = `aai_user=${encodeURIComponent(JSON.stringify({ id: user.id, name: user.name, email: user.email, role: user.role, terminalId: user.terminalId }))}; path=/; max-age=${8 * 60 * 60}; SameSite=Lax`;
      localStorage.setItem("aai_token", token);
      localStorage.setItem("aai_role", user.role);
      localStorage.setItem("aai_user", JSON.stringify(user));
    }

    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    return { success: true, role: user.role };
  },

  logout: () => {
    if (typeof window !== "undefined") {
      document.cookie = "aai_token=; path=/; max-age=0";
      document.cookie = "aai_role=; path=/; max-age=0";
      document.cookie = "aai_user=; path=/; max-age=0";
      localStorage.removeItem("aai_token");
      localStorage.removeItem("aai_role");
      localStorage.removeItem("aai_user");
    }
    set({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  clearError: () => set({ error: null }),

  checkSession: () => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("aai_token");
    const userStr = localStorage.getItem("aai_user");
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ user, token, isAuthenticated: true });
        return true;
      } catch {
        get().logout();
        return false;
      }
    }
    return false;
  },
}));
