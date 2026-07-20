from app.analytics.whi.calculator import whi_calculator
from app.models.telemetry import NormalizedTelemetry
from datetime import datetime, timezone

def test_whi_custom_score():
    telemetry = NormalizedTelemetry(
        device_id="T1-L1-PPM-001",
        terminal_id="T1",
        floor_level="L1",
        temperature_celsius=24.0,
        humidity_pct=50.0,
        ammonia_ppm=0.0,
        soap_pct=100.0,
        paper_pct=100.0,
        sanitizer_pct=100.0,
        occupancy_count=0,
        cleanliness_score=100.0,
        recorded_at=datetime.now(timezone.utc)
    )
    score = whi_calculator.compute_whi(telemetry)
    # cleanliness_score * 0.35 = 35.0
    # (100 - occupancy_load_pct) * 0.20 = 20.0
    # supply_score * 0.25 = 25.0
    # air_score * 0.20 = 20.0
    # total WHI = 35 + 20 + 25 + 20 = 100.0
    assert score == 100.0
