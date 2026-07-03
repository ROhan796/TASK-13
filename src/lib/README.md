# Library Utilities

Shared utilities and services.

## Files

| File | Purpose |
|------|---------|
| `utils.ts` | General utilities (cn, formatDate, getWhiColor, etc.) |
| `api-client.ts` | Centralized HTTP client with auth headers |
| `mock-data.ts` | Mock data for development |

## API Client

The `apiClient` provides typed HTTP methods:
- `get<T>(url)` - GET request
- `post<T>(url, body)` - POST request
- `put<T>(url, body)` - PUT request
- `patch<T>(url, body)` - PATCH request
- `delete<T>(url)` - DELETE request

All requests include:
- JWT token from cookies/localStorage
- Observability headers (X-Request-Id, X-Timestamp)
- User identification headers
- Automatic 401 handling (logout + redirect)