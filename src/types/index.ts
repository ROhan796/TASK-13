export type UserRole = "AAI_ADMIN" | "TERMINAL_ADMIN" | "AUDIT_VIEWER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  terminalId?: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface Washroom {
  id: string;
  name: string;
  terminalId: string;
  floor: string;
  zone: string;
  status: "operational" | "maintenance" | "out_of_order";
  whi: number;
  cleanliness: number;
  footfall: number;
  lastCleaned: string;
  sensors: Sensor[];
}

export interface Sensor {
  id: string;
  washroomId: string;
  type: "air_quality" | "moisture" | "occupancy" | "odor" | "temperature" | "humidity";
  value: number;
  unit: string;
  status: "online" | "offline" | "warning" | "error";
  lastReading: string;
  batteryLevel: number;
  rssi: number;
}

export interface Device {
  id: string;
  name: string;
  type: "sensor" | "gateway" | "controller";
  terminalId: string;
  washroomId?: string;
  status: "online" | "offline" | "maintenance";
  batteryLevel: number;
  rssi: number;
  firmwareVersion: string;
  lastSeen: string;
  ip?: string;
}

export interface Terminal {
  id: string;
  name: string;
  code: string;
  location: string;
  totalWashrooms: number;
  operationalWashrooms: number;
  status: "operational" | "partial_outage" | "offline";
  manager: string;
  contactEmail: string;
  washrooms: Washroom[];
  devices: Device[];
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  terminalId: string;
  washroomId: string;
  type: "maintenance" | "sensor_failure" | "cleanliness" | "security" | "infrastructure";
  priority: "P1" | "P2" | "P3" | "P4";
  status: "active" | "acknowledged" | "in_progress" | "resolved" | "closed";
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  reportedBy: string;
  terminalName?: string;
  washroomName?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: "login" | "logout" | "create" | "update" | "delete" | "view" | "export" | "acknowledge" | "resolve" | "assign" | "settings_change" | "system_event";
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  terminalId?: string;
  severity: "info" | "warning" | "error" | "critical";
  category: "auth" | "washroom" | "device" | "incident" | "user" | "system" | "audit" | "settings";
}

export interface DashboardMetrics {
  totalWashrooms: number;
  operationalWashrooms: number;
  activeIncidents: number;
  criticalIncidents: number;
  onlineDevices: number;
  totalDevices: number;
  avgWhi: number;
  avgCleanliness: number;
  totalFootfall: number;
  onlineTerminals: number;
  totalTerminals: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  timestamp?: string;
}

export interface WashroomChartData {
  floor: string;
  operational: number;
  maintenance: number;
  outOfOrder: number;
}

export interface IncidentChartData {
  type: string;
  count: number;
  color: string;
}

export interface TimeSeriesData {
  timestamp: string;
  value: number;
  label?: string;
}

export interface FilterOptions {
  search?: string;
  status?: string;
  priority?: string;
  type?: string;
  terminalId?: string;
  floor?: string;
  dateFrom?: string;
  dateTo?: string;
  severity?: string;
  category?: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface SettingsData {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    criticalOnly: boolean;
  };
  thresholds: {
    whiWarning: number;
    whiCritical: number;
    cleanlinessWarning: number;
    cleanlinessCritical: number;
    batteryLow: number;
  };
  display: {
    theme: "light" | "dark" | "system";
    language: string;
    timezone: string;
    refreshInterval: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  pagination?: PaginationState;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
