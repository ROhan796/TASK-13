from pydantic import BaseModel
from typing import List, Dict, Optional

class WashroomSummary(BaseModel):
    device_id: str
    name: str
    whi: float
    status: str
    occupancy: int
    ammonia_ppm: float
    soap_pct: float
    paper_pct: float
    sanitizer_pct: float

class FloorSummary(BaseModel):
    level_id: int
    label: str
    avg_whi: float
    washrooms: List[WashroomSummary]

class TerminalSummary(BaseModel):
    terminal_id: str
    name: str
    code: str
    avg_whi: float
    total_washrooms: int
    online_devices: int
    active_incidents: int
    floors: List[FloorSummary]

class AirportSummary(BaseModel):
    avg_whi: float
    total_washrooms: int
    online_devices: int
    active_incidents: int
    terminals: List[TerminalSummary]
