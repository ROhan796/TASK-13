# State Management

Zustand stores for global state management.

## Stores

### `auth-store.ts`
- User authentication state
- JWT token management
- Login/logout operations
- Session persistence via cookies + localStorage

### `notifications-store.ts`
- Notification state
- Read/unread tracking
- Mark as read functionality

## Patterns

- Stores are created with Zustand's `create` function
- No context providers needed (Zustand is external)
- State is persisted to localStorage where appropriate
- Actions are defined inline within the store