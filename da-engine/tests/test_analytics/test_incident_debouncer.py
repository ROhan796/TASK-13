from app.analytics.incidents.debouncer import IncidentDebouncer
from datetime import datetime, timezone

def test_debouncer_3_cycles():
    debouncer = IncidentDebouncer()
    device_id = "T1-L1-PPM-001"
    recorded_at = datetime.now(timezone.utc)
    
    breach = [{
        "metric": "ammonia_ppm",
        "value": 60.0,
        "threshold": 50.0,
        "severity": "HIGH",
        "type": "AMMONIA_SPIKE",
        "title": "High Ammonia Level Detected",
        "description": "Ammonia concentration crossed limit."
    }]
    
    # Cycle 1
    active = debouncer.process_telemetry_breaches(device_id, breach, recorded_at)
    assert len(active) == 0
    
    # Cycle 2
    active = debouncer.process_telemetry_breaches(device_id, breach, recorded_at)
    assert len(active) == 0
    
    # Cycle 3
    active = debouncer.process_telemetry_breaches(device_id, breach, recorded_at)
    assert len(active) == 1
    assert active[0]["status"] == "ACTIVE"
    assert active[0]["type"] == "AMMONIA_SPIKE"
    
    # Clean Cycle -> Should resolve immediately
    active = debouncer.process_telemetry_breaches(device_id, [], recorded_at)
    assert len(active) == 0
