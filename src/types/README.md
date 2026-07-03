# TypeScript Types

Centralized type definitions for the entire application.

## Key Types

| Type | Purpose |
|------|---------|
| `UserRole` | Union type: AAI_ADMIN, TERMINAL_ADMIN, AUDIT_VIEWER |
| `User` | User account data |
| `Washroom` | Washroom with sensors and status |
| `Sensor` | Individual sensor readings |
| `Device` | IoT device (sensor/gateway/controller) |
| `Terminal` | Airport terminal |
| `Incident` | System incident |
| `AuditLogEntry` | Immutable audit log entry |
| `DashboardMetrics` | Aggregated dashboard data |
| `SettingsData` | System configuration |

## Conventions

- All interfaces use `export interface`
- Union types use `export type`
- Optional fields marked with `?`
- Consistent naming: PascalCase for types