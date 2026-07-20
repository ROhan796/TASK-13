from typing import Optional

class DerivedMetricsCalculator:
    @staticmethod
    def get_battery_health(battery_pct: Optional[float]) -> str:
        """
        Maps battery percentage to health categories.
        """
        if battery_pct is None:
            return "UNKNOWN"
        if battery_pct > 80.0:
            return "GOOD"
        if battery_pct > 20.0:
            return "FAIR"
        return "CRITICAL"

    @staticmethod
    def get_signal_quality(rssi: Optional[float]) -> str:
        """
        Maps RSSI values to connection quality category.
        """
        if rssi is None:
            return "UNKNOWN"
        if rssi >= -65.0:
            return "EXCELLENT"
        if rssi >= -75.0:
            return "GOOD"
        if rssi >= -85.0:
            return "FAIR"
        return "POOR"

derived_metrics = DerivedMetricsCalculator()
