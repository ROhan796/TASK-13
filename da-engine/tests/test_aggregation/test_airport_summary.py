from app.models.telemetry import NormalizedTelemetry
from app.analytics.airport.aggregator import airport_aggregator
from datetime import datetime, timezone

def test_airport_aggregation():
    t1 = NormalizedTelemetry(
        device_id="T1-L1-PPM-001",
        terminal_id="T1",
        floor_level="L1",
        temperature_celsius=24.0,
        humidity_pct=50.0,
        ammonia_ppm=10.0,
        soap_pct=90.0,
        paper_pct=90.0,
        sanitizer_pct=90.0,
        occupancy_count=1,
        cleanliness_score=95.0,
        recorded_at=datetime.now(timezone.utc),
        whi_score=90.0
    )
    t2 = NormalizedTelemetry(
        device_id="T2-L2-PPF-002",
        terminal_id="T2",
        floor_level="L2",
        temperature_celsius=24.0,
        humidity_pct=50.0,
        ammonia_ppm=10.0,
        soap_pct=90.0,
        paper_pct=90.0,
        sanitizer_pct=90.0,
        occupancy_count=1,
        cleanliness_score=95.0,
        recorded_at=datetime.now(timezone.utc),
        whi_score=80.0
    )
    
    summary = airport_aggregator.aggregate([t1, t2], [])
    assert summary.avg_whi == 85.0
    assert summary.total_washrooms == 2
    assert summary.online_devices == 2
    assert len(summary.terminals) == 2
