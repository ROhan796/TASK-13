from pydantic import BaseModel
from typing import List
from app.models.floor import FloorSummary

class TerminalSummary(BaseModel):
    terminal_id: str
    name: str
    code: str
    avg_whi: float
    total_washrooms: int
    online_devices: int
    active_incidents: int
    floors: List[FloorSummary]
