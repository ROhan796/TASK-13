from app.config.constants import AMMONIA_ALERT_PPM, SUPPLY_ALERT_PCT
from app.models.telemetry import NormalizedTelemetry
from typing import List, Dict, Any
from datetime import datetime

class IncidentAlertEngine:
    @staticmethod
    def detect_incidents(telemetry: NormalizedTelemetry) -> List[Dict[str, Any]]:
        """
        Scan normalized telemetry parameters and yield active incidents.
        """
        detected = []
        
        # Ammonia threshold breach
        if telemetry.ammonia_ppm > AMMONIA_ALERT_PPM:
            detected.append({
                "device_id": telemetry.device_id,
                "type": "AMMONIA_SPIKE",
                "severity": "CRITICAL",
                "title": "Critical Ammonia Spike Detected",
                "description": f"Ammonia concentration of {telemetry.ammonia_ppm} ppm crossed warning limit of {AMMONIA_ALERT_PPM} ppm.",
                "created_at": datetime.utcnow().isoformat() + "Z"
            })
            
        # Low soap level
        if telemetry.soap_pct < SUPPLY_ALERT_PCT:
            detected.append({
                "device_id": telemetry.device_id,
                "type": "LOW_SOAP",
                "severity": "MEDIUM",
                "title": "Low Soap Refill Alert",
                "description": f"Soap dispenser levels dropped to {telemetry.soap_pct}%. Refill required.",
                "created_at": datetime.utcnow().isoformat() + "Z"
            })
            
        # Low paper level
        if telemetry.paper_pct < SUPPLY_ALERT_PCT:
            detected.append({
                "device_id": telemetry.device_id,
                "type": "LOW_PAPER",
                "severity": "MEDIUM",
                "title": "Low Paper Refill Alert",
                "description": f"Paper towels levels dropped to {telemetry.paper_pct}%. Refill required.",
                "created_at": datetime.utcnow().isoformat() + "Z"
            })
            
        return detected
