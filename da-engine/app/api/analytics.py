from fastapi import APIRouter, HTTPException
from app.storage.cache import cache_store
from app.models.washroom import WashroomState
from app.analytics.whi.thresholds import whi_thresholds

router = APIRouter()

@router.get("/washrooms/{device_id}", response_model=WashroomState)
async def get_washroom_detail(device_id: str):
    """
    Returns detail aggregates for a specific washroom unit.
    """
    telemetry = cache_store.get_telemetry(device_id)
    if not telemetry:
        raise HTTPException(
            status_code=404,
            detail=f"Telemetry details for device {device_id} not found."
        )
        
    gender_label = "Male" if "PPM" in device_id else "Female" if "PPF" in device_id else "Disabled" if "PPD" in device_id else "Staff"
    
    return WashroomState(
        device_id=telemetry.device_id,
        name=f"{gender_label} Washroom {telemetry.device_id.split('-')[-1]}",
        whi=telemetry.whi_score,
        status=whi_thresholds.get_status(telemetry.whi_score),
        occupancy=telemetry.occupancy_count,
        ammonia_ppm=telemetry.ammonia_ppm,
        soap_pct=telemetry.soap_pct,
        paper_pct=telemetry.paper_pct,
        sanitizer_pct=telemetry.sanitizer_pct,
        battery_pct=telemetry.battery_pct,
        recorded_at=telemetry.recorded_at.isoformat()
    )
