from typing import Dict, Any, List
from app.models.telemetry import NormalizedTelemetry
from app.processing.feature_engineering import feature_engineer
from app.config.constants import AMMONIA_ALERT_PPM, SUPPLY_ALERT_PCT

class IncidentDetector:
    @staticmethod
    def detect_breaches(telemetry: NormalizedTelemetry) -> List[Dict[str, Any]]:
        """
        Check for telemetry threshold breaches. Returns a list of breach dicts.
        """
        breaches = []
        device_id = telemetry.device_id
        capacity = feature_engineer.get_capacity(device_id)

        # 1. Ammonia spike (> 50 PPM) -> HIGH
        if telemetry.ammonia_ppm > AMMONIA_ALERT_PPM:
            breaches.append({
                "metric": "ammonia_ppm",
                "value": telemetry.ammonia_ppm,
                "threshold": AMMONIA_ALERT_PPM,
                "severity": "HIGH",
                "type": "AMMONIA_SPIKE",
                "title": "High Ammonia Level Detected",
                "description": f"Ammonia concentration of {telemetry.ammonia_ppm} ppm crossed limit of {AMMONIA_ALERT_PPM} ppm."
            })

        # 2. Low soap (< 20%) -> MEDIUM
        if telemetry.soap_pct < SUPPLY_ALERT_PCT:
            breaches.append({
                "metric": "soap_pct",
                "value": telemetry.soap_pct,
                "threshold": SUPPLY_ALERT_PCT,
                "severity": "MEDIUM",
                "type": "LOW_SOAP",
                "title": "Low Soap Refill Alert",
                "description": f"Soap level dropped to {telemetry.soap_pct}%. Refill required."
            })

        # 3. Low paper (< 20%) -> MEDIUM
        if telemetry.paper_pct < SUPPLY_ALERT_PCT:
            breaches.append({
                "metric": "paper_pct",
                "value": telemetry.paper_pct,
                "threshold": SUPPLY_ALERT_PCT,
                "severity": "MEDIUM",
                "type": "LOW_PAPER",
                "title": "Low Paper Refill Alert",
                "description": f"Paper towels level dropped to {telemetry.paper_pct}%. Refill required."
            })

        # 4. Low sanitizer (< 20%) -> MEDIUM
        if telemetry.sanitizer_pct < SUPPLY_ALERT_PCT:
            breaches.append({
                "metric": "sanitizer_pct",
                "value": telemetry.sanitizer_pct,
                "threshold": SUPPLY_ALERT_PCT,
                "severity": "MEDIUM",
                "type": "LOW_SANITIZER",
                "title": "Low Sanitizer Refill Alert",
                "description": f"Sanitizer level dropped to {telemetry.sanitizer_pct}%. Refill required."
            })

        # 5. WHI Critical (< 60) -> CRITICAL
        if telemetry.whi_score < 60.0:
            breaches.append({
                "metric": "whi_score",
                "value": telemetry.whi_score,
                "threshold": 60.0,
                "severity": "CRITICAL",
                "type": "CRITICAL_WHI",
                "title": "Critical WHI Score",
                "description": f"Washroom Hygiene Index (WHI) dropped to {telemetry.whi_score}."
            })

        # 6. Overcapacity (> capacity) -> MEDIUM
        if telemetry.occupancy_count > capacity:
            breaches.append({
                "metric": "occupancy_count",
                "value": telemetry.occupancy_count,
                "threshold": capacity,
                "severity": "MEDIUM",
                "type": "OVERCAPACITY",
                "title": "Overcapacity Detected",
                "description": f"Occupancy of {telemetry.occupancy_count} exceeded capacity of {capacity}."
            })

        # 7. Low battery (< 15%) -> LOW
        if telemetry.battery_pct is not None and telemetry.battery_pct < 15.0:
            breaches.append({
                "metric": "battery_pct",
                "value": telemetry.battery_pct,
                "threshold": 15.0,
                "severity": "LOW",
                "type": "LOW_BATTERY",
                "title": "Low Battery Alert",
                "description": f"Sensor battery dropped to {telemetry.battery_pct}%."
            })

        return breaches

incident_detector = IncidentDetector()
