from loguru import logger
from app.config.constants import (
    WEIGHT_CLEANLINESS, WEIGHT_OCCUPANCY, WEIGHT_SUPPLIES, WEIGHT_AIR_QUALITY
)
from app.models.telemetry import NormalizedTelemetry
from app.processing.feature_engineering import feature_engineer

class WHICalculator:
    @staticmethod
    def compute_whi(telemetry: NormalizedTelemetry) -> float:
        """
        Calculates the Washroom Hygiene Index (WHI) using the official weighted formula.
        """
        try:
            cleanliness_score = telemetry.cleanliness_score
            
            # Derived feature scores
            occupancy_load_pct = feature_engineer.compute_occupancy_load_pct(
                telemetry.occupancy_count, telemetry.device_id
            )
            supply_score = feature_engineer.compute_supply_score(
                telemetry.soap_pct, telemetry.paper_pct, telemetry.sanitizer_pct
            )
            air_score = feature_engineer.compute_air_score(telemetry.ammonia_ppm)
            
            whi = (
                (cleanliness_score * WEIGHT_CLEANLINESS) +
                ((100.0 - occupancy_load_pct) * WEIGHT_OCCUPANCY) +
                (supply_score * WEIGHT_SUPPLIES) +
                (air_score * WEIGHT_AIR_QUALITY)
            )
            return round(whi, 1)
        except Exception as e:
            logger.error(f"Error calculating WHI score for {telemetry.device_id}: {e}")
            return 80.0  # Safe fallback

whi_calculator = WHICalculator()
