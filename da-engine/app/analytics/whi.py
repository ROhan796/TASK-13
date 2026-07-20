from app.config.constants import (
    UNIT_CAPACITY,
    WEIGHT_CLEANLINESS,
    WEIGHT_OCCUPANCY,
    WEIGHT_SUPPLIES,
    WEIGHT_AIR_QUALITY
)
from app.models.telemetry import NormalizedTelemetry
from loguru import logger

class WHIEngine:
    @staticmethod
    def extract_unit_type(device_id: str) -> str:
        """
        Extracts unit type (PPM, PPF, PPD, STF) from standard device ID format:
        e.g., T1-L1-PPM-001 -> PPM
        """
        parts = device_id.split("-")
        for part in parts:
            if part in UNIT_CAPACITY:
                return part
        return "PPM" # Default fallback

    @classmethod
    def calculate(cls, telemetry: NormalizedTelemetry) -> float:
        """
        Calculates the Washroom Hygiene Index (WHI) using the official weighted formula.
        """
        try:
            unit_type = cls.extract_unit_type(telemetry.device_id)
            capacity = UNIT_CAPACITY.get(unit_type, 4)
            
            # Occupancy load percentage
            occupancy_load_pct = min((telemetry.occupancy_count / capacity) * 100.0, 100.0)
            
            # Supplies score
            supply_score = (telemetry.soap_pct + telemetry.paper_pct + telemetry.sanitizer_pct) / 3.0
            
            # Air score based on Ammonia PPM limit
            air_score = max(0.0, 100.0 - min((telemetry.ammonia_ppm / 50.0) * 100.0, 100.0))
            
            # Weighted index
            whi = (
                (telemetry.cleanliness_score * WEIGHT_CLEANLINESS) +
                ((100.0 - occupancy_load_pct) * WEIGHT_OCCUPANCY) +
                (supply_score * WEIGHT_SUPPLIES) +
                (air_score * WEIGHT_AIR_QUALITY)
            )
            
            return round(whi, 1)
        except Exception as e:
            logger.error(f"Error calculating WHI score for {telemetry.device_id}: {e}")
            return 80.0 # Secure operational fallback
        
    @staticmethod
    def resolve_status(whi_score: float) -> str:
        if whi_score < 60.0:
            return "CRITICAL"
        if whi_score < 75.0:
            return "WARNING"
        return "GOOD"
