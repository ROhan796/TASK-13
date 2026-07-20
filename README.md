# AAI Smart Washroom System — Full Stack Unification

**Version:** 2.0.0
**Platform:** Airports Authority of India — Civil Aviation Telemetry
**Architecture:** 3-tier (IoT Edge → Data Acquisition → Web Portal)

---

## Table of Contents

- [1. System Architecture](#1-system-architecture)
- [2. Subsystem Overview](#2-subsystem-overview)
- [3. Prerequisites](#3-prerequisites)
- [4. Credentials & API Keys](#4-credentials--api-keys)
- [5. Environment Variables Reference](#5-environment-variables-reference)
- [6. Directory Structure](#6-directory-structure)
- [7. Execution — Step by Step](#7-execution--step-by-step)
- [8. Verification Checks](#8-verification-checks)
- [9. Port Map](#9-port-map)
- [10. Known Issues & Fixes](#10-known-issues--fixes)
- [11. API Reference](#11-api-reference)
- [12. Stopping All Services](#12-stopping-all-services)
- [13. File Manifest (Code Changes)](#13-file-manifest-code-changes)

---

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    AAI Smart Washroom System                     │
├──────────────────┬──────────────────┬───────────────────────────┤
│  WMS Backend     │   DA Engine      │   Unified Portal          │
│  (Docker Only)   │   (Docker)       │   (Next.js Dev)           │
├──────────────────┼──────────────────┼───────────────────────────┤
│ EMQX x3 (MQTT)  │ NSCBI API Client │ Clerk Authentication      │
│ FastAPI Worker   │ APScheduler      │ Admin / Operator / Audit  │
│ HAProxy x2       │ WHI Calculator   │ DA + WMS Proxy Routes     │
│ Redis (state)    │ Incident Detect  │ Drizzle ORM → Neon PG     │
│ TimescaleDB      │ Cache + Snapshots│ Recharts Dashboards       │
│ Keepalived x2    │                  │                           │
├──────────────────┼──────────────────┼───────────────────────────┤
│ Port 443 (HTTPS) │ Port 8001 (HTTP) │ Port 3000 (HTTP)          │
│ Port 8883 (mTLS) │                  │                           │
│ Port 18083 (Dash)│                  │                           │
└──────────────────┴──────────────────┴───────────────────────────┘
         │                  │                    │
         │                  │              ┌─────┴─────┐
         │                  │              │  Browser   │
         │                  │              │  (Clerk)   │
         │                  │              └───────────┘
         │                  │
    ┌────┴────┐       ┌────┴────┐
    │ MQTT    │       │ NSCBI   │
    │ Pico    │       │ Airport │
    │ Devices │       │  API    │
    └─────────┘       └─────────┘
```

**Data Flow:**
```
IoT Sensors (pico-*) → EMQX MQTT → FastAPI Batcher → TimescaleDB
                                                       ↓
NSCBI Airport API → DA Engine (polls every 30s) → WHI Calculator → Cache
                                                       ↓
                              Portal (Next.js) ← API Proxies ← Clerk Auth
```

---

## 2. Subsystem Overview

### 2.1 WMS Backend (aai-wms-backend/)
**Technology:** Python FastAPI + EMQX 5.8 + TimescaleDB + Redis + HAProxy
**Runs via:** Docker Compose (10 containers, all ENVs from Docker Secrets)
**Purpose:** Ingests MQTT telemetry from physical IoT pico-devices, computes WHI at the edge, manages incident state machine, serves JWT-authenticated REST API.

**Docker Containers:**
| Container | Image | Role |
|-----------|-------|------|
| `emqx1/2/3` | emqx:5.8 | MQTT broker cluster (mTLS) |
| `haproxy1/2` | haproxy:2.8-alpine | Load balancer (ports 443, 8883, 18083) |
| `keepalived1/2` | osixia/keepalived:2.0.20 | VIP failover |
| `fastapi` | Custom build | FastAPI ingestion pipeline |
| `washroom-redis` | redis:7.2-alpine | Token bucket + incident state |
| `washroom-timescaledb` | timescale/timescaledb:latest-pg16 | Time-series storage |

### 2.2 DA Engine (da-engine/)
**Technology:** Python FastAPI + APScheduler + httpx
**Runs via:** Docker Compose (1 container)
**Purpose:** Polls the NSCBI Airport API for IoT telemetry files, parses and normalizes sensor payloads, computes WHI scores, detects incidents, caches results for the portal.

**Key Features:**
- Polls `https://api.nscbiairport.com/api/files` every 30 seconds
- Requires `X-API-KEY` header and `device_id` query parameter
- Handles NSCBI API response format: `{"success": true, "data": [{"filename": "..."}]}`
- Maps NSCBI field `nh3` → internal field `ammonia_ppm`
- Supports MOCK mode for offline testing (set `NSCBI_API_BASE_URL=MOCK`)

### 2.3 Unified Portal (aai-unified-portal/)
**Technology:** Next.js 16 + Clerk Auth + Drizzle ORM + Tailwind CSS
**Runs via:** npm dev (webpack mode, SWC not available on this Windows)
**Purpose:** Web dashboard with role-based access (Admin, Terminal Operator, Auditor), real-time WHI visualization, incident management, audit logs.

**Pages:**
| Route | Role | Description |
|-------|------|-------------|
| `/sign-in` | Public | Clerk authentication |
| `/admin/dashboard` | Admin (AP-*) | KPIs, WHI overview, incident summary |
| `/admin/terminals` | Admin | Terminal list + detail |
| `/admin/incidents` | Admin | Incident management |
| `/admin/analytics` | Admin | WHI trends, heatmaps |
| `/admin/devices` | Admin | Device network health |
| `/admin/users` | Admin | User management |
| `/terminal` | Operator (TP-*) | Terminal operator view |
| `/terminal/device-status` | Operator | Device status panel |
| `/terminal/floor-heatmap` | Operator | Floor-level heatmap |
| `/audit` | Auditor (ALP-*) | Audit log viewer |
| `/unauthorized` | All | Access denied page |

---

## 3. Prerequisites

### Required Software
| Software | Version | Check Command |
|----------|---------|---------------|
| Docker Desktop | >= 24.x | `docker info` |
| Docker Compose | >= 2.x | `docker compose version` |
| Node.js | >= 20.x | `node --version` |
| npm | >= 10.x | `npm --version` |
| Python | >= 3.11 | `python --version` |
| OpenSSL | Any | `openssl version` |

### Required Ports (must be free before starting)
| Port | Service | Protocol |
|------|---------|----------|
| 443 | HAProxy → FastAPI | HTTPS |
| 3000 | Next.js Portal | HTTP |
| 5433 | TimescaleDB (external) | PostgreSQL |
| 6389 | Redis (external) | Redis |
| 8001 | DA Engine | HTTP |
| 8883 | MQTT over TLS | mTLS |
| 18083 | EMQX Dashboard | HTTPS |

### Check Ports Are Free
```powershell
# Windows
netstat -ano | findstr ":8883 :443 :18083 :8001 :3000 :5433 :6389"
# Should return nothing (all ports free)

# Kill any process using these ports
# Find PID from netstat output, then:
taskkill /PID <PID> /F
```

---

## 4. Credentials & API Keys

### 4.1 NSCBI Airport API (DA Engine)
| Field | Value |
|-------|-------|
| Base URL | `https://api.nscbiairport.com/api` |
| API Key | `EY9kocR7OOFfkJBXXLYrQFs84HEyI1OJDUjJcbwfsDVOqXvcFau3eqBdG6ZHZ2Fe` |
| Authorized Device ID | `MC001` |
| Auth Header | `X-API-KEY: <key>` |
| Upload Endpoint | `POST /api/upload-json` |
| List Files | `GET /api/files?device_id=MC001` |
| Download File | `GET /api/files/{filename}` |

**Important API Notes:**
- `device_id` is **required** on `GET /api/files` (despite docs saying optional)
- File list response format: `{"success": true, "data": [{"filename": "...", ...}]}`
- Upload expects fields: `deviceId`, `temperature`, `humidity`, `timestamp`
- Additional sensor fields: `nh3` (not `ammonia_ppm`), `h2s`

### 4.2 Clerk Authentication (Portal)
| Field | Value |
|-------|-------|
| Publishable Key | `pk_test_anVzdC1qYXZpbGluLTIxLmNsZXJrLmFjY291bnRzLmRldiQ` |
| Secret Key | `sk_test_DlQVPCzoSBMdnqqGVN8r53E1VhkyFq1gtxmTlkyAea` |
| Clerk Instance | `just-javilin-21.clerk.accounts.dev` |
| Sign-In URL | `/sign-in` |
| After Sign-In | `/api/auth/redirect` |

**CRITICAL — Clerk Origin Fix Required:**
The Clerk app must have `http://localhost:3000` in its allowed origins:
1. Go to https://dashboard.clerk.com
2. Select app `just-javilin-21`
3. Configure → Development → Allowed Origins
4. Add `http://localhost:3000`
5. Save

**User Roles (username → role mapping):**
| Username | Role | Redirect After Login |
|----------|------|---------------------|
| `AP-001` | Admin | `/admin/dashboard` |
| `TP-001` | Terminal Operator | `/terminal` |
| `ALP-001` | Auditor | `/audit` |

### 4.3 Neon PostgreSQL (Portal Database)
| Field | Value |
|-------|-------|
| Host | `ep-nameless-brook-ah66rf6f.c-3.us-east-1.aws.neon.tech` |
| Database | `neondb` |
| User | `neondb_owner` |
| Password | `npg_cSwQX39dFCUP` |
| SSL Mode | `require` |

### 4.4 WMS Backend Secrets (Docker Secrets)
All secrets are in `aai-wms-backend/secrets/`:
| File | Used By |
|------|---------|
| `operator_password.txt` | JWT auth (`operator` / `N3fc/fiIi55E3+O4qr4FRw==`) |
| `postgres_password.txt` | TimescaleDB superuser |
| `aai_app_worker_password.txt` | FastAPI DB role |
| `redis_password.txt` | Redis auth |
| `jwt_secret_key.txt` | JWT token signing |
| `emqx_dashboard_password.txt` | EMQX web dashboard |
| `supervisor_password.txt` | Supervisor role |

---

## 5. Environment Variables Reference

### 5.1 DA Engine (.env)
```dotenv
# NSCBI Airport API
NSCBI_API_BASE_URL=https://api.nscbiairport.com/api
NSCBI_API_KEY=EY9kocR7OOFfkJBXXLYrQFs84HEyI1OJDUjJcbwfsDVOqXvcFau3eqBdG6ZHZ2Fe
NSCBI_DEVICE_IDS=MC001

# Polling
POLLING_INTERVAL_SECONDS=30

# Server
DA_ENGINE_HOST=0.0.0.0
DA_ENGINE_PORT=8001

# Logging
ENVIRONMENT=development
LOG_LEVEL=INFO
```

**To switch to MOCK mode (no real API calls):**
```dotenv
NSCBI_API_BASE_URL=MOCK
```

### 5.2 Portal (.env.local)
```dotenv
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_anVzdC1qYXZpbGluLTIxLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_DlQVPCzoSBMdnqqGVN8r53E1VhkyFq1gtxmTlkyAea
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/api/auth/redirect
CLERK_WEBHOOK_SECRET=whsec_REPLACE_ME

# Database
DATABASE_URL=postgresql://neondb_owner:npg_cSwQX39dFCUP@ep-nameless-brook-ah66rf6f.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL=postgresql://neondb_owner:npg_cSwQX39dFCUP@ep-nameless-brook-ah66rf6f.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require

# DA Engine
NEXT_PUBLIC_DA_ENGINE_URL=http://localhost:8001

# WMS Backend
NEXT_PUBLIC_WMS_API_URL=https://localhost:443
WMS_JWT_OPERATOR_USER=operator
WMS_JWT_OPERATOR_PASS=N3fc/fiIi55E3+O4qr4FRw==

# TLS
NODE_EXTRA_CA_CERTS=C:/INTERNSHIP_TASK/TASK16/Fullstack_Unification/aai-wms-backend/certs/ca/ca.crt
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### 5.3 WMS Backend (Docker-managed, NO .env file)
All backend ENVs are injected via Docker Secrets and docker-compose.yml environment blocks. **No .env file is used for the backend.** Secrets are read from `aai-wms-backend/secrets/*.txt` at container startup.

---

## 6. Directory Structure

```
Fullstack_Unification/
├── aai-wms-backend/          # WMS Backend (Docker only)
│   ├── app/                  # FastAPI application code
│   ├── certs/                # TLS certificates (generated by setup_security.sh)
│   │   ├── ca/               # Certificate Authority
│   │   ├── backend/          # FastAPI client certs
│   │   ├── emqx/             # EMQX broker certs
│   │   ├── haproxy/          # HAProxy certs
│   │   ├── postgres/         # PostgreSQL certs
│   │   └── devices/          # IoT device certs
│   ├── db_init/              # PostgreSQL init scripts
│   ├── emqx/                 # EMQX configuration
│   ├── haproxy/              # HAProxy configuration
│   ├── secrets/              # Generated secrets (gitignored)
│   ├── setup_security.sh     # PKI bootstrap script
│   ├── tests/                # MQTT test publishers
│   ├── docker-compose.yml    # 10-container stack
│   └── Dockerfile            # FastAPI image
│
├── da-engine/                # Data Acquisition Engine
│   ├── app/
│   │   ├── acquisition/      # API client, polling, auth, retry
│   │   ├── analytics/        # WHI calculator
│   │   ├── api/              # FastAPI endpoints
│   │   ├── config/           # Settings, constants
│   │   ├── ingestion/        # Parser, validator, normalizer
│   │   ├── models/           # Pydantic models
│   │   ├── processing/       # Preprocessing, feature engineering
│   │   ├── services/         # Business logic
│   │   └── storage/          # Cache, history, snapshots
│   ├── .env                  # Environment variables
│   ├── docker-compose.yml    # Single container
│   ├── Dockerfile            # Python 3.11 image
│   └── requirements.txt      # Python dependencies
│
├── aai-unified-portal/       # Next.js Web Portal
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── admin/        # Admin dashboard pages
│   │   │   ├── api/          # API routes (proxy, auth, webhooks)
│   │   │   ├── terminal/     # Terminal operator pages
│   │   │   ├── audit/        # Auditor pages
│   │   │   └── sign-in/      # Clerk sign-in page
│   │   ├── components/       # React components
│   │   ├── lib/              # wmsClient, daClient, drizzle
│   │   └── db/               # Drizzle schema + migrations
│   ├── .env.local            # Environment variables
│   ├── docker-compose.yml    # (not used — runs via npm)
│   └── package.json          # Node.js dependencies
│
├── start.sh                  # Linux/Mac start script
├── stop.sh                   # Linux/Mac stop script
├── start_portal.bat          # Windows portal start script
└── README.md                 # This file
```

---

## 7. Execution — Step by Step

### 7.1 First-Time Setup (PKI Bootstrap)

The WMS backend requires TLS certificates for mTLS communication. Run once:

```bash
cd Fullstack_Unification/aai-wms-backend
chmod +x setup_security.sh
./setup_security.sh
```

**Verify PKI was created:**
```bash
ls certs/ca/ca.crt certs/ca/ca.key
ls secrets/operator_password.txt secrets/postgres_password.txt
openssl x509 -in certs/ca/ca.crt -text -noout | grep "Subject:"
```

**Expected:** CA cert with subject, 7 secret files in `secrets/`.

### 7.2 Start WMS Backend

```bash
cd Fullstack_Unification/aai-wms-backend
docker compose up -d
```

**Wait for health (up to 2 minutes):**
```bash
docker compose ps
# All services should show "healthy"
```

**Verify EMQX cluster:**
```bash
docker compose exec emqx1 /opt/emqx/bin/emqx ctl cluster info
```

**Verify FastAPI:**
```bash
# Get operator password
cat secrets/operator_password.txt

# Test login
curl -k -X POST https://localhost:443/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"operator","password":"<paste_password>"}'
# Expected: {"access_token":"...","token_type":"bearer"}
```

### 7.3 Start DA Engine

```bash
cd Fullstack_Unification/da-engine
docker compose up -d --build
```

**Verify health:**
```bash
curl http://localhost:8001/api/health
# Expected: {"status":"healthy","api_connectivity":"CONNECTED",...}
```

**Verify data is flowing:**
```bash
curl http://localhost:8001/api/dashboard/summary
# Expected: JSON with washroom data
```

**Upload test data to NSCBI API:**
```bash
curl -X POST https://api.nscbiairport.com/api/upload-json \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: EY9kocR7OOFfkJBXXLYrQFs84HEyI1OJDUjJcbwfsDVOqXvcFau3eqBdG6ZHZ2Fe" \
  -d '{"deviceId":"MC001","temperature":28.5,"humidity":65,"timestamp":"2026-07-17T11:00:00Z","nh3":12.5,"h2s":0.5}'
# Expected: {"success":true,"filename":"MC001_20260717_110000.json",...}
```

### 7.4 Start Portal

**Windows:**
```cmd
cd Fullstack_Unification\aai-unified-portal
set NODE_EXTRA_CA_CERTS=C:\INTERNSHIP_TASK\TASK16\Fullstack_Unification\aai-wms-backend\certs\ca\ca.crt
set NODE_TLS_REJECT_UNAUTHORIZED=0
npx next dev --webpack --port 3000
```

**Linux/Mac:**
```bash
cd Fullstack_Unification/aai-unified-portal
export NODE_EXTRA_CA_CERTS=$(realpath ../aai-wms-backend/certs/ca/ca.crt)
npm install
npx next dev --webpack --port 3000
```

> **Note:** `--webpack` flag is required because Turbopack native bindings are not available on this Windows platform.

**Verify:**
```bash
curl -o /dev/null -w "%{http_code}" http://localhost:3000/sign-in
# Expected: 200
```

### 7.5 Start Everything (Linux/Mac only)

```bash
cd Fullstack_Unification
chmod +x start.sh
./start.sh
```

---

## 8. Verification Checks

Run all checks in order. Fix failures before proceeding.

### 8.1 Docker Health
```bash
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Health}}"
# All 10 WMS containers + 1 DA engine should be "Up" and "healthy"
```

### 8.2 WMS Backend API
```bash
# Login
curl -k -X POST https://localhost:443/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"operator","password":"N3fc/fiIi55E3+O4qr4FRw=="}'

# Dashboard status (with token from login)
curl -k https://localhost:443/dashboard/status \
  -H "Authorization: Bearer <token>"
```

### 8.3 DA Engine
```bash
curl http://localhost:8001/api/health
curl http://localhost:8001/api/dashboard/summary
curl http://localhost:8001/api/washrooms/MC001
```

### 8.4 Portal
```bash
curl -o /dev/null -w "%{http_code}" http://localhost:3000/sign-in          # 200
curl -o /dev/null -w "%{http_code}" http://localhost:3000/unauthorized      # 200
curl -o /dev/null -w "%{http_code}" http://localhost:3000/admin/dashboard   # 307 (Clerk redirect)
```

### 8.5 Portal → DA Engine Proxy
```bash
# From browser (after Clerk sign-in):
# http://localhost:3000/api/da/health → proxies to http://localhost:8001/api/health
```

### 8.6 Portal → WMS Proxy
```bash
# From browser (after Clerk sign-in):
# http://localhost:3000/api/wms/status → proxies to https://localhost:443/dashboard/status
```

---

## 9. Port Map

```
Port    Protocol  Service                    Bind Address
──────  ────────  ────────────────────────   ──────────────
3000    HTTP      Next.js Portal             0.0.0.0
443     HTTPS     HAProxy → FastAPI          0.0.0.0
5433    PostgreSQL TimescaleDB (external)     0.0.0.0
6389    Redis     Redis (external)            0.0.0.0
8001    HTTP      DA Engine                   0.0.0.0
8883    MQTT/TLS  HAProxy → EMQX (mTLS)      0.0.0.0
18083   HTTPS     EMQX Dashboard              0.0.0.0
```

---

## 10. Known Issues & Fixes

### Issue 1: Clerk "Invalid host" Error
**Symptom:** Portal shows `"We were unable to attribute this request to an instance running on Clerk"`
**Cause:** `http://localhost:3000` not in Clerk allowed origins
**Fix:**
1. Go to https://dashboard.clerk.com → your app
2. Configure → Development → Allowed Origins
3. Add `http://localhost:3000`
4. Save and refresh portal

### Issue 2: Turbopack Not Supported on Windows
**Symptom:** `Turbopack is not supported on this platform (win32/x64)`
**Fix:** Use `npx next dev --webpack` or `npx next build --webpack` instead of default Turbopack

### Issue 3: SWC Binary Incompatible
**Symptom:** `next-swc.win32-x64-msvc.node is not a valid Win32 application`
**Cause:** SWC native binary corrupted or architecture mismatch
**Fix:** Already handled — portal runs in dev mode with webpack. For production, use Docker or Linux.

### Issue 4: NSCBI API 422 — device_id Required
**Symptom:** `Client error '422 Unprocessable Entity' for url '.../api/files'`
**Cause:** API requires `device_id` query parameter (docs incorrectly say optional)
**Fix:** Set `NSCBI_DEVICE_IDS=MC001` in `da-engine/.env`

### Issue 5: NSCBI API 403 — Device Not Authorized
**Symptom:** `"Device ID 'XXX' is not authorized for this API key."`
**Cause:** Only `MC001` is authorized for the provided API key
**Fix:** Use `MC001` or request additional device IDs from NSCBI admin

### Issue 6: NSCBI API Returns Dict Entries, Not Strings
**Symptom:** `unhashable type: 'dict'` in polling logs
**Cause:** API returns `[{"filename": "...", ...}]` not `["filename.json"]`
**Fix:** Already fixed in `api_client.py` — extracts `filename` from each dict entry

### Issue 7: NSCBI Field Name Mismatch (nh3 vs ammonia_ppm)
**Symptom:** WHI always shows 0.0% ammonia
**Cause:** NSCBI API sends `nh3` field, DA engine expects `ammonia_ppm`
**Fix:** Already fixed in `preprocessing.py` — maps `nh3` → `ammonia_ppm`

### Issue 8: Self-Signed Certificate Rejection
**Symptom:** `Error: self-signed certificate in certificate chain` in portal
**Fix:** Ensure `NODE_EXTRA_CA_CERTS` points to **absolute path** of `certs/ca/ca.crt`

### Issue 9: Windows Line Endings in Shell Scripts
**Symptom:** `$'\r': command not found` when running `.sh` files
**Fix:**
```bash
sed -i 's/\r//' start.sh stop.sh aai-wms-backend/setup_security.sh
```

### Issue 10: EMQX Cluster Variables Not Set
**Symptom:** Warnings about `EMQX_NODE_COOKIE`, `EMQX_DASHBOARD_USER` not set
**Cause:** Missing `.env` file in `aai-wms-backend/`
**Fix:** These are non-critical warnings. EMQX uses defaults. Create `.env` with:
```dotenv
EMQX_NODE_COOKIE=aai_super_secret_cookie
EMQX_DASHBOARD_USER=admin
EMQX_DASHBOARD_PASSWORD=admin_password
```

---

## 11. API Reference

### 11.1 NSCBI Airport API
```
Base URL: https://api.nscbiairport.com/api
Auth: X-API-KEY header
```

| Method | Endpoint | Description | Required Params |
|--------|----------|-------------|-----------------|
| POST | `/api/upload-json` | Upload JSON telemetry | Body: `deviceId`, `temperature`, `humidity`, `timestamp` |
| POST | `/api/upload-file` | Upload JSON file | Form: `json_file` |
| GET | `/api/files` | List uploaded files | `device_id` (required), `limit`, `from_date`, `to_date` |
| GET | `/api/files/{filename}` | Download specific file | — |

**Upload Example:**
```bash
curl -X POST https://api.nscbiairport.com/api/upload-json \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: EY9kocR7OOFfkJBXXLYrQFs84HEyI1OJDUjJcbwfsDVOqXvcFau3eqBdG6ZHZ2Fe" \
  -d '{"deviceId":"MC001","temperature":28.5,"humidity":65,"timestamp":"2026-07-17T11:00:00Z","nh3":12.5,"h2s":0.5}'
```

**Response Format (list files):**
```json
{
  "success": true,
  "data": [
    {
      "id": 462,
      "device_id": "MC001",
      "filename": "MC001_20260717_110000.json",
      "upload_method": "json_body",
      "file_size": 146,
      "uploaded_at": "2026-07-17T11:00:00+05:30",
      "download_url": "https://api.nscbiairport.com/api/files/MC001_20260717_110000.json"
    }
  ],
  "pagination": {"total": 1, "returned": 1, "limit": 5, "has_more": false}
}
```

### 11.2 DA Engine API
```
Base URL: http://localhost:8001
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check + API connectivity |
| GET | `/api/dashboard/summary` | Airport-wide WHI summary |
| GET | `/api/washrooms/{device_id}` | Single washroom detail |
| GET | `/api/trends?days=14` | WHI trend data |
| GET | `/api/terminals/{id}/floors/{level}/washrooms` | Floor heatmap data |
| GET | `/api/incidents?limit=50` | Active incidents |
| GET | `/api/reports/summary` | Report metrics |
| GET | `/docs` | Swagger UI |

### 11.3 WMS Backend API
```
Base URL: https://localhost:443
Auth: JWT Bearer token
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login (returns JWT) |
| GET | `/auth/refresh` | Refresh token |
| GET | `/dashboard/status` | Dashboard status |
| GET | `/dashboard/metrics` | Dashboard metrics |
| GET | `/devices` | Device list |
| GET | `/devices/{id}/config` | Device config |
| GET | `/incidents` | Incident list |
| GET | `/incidents/{id}` | Incident detail |

---

## 12. Stopping All Services

### Stop Portal
```bash
# Find and kill the Next.js process
# Windows: Task Manager → kill node.exe
# Linux/Mac: pkill -f "next dev"
```

### Stop DA Engine
```bash
cd Fullstack_Unification/da-engine
docker compose down
```

### Stop WMS Backend
```bash
cd Fullstack_Unification/aai-wms-backend
docker compose down
```

### Stop Everything (Linux/Mac)
```bash
cd Fullstack_Unification
./stop.sh
```

### Nuclear Option (kill all Docker)
```bash
docker stop $(docker ps -q)
docker rm $(docker ps -aq)
```

---

## 13. File Manifest (Code Changes)

These files were modified from the original codebase to make the system work:

### DA Engine Changes

| File | Change Description |
|------|--------------------|
| `da-engine/.env` | Added `NSCBI_DEVICE_IDS=MC001`, set real API URL + key |
| `da-engine/app/config/settings.py` | Added `NSCBI_DEVICE_IDS` setting with `device_id_list` property |
| `da-engine/app/acquisition/api_client.py` | Fixed `list_files()` to extract `filename` from API dict responses; Fixed `download_file()` to handle wrapped response format |
| `da-engine/app/acquisition/polling.py` | Updated to iterate over configured device IDs when polling |
| `da-engine/app/acquisition/healthcheck.py` | Updated health check to use device IDs for API connectivity test |
| `da-engine/app/processing/preprocessing.py` | Added `nh3` → `ammonia_ppm` field mapping |

### Portal Changes

| File | Change Description |
|------|--------------------|
| `aai-unified-portal/.env.local` | Configured with Clerk keys, Neon DB URL, DA/WMS endpoints, TLS cert path |

### No changes were made to the WMS Backend code. All configuration is via Docker Secrets.

---

## Appendix: Testing the Full Pipeline

1. **Start all services** (sections 7.2 → 7.3 → 7.4)
2. **Upload test telemetry** to NSCBI API (section 7.3 upload command)
3. **Wait 30 seconds** for DA engine to poll
4. **Check DA engine processed the file:**
   ```bash
   curl http://localhost:8001/api/health
   # "total_readings_processed" should be > 0
   ```
5. **Check WHI data is available:**
   ```bash
   curl http://localhost:8001/api/dashboard/summary
   # Should show washroom data with WHI scores
   ```
6. **Open portal in browser:** http://localhost:3000
7. **Sign in** with Clerk credentials (after fixing origin — section 10, Issue 1)
8. **Navigate** to admin dashboard → should show WHI data from DA engine
