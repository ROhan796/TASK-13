from app.processing.feature_engineering import feature_engineer

class OccupancyAnalyzer:
    @staticmethod
    def analyze_load(occupancy_count: int, device_id: str) -> dict:
        """
        Analyze current occupancy metrics.
        """
        capacity = feature_engineer.get_capacity(device_id)
        load_pct = feature_engineer.compute_occupancy_load_pct(occupancy_count, device_id)
        return {
            "occupancy_count": occupancy_count,
            "capacity": capacity,
            "load_percentage": load_pct,
            "is_over_capacity": occupancy_count > capacity
        }

occupancy_analyzer = OccupancyAnalyzer()
