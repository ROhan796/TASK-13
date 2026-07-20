#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[AAI] Stopping Next.js portal..."
if [ -f "$SCRIPT_DIR/.portal.pid" ]; then
  kill "$(cat "$SCRIPT_DIR/.portal.pid")" 2>/dev/null || true
  rm "$SCRIPT_DIR/.portal.pid"
fi
pkill -f "next start" 2>/dev/null || true

echo "[AAI] Stopping DA Engine..."
cd "$SCRIPT_DIR/da-engine"
docker-compose down

echo "[AAI] Stopping WMS Backend..."
cd "$SCRIPT_DIR/aai-wms-backend"
docker compose down

echo "[AAI] All services stopped."
