from pydantic import BaseModel
from typing import List
from app.models.terminal import TerminalSummary

class AirportSummary(BaseModel):
    avg_whi: float
    total_washrooms: int
    online_devices: int
    active_incidents: int
    terminals: List[TerminalSummary]
