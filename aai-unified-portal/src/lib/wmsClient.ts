/**
 * Server-side WMS Backend client with automatic JWT token management.
 * Tokens are cached in module-level memory — NEVER sent to the browser.
 * Uses the dashboard_operator service account for read-only dashboard access.
 */

const WMS_BASE_URL = process.env.NEXT_PUBLIC_WMS_API_URL ?? 'https://localhost:443';
const WMS_USER = process.env.WMS_JWT_OPERATOR_USER ?? 'operator';
const WMS_PASS = process.env.WMS_JWT_OPERATOR_PASS ?? '';

interface TokenCache {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp ms
}

let tokenCache: TokenCache | null = null;

async function fetchWithNoTLSVerify(url: string, options: RequestInit = {}): Promise<Response> {
  // In dev/self-signed CA environments, trust is configured via NODE_EXTRA_CA_CERTS env var.
  // In production, remove this and use a proper cert chain.
  return fetch(url, {
    ...options,
    // @ts-ignore — Node.js fetch supports this
    dispatcher: undefined,
  });
}

async function login(): Promise<TokenCache> {
  const res = await fetchWithNoTLSVerify(`${WMS_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: WMS_USER, password: WMS_PASS }),
  });

  if (!res.ok) {
    throw new Error(`WMS login failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  const now = Date.now();
  // Access token expires in 15 minutes; we cache for 13 minutes to refresh 2 min early
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: now + 13 * 60 * 1000,
  };
}

async function refreshTokens(refreshToken: string): Promise<TokenCache> {
  const res = await fetchWithNoTLSVerify(`${WMS_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) {
    // Refresh failed — re-login from scratch
    return login();
  }

  const data = await res.json();
  const now = Date.now();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: now + 13 * 60 * 1000,
  };
}

async function getValidToken(): Promise<string> {
  const now = Date.now();

  if (!tokenCache) {
    tokenCache = await login();
    return tokenCache.accessToken;
  }

  if (now >= tokenCache.expiresAt) {
    tokenCache = await refreshTokens(tokenCache.refreshToken);
  }

  return tokenCache.accessToken;
}

export async function wmsGet<T>(path: string): Promise<T> {
  const token = await getValidToken();
  const res = await fetchWithNoTLSVerify(`${WMS_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (res.status === 401) {
    // Force re-auth and retry once
    tokenCache = null;
    const newToken = await getValidToken();
    const retryRes = await fetchWithNoTLSVerify(`${WMS_BASE_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${newToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    if (!retryRes.ok) throw new Error(`WMS API error: ${retryRes.status}`);
    return retryRes.json();
  }

  if (!res.ok) throw new Error(`WMS API error: ${res.status} on ${path}`);
  return res.json();
}

export async function wmsPost<T>(path: string, body: unknown): Promise<T> {
  const token = await getValidToken();
  const res = await fetchWithNoTLSVerify(`${WMS_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (res.status === 401) {
    tokenCache = null;
    const newToken = await getValidToken();
    const retryRes = await fetchWithNoTLSVerify(`${WMS_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${newToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
    if (!retryRes.ok) throw new Error(`WMS API error: ${retryRes.status}`);
    return retryRes.json();
  }

  if (!res.ok) throw new Error(`WMS API error: ${res.status} on ${path}`);
  return res.json();
}
