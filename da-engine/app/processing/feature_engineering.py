from app.config.constants import UNIT_CAPACITY
from app.config.settings import settings

class FeatureEngineering:
    @staticmethod
    def extract_unit_type(device_id: str) -> str:
        parts = device_id.split("-")
        for part in parts:
            if part in UNIT_CAPACITY:
                return part
        return "PPM" # Default fallback

    @classmethod
    def get_capacity(cls, device_id: str) -> int:
        unit_type = cls.extract_unit_type(device_id)
        return UNIT_CAPACITY.get(unit_type, settings.DEFAULT_WASHROOM_CAPACITY)

    @classmethod
    def compute_occupancy_load_pct(cls, occupancy_count: int, device_id: str) -> float:
        capacity = cls.get_capacity(device_id)
        if capacity <= 0:
            return 0.0
        return min((occupancy_count / capacity) * 100.0, 100.0)

    @staticmethod
    def compute_supply_score(soap_pct: float, paper_pct: float, sanitizer_pct: float) -> float:
        return (soap_pct + paper_pct + sanitizer_pct) / 3.0

    @staticmethod
    def compute_air_score(ammonia_ppm: float) -> float:
        return max(0.0, 100.0 - min((ammonia_ppm / 50.0) * 100.0, 100.0))

feature_engineer = FeatureEngineering()
