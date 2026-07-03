export function V1Footer() {
  return (
    <footer className="bg-v1-surface-container-low border-t border-v1-outline-variant flex justify-between items-center px-4 lg:px-6 py-3 shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-[11px] lg:text-[12px] text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>
          &copy; 2026 Airports Authority of India (SkyHub Operations). All rights reserved.
        </span>
      </div>
      <div className="flex items-center gap-4 lg:gap-6">
        <a href="#" className="text-[10px] lg:text-[11px] text-v1-secondary hover:text-v1-primary transition-colors" style={{ fontFamily: "var(--font-hanken)" }}>Legal</a>
        <a href="#" className="text-[10px] lg:text-[11px] text-v1-secondary hover:text-v1-primary transition-colors hidden sm:inline" style={{ fontFamily: "var(--font-hanken)" }}>Privacy Policy</a>
        <a href="#" className="text-[10px] lg:text-[11px] text-v1-secondary hover:text-v1-primary transition-colors hidden sm:inline" style={{ fontFamily: "var(--font-hanken)" }}>Support</a>
        <a href="#" className="text-[10px] lg:text-[11px] text-v1-secondary hover:text-v1-primary transition-colors hidden md:inline" style={{ fontFamily: "var(--font-hanken)" }}>Documentation</a>
      </div>
    </footer>
  );
}
