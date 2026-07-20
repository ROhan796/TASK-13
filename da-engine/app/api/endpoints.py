from fastapi import APIRouter, HTTPException
from app.storage.cache import cache_store
from typing import Dict, Any, List

router = APIRouter()

@router.get("/dashboard/summary")
async def get_dashboard_summary():
    """
    Returns consolidated airport-wide summary telemetry metrics.
    """
    if not cache_store.airport_summary:
        raise HTTPException(status_code=503, detail="Analytics engine compiling telemetry caches...")
    return cache_store.airport_summary

@router.get("/alerts/active")
async def get_active_alerts():
    """
    Returns the queue of active detected alerts (Ammonia spikes, low supplies).
    """
    return cache_store.active_incidents

@router.get("/trends")
async def get_trends(days: int = 14):
    """
    Returns simulated historical WHI trends for charting.
    """
    # Build simulated trend array based on cached overall average WHI
    avg_whi = cache_store.airport_summary.get("avg_whi", 85.0) if cache_store.airport_summary else 85.0
    import datetime
    trends = []
    base_date = datetime.date.today()
    for i in range(days):
        date_str = (base_date - datetime.timedelta(days=days-1-i)).isoformat()
        # Create mild fluctuations
        import random
        fluc = round(random.uniform(-3.0, 3.0), 1)
        trends.append({
            "date": date_str,
            "avg_whi": max(50.0, min(100.0, avg_whi + fluc))
        })
    return trends

@router.get("/terminals/{terminal_id}")
async def get_terminal_detail(terminal_id: str):
    """
    Returns detail aggregates for a specific terminal.
    """
    if not cache_store.airport_summary:
        raise HTTPException(status_code=503, detail="Caches not initialized.")
    
    terminals = cache_store.airport_summary.get("terminals", [])
    for t in terminals:
        if t["terminal_id"].upper() == terminal_id.upper():
            return t
            
    raise HTTPException(status_code=404, detail=f"Terminal {terminal_id} not found.")
