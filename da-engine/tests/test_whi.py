from app.analytics.whi.calculator import whi_calculator
from app.analytics.whi.thresholds import whi_thresholds
from app.models.telemetry import NormalizedTelemetry
from datetime import datetime, timezone

def test_whi_calculation():
    # Construct normalized test telemetry matching GOOD threshold
    telemetry = NormalizedTelemetry(
        device_id="T1-L1-PPM-001",
        terminal_id="T1",
        floor_level="L1",
        temperature_celsius=24.0,
        humidity_pct=50.0,
        ammonia_ppm=10.0, # Good air quality
        soap_pct=90.0,
        paper_pct=90.0,
        sanitizer_pct=90.0,
        occupancy_count=1, # Low load
        cleanliness_score=95.0,
        battery_pct=3.8,
        signal_rssi=-65.0,
        recorded_at=datetime.now(timezone.utc)
    )
    
    score = whi_calculator.compute_whi(telemetry)
    assert score > 75.0
    assert whi_thresholds.get_status(score) == "GOOD"

def test_whi_critical_breach():
    # Construct normalized test telemetry matching CRITICAL threshold
    telemetry = NormalizedTelemetry(
        device_id="T1-L1-PPM-001",
        terminal_id="T1",
        floor_level="L1",
        temperature_celsius=24.0,
        humidity_pct=50.0,
        ammonia_ppm=48.0, # High ammonia close to alert limit
        soap_pct=15.0,
        paper_pct=10.0,
        sanitizer_pct=20.0,
        occupancy_count=4, # Over capacity load
        cleanliness_score=45.0,
        battery_pct=3.8,
        signal_rssi=-65.0,
        recorded_at=datetime.now(timezone.utc)
    )
    
    score = whi_calculator.compute_whi(telemetry)
    assert score < 60.0
    assert whi_thresholds.get_status(score) == "CRITICAL"
