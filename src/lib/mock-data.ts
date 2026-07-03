import type {
  User,
  Washroom,
  Sensor,
  Device,
  Terminal,
  Incident,
  AuditLogEntry,
  DashboardMetrics,
  Notification,
  SettingsData,
} from "@/types";

export const mockUsers: User[] = [
  {
    id: "usr-001",
    email: "admin@aai.local",
    name: "Rajesh Kumar",
    role: "AAI_ADMIN",
    avatar: "/avatars/admin.png",
    createdAt: "2024-01-15T08:00:00Z",
    lastLogin: "2026-06-28T09:15:00Z",
  },
  {
    id: "usr-002",
    email: "terminal1@aai.local",
    name: "Priya Sharma",
    role: "TERMINAL_ADMIN",
    terminalId: "T-001",
    avatar: "/avatars/terminal.png",
    createdAt: "2024-03-20T10:00:00Z",
    lastLogin: "2026-06-28T08:30:00Z",
  },
  {
    id: "usr-003",
    email: "audit@aai.local",
    name: "Amit Patel",
    role: "AUDIT_VIEWER",
    avatar: "/avatars/audit.png",
    createdAt: "2024-06-01T09:00:00Z",
    lastLogin: "2026-06-27T14:45:00Z",
  },
];

export const demoCredentials = {
  AAI_ADMIN: { email: "admin@aai.local", password: "Password123!" },
  TERMINAL_ADMIN: { email: "terminal1@aai.local", password: "Password123!" },
  AUDIT_VIEWER: { email: "audit@aai.local", password: "Password123!" },
};

export const mockSensors: Sensor[] = [
  { id: "SEN-001", washroomId: "WR-001", type: "air_quality", value: 85, unit: "AQI", status: "online", lastReading: "2026-06-28T09:15:00Z", batteryLevel: 92, rssi: -45 },
  { id: "SEN-002", washroomId: "WR-001", type: "moisture", value: 42, unit: "%", status: "online", lastReading: "2026-06-28T09:15:00Z", batteryLevel: 88, rssi: -52 },
  { id: "SEN-003", washroomId: "WR-001", type: "occupancy", value: 1, unit: "bool", status: "online", lastReading: "2026-06-28T09:14:30Z", batteryLevel: 95, rssi: -38 },
  { id: "SEN-004", washroomId: "WR-001", type: "odor", value: 22, unit: "ppm", status: "online", lastReading: "2026-06-28T09:15:00Z", batteryLevel: 90, rssi: -48 },
  { id: "SEN-005", washroomId: "WR-001", type: "temperature", value: 26.5, unit: "°C", status: "online", lastReading: "2026-06-28T09:15:00Z", batteryLevel: 94, rssi: -42 },
  { id: "SEN-006", washroomId: "WR-001", type: "humidity", value: 58, unit: "%", status: "online", lastReading: "2026-06-28T09:15:00Z", batteryLevel: 91, rssi: -44 },
  { id: "SEN-007", washroomId: "WR-002", type: "air_quality", value: 62, unit: "AQI", status: "online", lastReading: "2026-06-28T09:14:00Z", batteryLevel: 78, rssi: -58 },
  { id: "SEN-008", washroomId: "WR-002", type: "moisture", value: 35, unit: "%", status: "warning", lastReading: "2026-06-28T09:10:00Z", batteryLevel: 15, rssi: -72 },
  { id: "SEN-009", washroomId: "WR-003", type: "air_quality", value: 38, unit: "AQI", status: "online", lastReading: "2026-06-28T09:15:00Z", batteryLevel: 85, rssi: -50 },
  { id: "SEN-010", washroomId: "WR-003", type: "occupancy", value: 0, unit: "bool", status: "offline", lastReading: "2026-06-28T08:45:00Z", batteryLevel: 5, rssi: -85 },
  { id: "SEN-011", washroomId: "WR-004", type: "air_quality", value: 91, unit: "AQI", status: "online", lastReading: "2026-06-28T09:15:00Z", batteryLevel: 88, rssi: -46 },
  { id: "SEN-012", washroomId: "WR-005", type: "air_quality", value: 73, unit: "AQI", status: "online", lastReading: "2026-06-28T09:14:30Z", batteryLevel: 82, rssi: -55 },
];

export const mockWashrooms: Washroom[] = [
  { id: "WR-001", name: "Terminal 1 - Ground Floor - Male", terminalId: "T-001", floor: "Ground", zone: "A", status: "operational", whi: 87, cleanliness: 92, footfall: 342, lastCleaned: "2026-06-28T08:30:00Z", sensors: mockSensors.filter(s => s.washroomId === "WR-001") },
  { id: "WR-002", name: "Terminal 1 - Ground Floor - Female", terminalId: "T-001", floor: "Ground", zone: "A", status: "operational", whi: 72, cleanliness: 78, footfall: 285, lastCleaned: "2026-06-28T07:45:00Z", sensors: mockSensors.filter(s => s.washroomId === "WR-002") },
  { id: "WR-003", name: "Terminal 1 - First Floor - Male", terminalId: "T-001", floor: "First", zone: "B", status: "maintenance", whi: 45, cleanliness: 52, footfall: 198, lastCleaned: "2026-06-27T22:00:00Z", sensors: mockSensors.filter(s => s.washroomId === "WR-003") },
  { id: "WR-004", name: "Terminal 2 - Ground Floor - Male", terminalId: "T-002", floor: "Ground", zone: "A", status: "operational", whi: 93, cleanliness: 95, footfall: 412, lastCleaned: "2026-06-28T09:00:00Z", sensors: mockSensors.filter(s => s.washroomId === "WR-004") },
  { id: "WR-005", name: "Terminal 2 - Ground Floor - Female", terminalId: "T-002", floor: "Ground", zone: "B", status: "operational", whi: 78, cleanliness: 82, footfall: 367, lastCleaned: "2026-06-28T08:15:00Z", sensors: mockSensors.filter(s => s.washroomId === "WR-005") },
  { id: "WR-006", name: "Terminal 2 - First Floor - Male", terminalId: "T-002", floor: "First", zone: "A", status: "out_of_order", whi: 12, cleanliness: 18, footfall: 0, lastCleaned: "2026-06-25T14:00:00Z", sensors: [] },
  { id: "WR-007", name: "Terminal 3 - Ground Floor - Male", terminalId: "T-003", floor: "Ground", zone: "A", status: "operational", whi: 81, cleanliness: 85, footfall: 278, lastCleaned: "2026-06-28T08:45:00Z", sensors: [] },
  { id: "WR-008", name: "Terminal 3 - Ground Floor - Female", terminalId: "T-003", floor: "Ground", zone: "B", status: "operational", whi: 88, cleanliness: 90, footfall: 312, lastCleaned: "2026-06-28T09:10:00Z", sensors: [] },
];

export const mockDevices: Device[] = [
  { id: "DEV-001", name: "Gateway T1-GF", type: "gateway", terminalId: "T-001", status: "online", batteryLevel: 100, rssi: -30, firmwareVersion: "3.2.1", lastSeen: "2026-06-28T09:15:00Z", ip: "192.168.1.101" },
  { id: "DEV-002", name: "Gateway T1-FF", type: "gateway", terminalId: "T-001", status: "online", batteryLevel: 100, rssi: -35, firmwareVersion: "3.2.1", lastSeen: "2026-06-28T09:15:00Z", ip: "192.168.1.102" },
  { id: "DEV-003", name: "Sensor Cluster WR-001", type: "sensor", terminalId: "T-001", washroomId: "WR-001", status: "online", batteryLevel: 92, rssi: -45, firmwareVersion: "2.1.0", lastSeen: "2026-06-28T09:15:00Z" },
  { id: "DEV-004", name: "Sensor Cluster WR-002", type: "sensor", terminalId: "T-001", washroomId: "WR-002", status: "online", batteryLevel: 15, rssi: -72, firmwareVersion: "2.1.0", lastSeen: "2026-06-28T09:10:00Z" },
  { id: "DEV-005", name: "Sensor Cluster WR-003", type: "sensor", terminalId: "T-001", washroomId: "WR-003", status: "offline", batteryLevel: 5, rssi: -85, firmwareVersion: "2.0.8", lastSeen: "2026-06-28T08:45:00Z" },
  { id: "DEV-006", name: "Gateway T2-GF", type: "gateway", terminalId: "T-002", status: "online", batteryLevel: 100, rssi: -28, firmwareVersion: "3.2.1", lastSeen: "2026-06-28T09:15:00Z", ip: "192.168.2.101" },
  { id: "DEV-007", name: "Sensor Cluster WR-004", type: "sensor", terminalId: "T-002", washroomId: "WR-004", status: "online", batteryLevel: 88, rssi: -46, firmwareVersion: "2.1.0", lastSeen: "2026-06-28T09:15:00Z" },
  { id: "DEV-008", name: "Sensor Cluster WR-005", type: "sensor", terminalId: "T-002", washroomId: "WR-005", status: "online", batteryLevel: 82, rssi: -55, firmwareVersion: "2.1.0", lastSeen: "2026-06-28T09:14:30Z" },
  { id: "DEV-009", name: "Controller T3", type: "controller", terminalId: "T-003", status: "maintenance", batteryLevel: 100, rssi: -40, firmwareVersion: "1.5.2", lastSeen: "2026-06-28T07:00:00Z", ip: "192.168.3.101" },
  { id: "DEV-010", name: "Gateway T3-GF", type: "gateway", terminalId: "T-003", status: "online", batteryLevel: 100, rssi: -32, firmwareVersion: "3.2.1", lastSeen: "2026-06-28T09:15:00Z", ip: "192.168.3.101" },
];

export const mockTerminals: Terminal[] = [
  { id: "T-001", name: "Terminal 1", code: "T1", location: "Indira Gandhi International Airport", totalWashrooms: 3, operationalWashrooms: 2, status: "partial_outage", manager: "Priya Sharma", contactEmail: "terminal1@aai.local", washrooms: mockWashrooms.filter(w => w.terminalId === "T-001"), devices: mockDevices.filter(d => d.terminalId === "T-001") },
  { id: "T-002", name: "Terminal 2", code: "T2", location: "Indira Gandhi International Airport", totalWashrooms: 3, operationalWashrooms: 2, status: "partial_outage", manager: "Vikram Singh", contactEmail: "terminal2@aai.local", washrooms: mockWashrooms.filter(w => w.terminalId === "T-002"), devices: mockDevices.filter(d => d.terminalId === "T-002") },
  { id: "T-003", name: "Terminal 3", code: "T3", location: "Chhatrapati Shivaji Maharaj International Airport", totalWashrooms: 2, operationalWashrooms: 2, status: "operational", manager: "Anita Desai", contactEmail: "terminal3@aai.local", washrooms: mockWashrooms.filter(w => w.terminalId === "T-003"), devices: mockDevices.filter(d => d.terminalId === "T-003") },
];

export const mockIncidents: Incident[] = [
  { id: "INC-001", title: "Sensor Offline - WR-003", description: "All sensors in Terminal 1 First Floor Male washroom have gone offline. Battery critically low.", terminalId: "T-001", washroomId: "WR-003", type: "sensor_failure", priority: "P1", status: "active", assignedTo: "Ravi Kumar", createdAt: "2026-06-28T08:50:00Z", updatedAt: "2026-06-28T08:50:00Z", reportedBy: "System", terminalName: "Terminal 1", washroomName: "T1 - FF - Male" },
  { id: "INC-002", title: "Low Battery Warning - WR-002", description: "Moisture sensor battery at 15%. Replacement required within 48 hours.", terminalId: "T-001", washroomId: "WR-002", type: "sensor_failure", priority: "P3", status: "acknowledged", assignedTo: "Suresh Menon", createdAt: "2026-06-28T07:30:00Z", updatedAt: "2026-06-28T08:00:00Z", reportedBy: "System", terminalName: "Terminal 1", washroomName: "T1 - GF - Female" },
  { id: "INC-003", title: "Plumbing Issue - WR-006", description: "Major plumbing failure in Terminal 2 First Floor Male washroom. Water leakage from ceiling.", terminalId: "T-002", washroomId: "WR-006", type: "infrastructure", priority: "P1", status: "in_progress", assignedTo: "Maintenance Team B", createdAt: "2026-06-27T16:00:00Z", updatedAt: "2026-06-28T06:00:00Z", reportedBy: "Priya Mehta", terminalName: "Terminal 2", washroomName: "T2 - FF - Male" },
  { id: "INC-004", title: "WHI Drop Alert - WR-005", description: "Washroom Hygiene Index dropped below threshold. Cleaning crew dispatched.", terminalId: "T-002", washroomId: "WR-005", type: "cleanliness", priority: "P2", status: "resolved", assignedTo: "Cleaning Team A", createdAt: "2026-06-28T06:00:00Z", updatedAt: "2026-06-28T07:30:00Z", resolvedAt: "2026-06-28T07:30:00Z", reportedBy: "System", terminalName: "Terminal 2", washroomName: "T2 - GF - Female" },
  { id: "INC-005", title: "Controller Firmware Update", description: "Scheduled firmware update for Terminal 3 controller. Maintenance window.", terminalId: "T-003", washroomId: "", type: "maintenance", priority: "P4", status: "in_progress", assignedTo: "IT Team", createdAt: "2026-06-28T05:00:00Z", updatedAt: "2026-06-28T07:00:00Z", reportedBy: "Anita Desai", terminalName: "Terminal 3", washroomName: "" },
  { id: "INC-006", title: "Unauthorized Access Attempt", description: "Multiple failed login attempts detected from unknown IP address.", terminalId: "", washroomId: "", type: "security", priority: "P2", status: "active", createdAt: "2026-06-28T03:15:00Z", updatedAt: "2026-06-28T03:15:00Z", reportedBy: "Security System" },
  { id: "INC-007", title: "Temperature Anomaly - WR-001", description: "Temperature reading spike detected. HVAC system may need inspection.", terminalId: "T-001", washroomId: "WR-001", type: "sensor_failure", priority: "P3", status: "active", createdAt: "2026-06-28T09:00:00Z", updatedAt: "2026-06-28T09:00:00Z", reportedBy: "System", terminalName: "Terminal 1", washroomName: "T1 - GF - Male" },
];

export const mockAuditLogs: AuditLogEntry[] = [
  { id: "AUD-001", timestamp: "2026-06-28T09:15:23Z", userId: "usr-001", userName: "Rajesh Kumar", userRole: "AAI_ADMIN", action: "login", resource: "auth", resourceId: "usr-001", details: "Successful login from Chrome on Windows", ipAddress: "10.0.1.52", userAgent: "Mozilla/5.0 Chrome/131", severity: "info", category: "auth" },
  { id: "AUD-002", timestamp: "2026-06-28T09:10:05Z", userId: "usr-002", userName: "Priya Sharma", userRole: "TERMINAL_ADMIN", action: "acknowledge", resource: "incident", resourceId: "INC-002", details: "Acknowledged incident: Low Battery Warning - WR-002", ipAddress: "10.0.2.31", userAgent: "Mozilla/5.0 Firefox/133", severity: "info", category: "incident", terminalId: "T-001" },
  { id: "AUD-003", timestamp: "2026-06-28T09:05:41Z", userId: "sys", userName: "System", userRole: "AAI_ADMIN", action: "system_event", resource: "sensor", resourceId: "SEN-010", details: "Sensor SEN-010 went offline. Battery level: 5%", ipAddress: "192.168.1.1", userAgent: "System/3.2.1", severity: "critical", category: "device", terminalId: "T-001" },
  { id: "AUD-004", timestamp: "2026-06-28T08:55:12Z", userId: "usr-001", userName: "Rajesh Kumar", userRole: "AAI_ADMIN", action: "update", resource: "settings", resourceId: "thresholds", details: "Updated WHI warning threshold from 55 to 60", ipAddress: "10.0.1.52", userAgent: "Mozilla/5.0 Chrome/131", severity: "info", category: "settings" },
  { id: "AUD-005", timestamp: "2026-06-28T08:50:33Z", userId: "sys", userName: "System", userRole: "AAI_ADMIN", action: "system_event", resource: "incident", resourceId: "INC-001", details: "Auto-created incident: Sensor Offline - WR-003. Priority: P1", ipAddress: "192.168.1.1", userAgent: "System/3.2.1", severity: "critical", category: "incident", terminalId: "T-001" },
  { id: "AUD-006", timestamp: "2026-06-28T08:45:00Z", userId: "usr-003", userName: "Amit Patel", userRole: "AUDIT_VIEWER", action: "view", resource: "audit_logs", resourceId: "*", details: "Accessed audit log dashboard. Filter: last 24 hours", ipAddress: "10.0.3.18", userAgent: "Mozilla/5.0 Edge/131", severity: "info", category: "audit" },
  { id: "AUD-007", timestamp: "2026-06-28T08:30:15Z", userId: "usr-002", userName: "Priya Sharma", userRole: "TERMINAL_ADMIN", action: "update", resource: "washroom", resourceId: "WR-002", details: "Updated cleaning schedule for Terminal 1 Ground Floor Female", ipAddress: "10.0.2.31", userAgent: "Mozilla/5.0 Firefox/133", severity: "info", category: "washroom", terminalId: "T-001" },
  { id: "AUD-008", timestamp: "2026-06-28T08:15:44Z", userId: "usr-001", userName: "Rajesh Kumar", userRole: "AAI_ADMIN", action: "create", resource: "user", resourceId: "usr-004", details: "Created new user account: test@aai.local with role TERMINAL_ADMIN", ipAddress: "10.0.1.52", userAgent: "Mozilla/5.0 Chrome/131", severity: "warning", category: "user" },
  { id: "AUD-009", timestamp: "2026-06-28T08:00:00Z", userId: "sys", userName: "System", userRole: "AAI_ADMIN", action: "system_event", resource: "system", resourceId: "health", details: "Daily system health check completed. All services operational.", ipAddress: "192.168.1.1", userAgent: "System/3.2.1", severity: "info", category: "system" },
  { id: "AUD-010", timestamp: "2026-06-28T03:15:22Z", userId: "unknown", userName: "Unknown", userRole: "AAI_ADMIN", action: "login", resource: "auth", resourceId: "unknown", details: "Failed login attempt. Invalid credentials. IP flagged.", ipAddress: "203.0.113.42", userAgent: "Mozilla/5.0 Safari/17", severity: "critical", category: "auth" },
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalWashrooms: 8,
  operationalWashrooms: 6,
  activeIncidents: 4,
  criticalIncidents: 2,
  onlineDevices: 7,
  totalDevices: 10,
  avgWhi: 72,
  avgCleanliness: 77,
  totalFootfall: 2194,
  onlineTerminals: 2,
  totalTerminals: 3,
};

export const mockNotifications: Notification[] = [
  { id: "NTF-001", title: "Critical: Sensors Offline", message: "All sensors in T1 - FF - Male are offline. Immediate attention required.", type: "error", timestamp: "2026-06-28T08:50:00Z", read: false, actionUrl: "/admin/incidents" },
  { id: "NTF-002", title: "Incident Acknowledged", message: "Priya Sharma acknowledged Low Battery Warning for WR-002.", type: "info", timestamp: "2026-06-28T09:10:00Z", read: false },
  { id: "NTF-003", title: "Security Alert", message: "Multiple failed login attempts detected from suspicious IP.", type: "warning", timestamp: "2026-06-28T03:15:00Z", read: true },
  { id: "NTF-004", title: "System Health Check", message: "Daily health check completed successfully. All systems operational.", type: "success", timestamp: "2026-06-28T08:00:00Z", read: true },
];

export const mockSettings: SettingsData = {
  notifications: { email: true, sms: true, push: true, criticalOnly: false },
  thresholds: { whiWarning: 60, whiCritical: 40, cleanlinessWarning: 65, cleanlinessCritical: 45, batteryLow: 20 },
  display: { theme: "light", language: "en", timezone: "Asia/Kolkata", refreshInterval: 30 },
};

export const chartData = {
  washroomStatus: [
    { name: "Operational", value: 6, color: "#10b981" },
    { name: "Maintenance", value: 1, color: "#f59e0b" },
    { name: "Out of Order", value: 1, color: "#ef4444" },
  ],
  incidentTrend: [
    { name: "Mon", critical: 2, warning: 5, info: 8 },
    { name: "Tue", critical: 1, warning: 3, info: 12 },
    { name: "Wed", critical: 3, warning: 7, info: 6 },
    { name: "Thu", critical: 0, warning: 4, info: 10 },
    { name: "Fri", critical: 1, warning: 2, info: 15 },
    { name: "Sat", critical: 0, warning: 1, info: 9 },
    { name: "Sun", critical: 2, warning: 3, info: 7 },
  ],
  whiTrend: [
    { name: "00:00", avgWhi: 75 },
    { name: "02:00", avgWhi: 72 },
    { name: "04:00", avgWhi: 68 },
    { name: "06:00", avgWhi: 70 },
    { name: "08:00", avgWhi: 78 },
    { name: "10:00", avgWhi: 82 },
    { name: "12:00", avgWhi: 76 },
    { name: "14:00", avgWhi: 74 },
    { name: "16:00", avgWhi: 80 },
    { name: "18:00", avgWhi: 77 },
    { name: "20:00", avgWhi: 73 },
    { name: "22:00", avgWhi: 71 },
  ],
  footfallData: [
    { name: "00:00", count: 12 },
    { name: "02:00", count: 5 },
    { name: "04:00", count: 8 },
    { name: "06:00", count: 45 },
    { name: "08:00", count: 120 },
    { name: "10:00", count: 185 },
    { name: "12:00", count: 210 },
    { name: "14:00", count: 195 },
    { name: "16:00", count: 175 },
    { name: "18:00", count: 150 },
    { name: "20:00", count: 95 },
    { name: "22:00", count: 40 },
  ],
  terminalPerformance: [
    { name: "Terminal 1", whi: 68, cleanliness: 74, devices: 85 },
    { name: "Terminal 2", whi: 72, cleanliness: 78, devices: 90 },
    { name: "Terminal 3", whi: 85, cleanliness: 88, devices: 95 },
  ],
};

export function getFloorColor(floor: string): string {
  switch (floor) {
    case "Ground": return "text-blue-500";
    case "First": return "text-purple-500";
    case "Second": return "text-pink-500";
    default: return "text-slate-500";
  }
}

export function getIncidentTypeIcon(type: string): string {
  switch (type) {
    case "sensor_failure": return "sensor";
    case "maintenance": return "wrench";
    case "cleanliness": return "sparkles";
    case "security": return "shield";
    case "infrastructure": return "building";
    default: return "alert";
  }
}

export const mockLiveFeed = [
  { id: "feed-001", zone: "Zone A1", whi: 45, message: "High humidity detected — sensor recalibrating", time: "2 min ago", status: "critical" },
  { id: "feed-002", zone: "Zone B2", whi: 78, message: "Optimal conditions — all systems nominal", time: "3 min ago", status: "good" },
  { id: "feed-003", zone: "Zone C1", whi: 62, message: "Moderate airflow — ventilation adjusted", time: "5 min ago", status: "fair" },
  { id: "feed-004", zone: "Zone A2", whi: 81, message: "Air quality excellent — filter status OK", time: "7 min ago", status: "good" },
  { id: "feed-005", zone: "Zone D1", whi: 38, message: "Critical: CO₂ levels elevated — alert triggered", time: "8 min ago", status: "critical" },
  { id: "feed-006", zone: "Zone B1", whi: 73, message: "Temperature stable — occupancy normal", time: "10 min ago", status: "good" },
  { id: "feed-007", zone: "Zone C2", whi: 55, message: "Humidity borderline — monitor active", time: "12 min ago", status: "fair" },
  { id: "feed-008", zone: "Zone E1", whi: 89, message: "All parameters within range", time: "14 min ago", status: "good" },
];
