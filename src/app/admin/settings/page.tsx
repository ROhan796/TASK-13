"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">System Settings</h1>
        <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mt-1">Configure thresholds, notifications, and preferences</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
            <h3 className="text-[15px] font-bold text-v3-on-surface">WHI Thresholds</h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: "WHI Warning Threshold", value: 60 },
              { label: "WHI Critical Threshold", value: 40 },
              { label: "Cleanliness Warning", value: 65 },
              { label: "Cleanliness Critical", value: 45 },
              { label: "Battery Low Threshold (%)", value: 20 },
            ].map((item) => (
              <div key={item.label}>
                <label className="text-[13px] text-v3-on-surface-variant block mb-1.5">{item.label}</label>
                <input type="number" defaultValue={item.value} className="w-full px-4 py-2.5 bg-v3-surface-container-low border border-v3-outline-variant rounded-xl focus:ring-2 focus:ring-v3-primary/30 focus:border-v3-primary focus:outline-none text-[13px] transition-all" />
              </div>
            ))}
          </div>
        </div>
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Notifications</h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { label: "Email Notifications", desc: "Receive alerts via email", checked: true },
              { label: "SMS Notifications", desc: "Receive critical alerts via SMS", checked: true },
              { label: "Push Notifications", desc: "Browser push notifications", checked: true },
              { label: "Critical Only", desc: "Only notify for P1/P2 incidents", checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 rounded border-v3-outline-variant text-v3-primary focus:ring-v3-primary/30 transition-all" />
                <div>
                  <p className="text-[13px] font-semibold text-v3-on-surface group-hover:text-v3-primary transition-colors">{item.label}</p>
                  <p className="text-[10px] lg:text-[11px] text-v3-on-surface-variant">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-5 border-b border-v3-outline-variant/40 bg-v3-surface-bright">
            <h3 className="text-[15px] font-bold text-v3-on-surface">Display</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-[13px] text-v3-on-surface-variant block mb-1.5">Timezone</label>
              <select defaultValue="Asia/Kolkata" className="w-full px-4 py-2.5 bg-v3-surface-container-low border border-v3-outline-variant rounded-xl focus:ring-2 focus:ring-v3-primary/30 focus:border-v3-primary focus:outline-none text-[13px] transition-all cursor-pointer">
                <option value="Asia/Kolkata">India (IST)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-v3-on-surface-variant block mb-1.5">Refresh Interval (seconds)</label>
              <input type="number" defaultValue={30} className="w-full px-4 py-2.5 bg-v3-surface-container-low border border-v3-outline-variant rounded-xl focus:ring-2 focus:ring-v3-primary/30 focus:border-v3-primary focus:outline-none text-[13px] transition-all" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="bg-v3-primary text-v3-on-primary px-8 py-3 rounded-xl text-[13px] font-bold hover:bg-v3-primary-container transition-all shadow-sm active:scale-[0.98]">
          Save Settings
        </button>
      </div>
    </div>
  );
}
