# UI Components

Shared, reusable UI components used across all portals.

## Components

| Component | Purpose |
|-----------|---------|
| `Button` | Multi-variant button with loading state |
| `Card` | Container with header, content, footer |
| `Input` | Form input with label, error, icon |
| `Select` | Dropdown select with label |
| `Badge` | Status/label badges |
| `Alert` | Alert messages (info, success, warning, error) |
| `Modal` | Dialog overlay with close |
| `DataTable` | Table with pagination |
| `SearchInput` | Search input with clear button |
| `MetricCard` | Dashboard metric display |
| `Dropdown` | Menu dropdown |
| `Skeleton` | Loading placeholder |

## Conventions

- All components use `forwardRef` for ref forwarding
- Consistent `className` merging via `cn()` utility
- Variant-based styling (not conditional classes)
- TypeScript interfaces for all props
- Exported as named exports