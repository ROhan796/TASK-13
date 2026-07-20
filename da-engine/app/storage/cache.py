import threading
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from app.models.telemetry import NormalizedTelemetry
from app.models.airport import AirportSummary

class ThreadSafeCacheStore:
    def __init__(self):
        self.lock = threading.Lock()
        
        # Maps device_id -> NormalizedTelemetry
        self.telemetry_snapshots: Dict[str, NormalizedTelemetry] = {}
        
        # List of active detected incidents
        self.active_incidents: List[Dict[str, Any]] = []
        
        # Cache for aggregated summaries
        self.airport_summary: Optional[AirportSummary] = None
        
        self.last_updated: datetime = datetime.now(timezone.utc)

    def update_telemetry(self, device_id: str, telemetry: NormalizedTelemetry):
        with self.lock:
            self.telemetry_snapshots[device_id] = telemetry
            self.last_updated = datetime.now(timezone.utc)

    def set_active_incidents(self, incidents: List[Dict[str, Any]]):
        with self.lock:
            self.active_incidents = incidents
            self.last_updated = datetime.now(timezone.utc)

    def get_all_telemetry(self) -> List[NormalizedTelemetry]:
        with self.lock:
            return list(self.telemetry_snapshots.values())

    def get_telemetry(self, device_id: str) -> Optional[NormalizedTelemetry]:
        with self.lock:
            return self.telemetry_snapshots.get(device_id)

    def set_airport_summary(self, summary: AirportSummary):
        with self.lock:
            self.airport_summary = summary
            self.last_updated = datetime.now(timezone.utc)

    def get_airport_summary(self) -> Optional[AirportSummary]:
        with self.lock:
            return self.airport_summary

cache_store = ThreadSafeCacheStore()
