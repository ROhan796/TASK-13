from pydantic import BaseModel
from typing import List
from app.models.washroom import WashroomState

class FloorSummary(BaseModel):
    level_id: int
    label: str
    avg_whi: float
    washrooms: List[WashroomState]
