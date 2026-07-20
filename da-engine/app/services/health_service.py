from datetime import datetime, timezone
from typing import Dict, Any
from app.acquisition.polling import telemetry_poller
from app.acquisition.healthcheck import health_check_client
from app.storage.cache import cache_store

START_TIME = datetime.now(timezone.utc)

class HealthService:
    async def get_health_status(self) -> Dict[str, Any]:
        """
        Gathers complete engine liveness, readiness, and connectivity status.
        """
        now = datetime.now(timezone.utc)
        uptime_seconds = int((now - START_TIME).total_seconds())
        
        api_available = await health_check_client.check_api_status()
        
        cache_age = int((now - cache_store.last_updated).total_seconds()) if cache_store.telemetry_snapshots else 0
        
        return {
            "status": "healthy" if api_available else "degraded",
            "uptime_seconds": uptime_seconds,
            "api_connectivity": "CONNECTED" if api_available else "DISCONNECTED",
            "last_successful_poll": telemetry_poller.last_poll_time.isoformat() if telemetry_poller.last_poll_time else None,
            "cache_age_seconds": cache_age,
            "total_readings_processed": telemetry_poller.total_processed_count,
            "seen_files_count": len(telemetry_poller.seen_files)
        }

health_service = HealthService()
