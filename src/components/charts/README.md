# Chart Components

Reusable chart components using Recharts.

## Charts

| Component | Type | Purpose |
|-----------|------|---------|
| `WashroomStatusPieChart` | Pie | Washroom status distribution |
| `IncidentTrendChart` | Bar | 7-day incident trends |
| `WhiTrendChart` | Area | 24h WHI score trend |
| `FootfallChart` | Area | 24h footfall analysis |
| `TerminalPerformanceChart` | Bar | Terminal comparison |
| `WashroomGrid` | Grid | Visual washroom status grid |

## Conventions

- All charts use `ResponsiveContainer` for responsive sizing
- Consistent tooltip styling (dark background)
- Data passed via props for flexibility
- Color palette: emerald, amber, red, blue, violet, cyan