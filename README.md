# AAI Washroom Monitoring System

Enterprise-grade washroom monitoring and management platform for Airports Authority of India.

Three portals consolidated into one Next.js application, each preserving its original visual identity.

## System Architecture

```
aai-washroom-monitoring/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout (Google Fonts, CSS)
│   │   ├── globals.css             # All three portals' design tokens
│   │   ├── login/                  # V3-style login page
│   │   ├── admin/                  # V3 Admin Portal (blue theme)
│   │   │   ├── layout.tsx         # Admin layout with V3 sidebar + header
│   │   │   ├── dashboard/
│   │   │   ├── terminals/
│   │   │   ├── washrooms/
│   │   │   ├── incidents/
│   │   │   ├── devices/
│   │   │   ├── users/
│   │   │   ├── audit-logs/
│   │   │   └── settings/
│   │   ├── terminal/               # V1 Terminal Portal (green theme)
│   │   │   ├── layout.tsx         # Terminal layout with V1 sidebar + header
│   │   │   ├── dashboard/
│   │   │   ├── washrooms/
│   │   │   ├── incidents/
│   │   │   ├── devices/
│   │   │   └── settings/
│   │   └── audit/                  # AUDIT Portal (dark navy theme)
│   │       ├── layout.tsx         # Audit layout with dark sidebar
│   │       ├── dashboard/
│   │       ├── logs/
│   │       └── search/
│   ├── components/
│   │   ├── layout/                 # Portal-specific layout components
│   │   │   ├── v3-sidebar.tsx     # V3 Admin sidebar (240px, blue)
│   │   │   ├── v3-header.tsx      # V3 Admin header (sticky, blur)
│   │   │   ├── v1-sidebar.tsx     # V1 Terminal sidebar (260px, green)
│   │   │   ├── v1-header.tsx      # V1 Terminal header (fixed, 80px)
│   │   │   ├── v1-footer.tsx      # V1 Terminal footer
│   │   │   ├── audit-sidebar.tsx  # Audit dark sidebar (#1a2b4b)
│   │   │   └── audit-header.tsx   # Audit white header
│   │   ├── ui/                     # Shared UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── search-input.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── metric-card.tsx
│   │   │   ├── select.tsx
│   │   │   ├── alert.tsx
│   │   │   └── dropdown.tsx
│   │   └── charts/
│   │       └── dashboard-charts.tsx
│   ├── store/                      # Zustand state management
│   │   ├── auth-store.ts          # JWT auth, cookies, localStorage
│   │   └── notifications-store.ts
│   ├── hooks/
│   │   └── use-auth.ts            # Route protection, role redirects
│   ├── lib/
│   │   ├── utils.ts               # cn(), formatDate, status colors
│   │   ├── api-client.ts          # Centralized HTTP client
│   │   └── mock-data.ts           # Complete mock data for all portals
│   └── types/
│       └── index.ts               # TypeScript type definitions
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand 5
- **Charts:** Recharts
- **Icons:** Material Symbols Outlined (V1, V3), Lucide React (Audit)

## Portals

### V3 Admin Portal (`/admin`) — Blue Theme
Full system administration with blue primary color, Plus Jakarta Sans font, glass morphism, and modern M3-inspired design. Manages terminals, washrooms, devices, users, incidents, audit logs, and settings.

### V1 Terminal Portal (`/terminal`) — Green Theme
Terminal-specific operations with green primary color, Hanken Grotesk font, rounded cards, and warm Material Design 3 aesthetic. Monitors washrooms, devices, and incidents for a single terminal.

### AUDIT Portal (`/audit`) — Dark Navy Theme
Read-only audit log viewer with dark navy sidebar (#1a2b4b), Inter font, monospace timestamps, and enterprise command-center aesthetic. Advanced search, filtering, and export capabilities.

## Authentication

Custom JWT-based authentication with role-based access control (RBAC). Tokens stored in both cookies and localStorage with 8-hour expiry.

| Role | Access |
|------|--------|
| `AAI_ADMIN` | Full system access → `/admin/dashboard` |
| `TERMINAL_ADMIN` | Terminal-specific access → `/terminal/dashboard` |
| `AUDIT_VIEWER` | Read-only audit access → `/audit/dashboard` |

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| AAI Admin | admin@aai.local | Password123! |
| Terminal Admin | terminal1@aai.local | Password123! |
| Audit Viewer | audit@aai.local | Password123! |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=AAI Washroom Monitoring System
NEXT_PUBLIC_JWT_SECRET=your-secret-key
NEXT_PUBLIC_JWT_REFRESH_SECRET=your-refresh-secret
```

## Code Standards

- TypeScript strict mode enabled
- ESLint with Next.js recommended config
- Zero UI redesign policy — each portal preserves its original visual identity
- Portal-specific CSS tokens (v1-*, v3-*, audit-*) in globals.css
- Component-based architecture with shared UI primitives
- Consistent naming conventions
- No placeholder implementations
- No duplicate code
- README.md in every important folder

## Future Roadmap

- Real-time WebSocket integration
- Backend API integration
- PWA support
- Internationalization (Hindi, English)
- Dark mode
- Mobile responsive optimization
- Export to PDF/Excel
- Email/SMS notification integration
