"use client";

export default function TerminalSettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[20px] lg:text-[24px] font-bold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>System Settings</h1>
        <p className="text-[10px] lg:text-[11px] text-v1-secondary" style={{ fontFamily: "var(--font-hanken)" }}>Hygiene & Security Configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-v1-outline-variant/40 overflow-hidden">
          <div className="p-5 border-b border-v1-outline-variant/40 bg-v1-surface-bright">
            <h3 className="text-[16px] lg:text-[20px] font-semibold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Notifications</h3>
          </div>
          <div className="p-5 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-v1-outline-variant text-v1-primary focus:ring-v1-primary/30 transition-all" />
              <div>
                <p className="text-[13px] lg:text-[14px] font-semibold text-v1-on-surface group-hover:text-v1-primary transition-colors" style={{ fontFamily: "var(--font-hanken)" }}>Email Notifications</p>
                <p className="text-[10px] lg:text-[11px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>Receive alerts via email</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-v1-outline-variant text-v1-primary focus:ring-v1-primary/30 transition-all" />
              <div>
                <p className="text-[13px] lg:text-[14px] font-semibold text-v1-on-surface group-hover:text-v1-primary transition-colors" style={{ fontFamily: "var(--font-hanken)" }}>Push Notifications</p>
                <p className="text-[10px] lg:text-[11px] text-v1-on-surface-variant" style={{ fontFamily: "var(--font-hanken)" }}>Browser push notifications</p>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-v1-outline-variant/40 overflow-hidden">
          <div className="p-5 border-b border-v1-outline-variant/40 bg-v1-surface-bright">
            <h3 className="text-[16px] lg:text-[20px] font-semibold text-v1-on-surface" style={{ fontFamily: "var(--font-hanken)" }}>Display</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-[13px] text-v1-on-surface-variant block mb-1.5" style={{ fontFamily: "var(--font-hanken)" }}>Timezone</label>
              <select defaultValue="Asia/Kolkata" className="w-full px-4 py-2.5 bg-v1-surface-container-low border border-v1-outline-variant rounded-xl focus:ring-2 focus:ring-v1-primary/30 focus:border-v1-primary focus:outline-none text-[13px] transition-all cursor-pointer" style={{ fontFamily: "var(--font-hanken)" }}>
                <option value="Asia/Kolkata">India (IST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-v1-on-surface-variant block mb-1.5" style={{ fontFamily: "var(--font-hanken)" }}>Refresh Interval (seconds)</label>
              <input type="number" defaultValue={30} className="w-full px-4 py-2.5 bg-v1-surface-container-low border border-v1-outline-variant rounded-xl focus:ring-2 focus:ring-v1-primary/30 focus:border-v1-primary focus:outline-none text-[13px] transition-all" style={{ fontFamily: "var(--font-hanken)" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-v1-primary text-v1-on-primary px-8 py-3 rounded-xl text-[12px] font-bold flex items-center gap-2 hover:bg-v1-primary/95 transition-colors cursor-pointer shadow-sm active:scale-[0.98]" style={{ fontFamily: "var(--font-hanken)" }}>
          Save Settings
        </button>
      </div>
    </div>
  );
}
