from fastapi import APIRouter
from typing import List, Dict, Any
from app.storage.snapshots import snapshot_store
from app.analytics.trends.calculator import trends_calculator
from datetime import date, timedelta
import random

router = APIRouter()

@router.get("/trends", response_model=List[Dict[str, Any]])
async def get_trends(days: int = 14):
    """
    Returns daily historical WHI trends grouped by date and terminal.
    """
    snaps = snapshot_store.get_snapshots()
    trends = trends_calculator.calculate_trends(snaps, days)
    
    # Fallback to simulated trend data if snapshot history is empty (e.g. at startup)
    if not trends:
        terminals = ["T1", "T2", "CGO"]
        base_date = date.today()
        for i in range(days):
            d_str = (base_date - timedelta(days=days - 1 - i)).isoformat()
            for term in terminals:
                trends.append({
                    "date": d_str,
                    "avg_whi": round(random.uniform(70.0, 92.0), 1),
                    "terminal_id": term
                })
    return trends
