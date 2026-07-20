from fastapi import APIRouter
from typing import List, Dict, Any
from app.storage.cache import cache_store

router = APIRouter()

@router.get("/incidents", response_model=List[Dict[str, Any]])
async def get_incidents(limit: int = 50, offset: int = 0):
    """
    Returns the list of active/detected incidents.
    """
    incidents = cache_store.active_incidents
    return incidents[offset:offset+limit]
