from fastapi import APIRouter
from typing import Dict, Any
from app.services.report_service import report_service

router = APIRouter()

@router.get("/reports/summary", response_model=Dict[str, Any])
async def get_reports_summary():
    """
    Returns summary metrics structured for report layouts.
    """
    return report_service.generate_summary_report()
