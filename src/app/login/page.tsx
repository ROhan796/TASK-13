"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const result = await login(email, password);
    if (result.success && result.role) {
      if (result.role === "AAI_ADMIN") router.push("/admin/dashboard");
      else if (result.role === "TERMINAL_ADMIN") router.push("/terminal/dashboard");
      else router.push("/audit/dashboard");
    }
  };

  return (
    <div className="portal-v3 bg-v3-background min-h-screen flex flex-col font-plus-jakarta">
      {/* Top Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-v3-outline-variant/50">
        <div className="flex justify-between items-center w-full px-4 lg:px-8 py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-v3-primary flex items-center justify-center shadow-sm shadow-v3-primary/20">
              <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                account_balance
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-v3-primary font-bold text-[18px] lg:text-[20px] leading-tight">AAI Smart Washroom</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link className="text-v3-primary border-b-2 border-v3-primary font-bold transition-all duration-200 text-[13px] lg:text-[14px] py-1" href="/">
              Home
            </Link>
            <a className="text-v3-on-surface-variant hover:text-v3-primary transition-colors text-[13px] lg:text-[14px]" href="#">About Us</a>
            <a className="text-v3-on-surface-variant hover:text-v3-primary transition-colors text-[13px] lg:text-[14px]" href="#">System Overview</a>
            <a className="text-v3-on-surface-variant hover:text-v3-primary transition-colors text-[13px] lg:text-[14px]" href="#">Contact</a>
          </nav>
          <Link href="/" className="bg-v3-primary text-v3-on-primary px-5 lg:px-6 py-2.5 rounded-xl font-bold text-[13px] lg:text-[14px] flex items-center gap-2 hover:bg-v3-primary-container transition-all active:scale-[0.98] shadow-sm">
            Back to Portal
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-20 lg:pt-24 px-4">
        <div className="w-full max-w-[440px] lg:max-w-[480px] bg-white rounded-2xl login-card border border-v3-outline-variant/30 overflow-hidden animate-scale-in">
          <div className="p-8 lg:p-10 flex flex-col items-center">
            {/* AAI Logo */}
            <div className="mb-6 lg:mb-8 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-v3-primary/10 flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-4xl text-v3-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_balance
                </span>
              </div>
              <div className="text-center">
                <div className="text-v3-primary font-bold text-[11px] lg:text-sm tracking-widest">AIRPORTS AUTHORITY</div>
                <div className="text-v3-primary font-bold text-[11px] lg:text-sm tracking-widest leading-none">OF INDIA</div>
              </div>
            </div>
            <h1 className="text-[18px] lg:text-[20px] text-v3-on-surface mb-6 lg:mb-8 tracking-tight uppercase font-bold text-center">
              AAI ADMIN LOGIN
            </h1>

            {error && (
              <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-[11px] lg:text-xs font-bold uppercase animate-slide-down">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] text-v3-on-surface-variant block ml-1" htmlFor="email">Username</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-v3-on-surface-variant text-xl">person</span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-v3-surface-container-low border border-v3-outline-variant rounded-xl focus:ring-2 focus:ring-v3-primary/30 focus:border-v3-primary transition-all text-v3-on-surface text-[13px] placeholder:text-v3-on-surface-variant/50 focus:outline-none"
                    id="email"
                    placeholder="Enter username"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] text-v3-on-surface-variant block ml-1" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-v3-on-surface-variant text-xl">lock</span>
                  <input
                    className="w-full pl-12 pr-12 py-3.5 bg-v3-surface-container-low border border-v3-outline-variant rounded-xl focus:ring-2 focus:ring-v3-primary/30 focus:border-v3-primary transition-all text-v3-on-surface text-[13px] placeholder:text-v3-on-surface-variant/50 focus:outline-none"
                    id="password"
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-v3-on-surface-variant hover:text-v3-primary focus:outline-none transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="pt-3">
                <button
                  disabled={isLoading}
                  className="w-full bg-v3-primary text-v3-on-primary py-4 rounded-xl text-[18px] lg:text-[20px] font-bold flex items-center justify-center gap-2 hover:bg-v3-primary-container active:scale-[0.98] transition-all shadow-md shadow-v3-primary/20 disabled:opacity-50 disabled:pointer-events-none"
                  type="submit"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      LOGIN
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 w-full">
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-v3-outline-variant/50"></div>
                <span className="flex-shrink-0 mx-4 text-[10px] lg:text-[11px] text-v3-on-surface-variant uppercase tracking-wider font-semibold">Demo Credentials</span>
                <div className="flex-grow border-t border-v3-outline-variant/50"></div>
              </div>
              <div className="mt-4 space-y-1.5 text-[11px] lg:text-xs text-v3-on-surface-variant">
                <p><span className="font-bold text-v3-on-surface">AAI Admin:</span> admin@aai.local / Password123!</p>
                <p><span className="font-bold text-v3-on-surface">Terminal Admin:</span> terminal1@aai.local / Password123!</p>
                <p><span className="font-bold text-v3-on-surface">Audit Viewer:</span> audit@aai.local / Password123!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-v3-surface-container-highest border-t border-v3-outline-variant/50 py-4 px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 max-w-[1440px] mx-auto text-[11px] lg:text-xs text-v3-on-surface-variant">
          <p>&copy; 2026 Airports Authority of India. All rights reserved.</p>
          <div className="flex gap-4 lg:gap-6">
            <a href="#" className="hover:text-v3-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-v3-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-v3-primary transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
