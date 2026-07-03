# Custom Hooks

Reusable React hooks for shared logic.

## Hooks

### `useAuth(requiredRole?)`
Authentication hook that:
- Checks session on mount
- Redirects to login if not authenticated
- Redirects to correct portal if wrong role
- Returns user, auth state, and helper functions

## Usage

```tsx
const { user, isAuthenticated, isLoading, logout } = useAuth("AAI_ADMIN");
```