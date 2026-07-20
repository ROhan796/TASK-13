from fastapi import APIRouter
from app.api import dashboard, analytics, trends, heatmap, incidents, reports, health

router = APIRouter()

router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
router.include_router(analytics.router, tags=["Analytics"])
router.include_router(trends.router, tags=["Trends"])
router.include_router(heatmap.router, tags=["Heatmap"])
router.include_router(incidents.router, tags=["Incidents"])
router.include_router(reports.router, tags=["Reports"])
router.include_router(health.router, tags=["Health"])
