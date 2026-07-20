from typing import Dict, Any, List, Tuple
from datetime import datetime, timezone
from loguru import logger

class IncidentDebouncer:
    def __init__(self):
        # Maps (device_id, metric) -> consecutive breach count
        self.consecutive_breaches: Dict[Tuple[str, str], int] = {}
        # Maps (device_id, metric) -> active incident dict
        self.active_incidents: Dict[Tuple[str, str], Dict[str, Any]] = {}

    def process_telemetry_breaches(self, device_id: str, breaches: List[Dict[str, Any]], recorded_at: datetime) -> List[Dict[str, Any]]:
        """
        Processes breaches for a single device, updating debouncing state.
        Returns a list of all currently active incidents for this device.
        """
        timestamp_str = recorded_at.isoformat()
        
        # Track metrics that breached in this cycle
        breached_metrics = set()
        
        for breach in breaches:
            metric = breach["metric"]
            breached_metrics.add(metric)
            key = (device_id, metric)
            
            # Increment consecutive breach counter
            self.consecutive_breaches[key] = self.consecutive_breaches.get(key, 0) + 1
            logger.debug(f"Breach detected: {key} consecutive count = {self.consecutive_breaches[key]}")
            
            # Fire incident after 3 consecutive breaches
            if self.consecutive_breaches[key] >= 3:
                if key not in self.active_incidents:
                    logger.info(f"Fired new incident for {device_id} - {metric} (3 consecutive breaches)")
                    self.active_incidents[key] = {
                        "device_id": device_id,
                        "type": breach["type"],
                        "severity": breach["severity"],
                        "title": breach["title"],
                        "description": breach["description"],
                        "created_at": timestamp_str,
                        "status": "ACTIVE"
                    }
                else:
                    # Update timestamp / description if needed
                    self.active_incidents[key]["description"] = breach["description"]
                    
        # Check active metrics for this device that did NOT breach in this cycle to clear/resolve them
        keys_to_clear = []
        for key in list(self.consecutive_breaches.keys()):
            if key[0] == device_id and key[1] not in breached_metrics:
                keys_to_clear.append(key)
                
        for key in keys_to_clear:
            # Reset counters
            self.consecutive_breaches.pop(key, None)
            # Resolve active incidents if they exist
            if key in self.active_incidents:
                logger.info(f"Resolving incident for {device_id} - {key[1]} (breach cleared)")
                # For our in-memory storage, we can mark it as resolved or remove it.
                # Let's remove it from active, but we can also store resolved ones if needed.
                self.active_incidents.pop(key, None)

        return list(self.active_incidents.values())

    def get_all_active_incidents(self) -> List[Dict[str, Any]]:
        return list(self.active_incidents.values())

incident_debouncer = IncidentDebouncer()
