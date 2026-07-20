from fastapi import APIRouter
from typing import Dict, Any
from app.services.health_service import health_service

router = APIRouter()

@router.get("/health", response_model=Dict[str, Any])
async def get_health():
    """
    Uptime, polling frequency, and API connection metrics.
    """
    return await health_service.get_health_status()
