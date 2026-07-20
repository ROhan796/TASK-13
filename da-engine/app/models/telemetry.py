from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NormalizedTelemetry(BaseModel):
    device_id: str
    terminal_id: str          # Extracted from device_id pattern
    floor_level: str          # Extracted from device_id pattern
    temperature_celsius: float
    humidity_pct: float
    pressure_hpa: Optional[float] = None
    battery_pct: Optional[float] = None
    signal_rssi: Optional[float] = None
    ammonia_ppm: float = 0.0        # Default 0.0 if not provided
    co2_ppm: Optional[float] = None  # Maps to H2S when present
    occupancy_count: int = 0      # Default 0 if not provided
    soap_pct: float = 100.0           # Default 100.0 if not provided
    paper_pct: float = 100.0          # Default 100.0 if not provided
    sanitizer_pct: float = 100.0      # Default 100.0 if not provided
    cleanliness_score: float = 100.0  # Default 100.0 if not provided
    recorded_at: datetime     # Parsed and UTC-normalized timestamp
    whi_score: float = 0.0
    # Penalty fields from device firmware
    penalty_nh3: float = 0.0
    penalty_h2s: float = 0.0
    penalty_humidity: float = 0.0
    penalty_temperature: float = 0.0
    peak_nh3_ppm: float = 0.0
    throughput: float = 0.0
