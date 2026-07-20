from pydantic import BaseModel
from typing import Optional

class WashroomState(BaseModel):
    device_id: str
    name: str
    whi: float
    status: str
    occupancy: int
    ammonia_ppm: float
    soap_pct: float
    paper_pct: float
    sanitizer_pct: float
    battery_pct: Optional[float] = None
    recorded_at: str
