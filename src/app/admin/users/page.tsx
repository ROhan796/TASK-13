"use client";

import { UserPlus } from "lucide-react";
import { mockUsers } from "@/lib/mock-data";

export default function UsersPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[20px] lg:text-[22px] font-bold text-v3-on-surface">User Management</h1>
          <p className="text-[12px] lg:text-[13px] text-v3-on-surface-variant mt-1">Manage system user accounts and roles</p>
        </div>
        <button className="bg-v3-primary text-v3-on-primary px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:bg-v3-primary-container transition-all shadow-sm active:scale-[0.98]">
          <UserPlus size={16} />
          Invite User
        </button>
      </div>

      <div className="tonal-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-v3-surface-container-low/50">
                {["Name", "Email", "Role", "Created", "Last Login"].map((h) => (
                  <th key={h} className="px-4 lg:px-5 py-3.5 text-[10px] lg:text-[12px] font-semibold text-v3-on-surface-variant uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-v3-outline-variant/20">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-v3-surface-container-low transition-colors v3-row-hover">
                  <td className="px-4 lg:px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-v3-primary/10 flex items-center justify-center text-[11px] font-bold text-v3-primary shrink-0">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-[13px] lg:text-[14px] font-semibold text-v3-on-surface">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 lg:px-5 py-3.5 text-[13px] lg:text-[14px] text-v3-on-surface-variant">{user.email}</td>
                  <td className="px-4 lg:px-5 py-3.5">
                    <span className={`px-2 py-1 text-[9px] lg:text-[10px] font-bold rounded-full ${user.role === "AAI_ADMIN" ? "bg-v3-primary-fixed text-v3-on-primary-fixed" : user.role === "TERMINAL_ADMIN" ? "bg-v3-secondary-container text-v3-on-secondary-container" : "bg-v3-tertiary-fixed text-v3-on-tertiary-fixed"}`}>
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 lg:px-5 py-3.5 text-[11px] lg:text-[12px] text-v3-on-surface-variant">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 lg:px-5 py-3.5 text-[11px] lg:text-[12px] text-v3-on-surface-variant">{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
