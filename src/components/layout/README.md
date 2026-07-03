# Layout Components

Layout components that define the portal structure.

## Components

| Component | Purpose |
|-----------|---------|
| `Sidebar` | Role-based collapsible navigation sidebar |
| `TopHeader` | Top bar with search, notifications, user menu |
| `PortalLayout` | Combines Sidebar + TopHeader + main content |
| `Footer` | Simple copyright footer |

## Architecture

The `PortalLayout` is the main layout wrapper used by all three portals. It:
1. Checks authentication via `useAuth()` hook
2. Renders `Sidebar` with role-appropriate navigation items
3. Renders `TopHeader` with user info and notifications
4. Renders children in the main content area with left margin for sidebar

## Role-Based Navigation

The Sidebar dynamically shows different menu items based on user role:
- **AAI_ADMIN**: All navigation items
- **TERMINAL_ADMIN**: Terminal-specific items
- **AUDIT_VIEWER**: Audit-specific items