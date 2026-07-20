from pydantic import BaseModel, model_validator
from typing import Optional

class RawSensorPayload(BaseModel):
    # Core required fields from API — both formats accepted
    deviceId: Optional[str] = None
    device_id: Optional[str] = None
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    timestamp: str  # ISO 8601 — always required

    # Gas sensors
    nh3: Optional[float] = None
    h2s: Optional[float] = None
    ammonia_ppm: Optional[float] = None
    co2_ppm: Optional[float] = None

    # Penalty fields
    penalty_nh3: Optional[float] = None
    penalty_h2s: Optional[float] = None
    penalty_humidity: Optional[float] = None
    penalty_temperature: Optional[float] = None
    raw_whi: Optional[float] = None
    throughput: Optional[float] = None
    occupancy_inside: Optional[float] = None

    # Legacy fields
    pressure: Optional[float] = None
    battery: Optional[float] = None
    rssi: Optional[float] = None
    occupancy_count: Optional[int] = None
    soap_pct: Optional[float] = None
    paper_pct: Optional[float] = None
    sanitizer_pct: Optional[float] = None
    cleanliness_score: Optional[float] = None
    _received_at: Optional[str] = None

    @model_validator(mode='after')
    def ensure_device_id(self):
        """Ensure at least one device_id format is present."""
        if not self.deviceId and not self.device_id:
            raise ValueError("Either 'deviceId' or 'device_id' is required")
        return self
