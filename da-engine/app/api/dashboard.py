from fastapi import APIRouter, HTTPException
from app.services.dashboard_service import dashboard_service
from app.models.airport import AirportSummary

router = APIRouter()

@router.get("/summary", response_model=AirportSummary)
async def get_dashboard_summary():
    """
    Returns consolidated airport-wide summary telemetry metrics.
    """
    summary = dashboard_service.get_summary()
    if not summary:
        raise HTTPException(
            status_code=503,
            detail="Analytics engine compiling telemetry caches..."
        )
    return summary
