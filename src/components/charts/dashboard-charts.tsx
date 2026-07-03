"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Washroom } from "@/types";
import { chartData } from "@/lib/mock-data";

interface ChartProps {
  className?: string;
}

const tooltipStyle = {
  backgroundColor: "#0f172a",
  border: "none",
  borderRadius: "12px",
  color: "#f8fafc",
  fontSize: "12px",
  padding: "8px 12px",
};

const gridStyle = { strokeDasharray: "3 3", stroke: "#e2e8f0" };

export function WashroomStatusPieChart({ className }: ChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Washroom Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={chartData.washroomStatus}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.washroomStatus.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function IncidentTrendChart({ className }: ChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Incident Trends (7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData.incidentTrend}>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Bar dataKey="critical" name="Critical" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="warning" name="Warning" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="info" name="Info" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function WhiTrendChart({ className }: ChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Washroom Hygiene Index — 24h Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData.whiTrend}>
            <defs>
              <linearGradient id="whiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="avgWhi" stroke="#3b82f6" fill="url(#whiGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function FootfallChart({ className }: ChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Footfall Analysis — 24h</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={chartData.footfallData}>
            <defs>
              <linearGradient id="footGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridStyle} />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="count" stroke="#8b5cf6" fill="url(#footGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function TerminalPerformanceChart({ className }: ChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Terminal Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData.terminalPerformance} layout="vertical">
            <CartesianGrid {...gridStyle} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Bar dataKey="whi" name="WHI" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="cleanliness" name="Cleanliness" fill="#10b981" radius={[0, 4, 4, 0]} />
            <Bar dataKey="devices" name="Devices" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function WashroomGrid({ washrooms }: { washrooms: Washroom[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-emerald-500";
      case "maintenance": return "bg-amber-500";
      case "out_of_order": return "bg-red-500";
      default: return "bg-slate-400";
    }
  };

  const getWhiBarColor = (whi: number) => {
    if (whi >= 80) return "bg-emerald-500";
    if (whi >= 60) return "bg-amber-500";
    if (whi >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {washrooms.map((wr) => (
        <div
          key={wr.id}
          className="bg-white rounded-xl border border-slate-200 p-3 lg:p-4 hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer v3-card-hover"
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] lg:text-xs font-semibold text-slate-600 truncate">{wr.name}</span>
            <span className={`w-2 h-2 rounded-full shrink-0 ${getStatusColor(wr.status)}`} />
          </div>
          <div className="space-y-2.5">
            <div>
              <div className="flex items-center justify-between text-[10px] lg:text-xs mb-1">
                <span className="text-slate-500">WHI</span>
                <span className="font-bold text-slate-700">{wr.whi}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getWhiBarColor(wr.whi)}`}
                  style={{ width: `${wr.whi}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] lg:text-xs">
              <span className="text-slate-400">Footfall</span>
              <span className="font-medium text-slate-600">{wr.footfall}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
