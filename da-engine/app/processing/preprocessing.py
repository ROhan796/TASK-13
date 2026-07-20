from typing import Any, Dict
from loguru import logger

class Preprocessor:
    @staticmethod
    def preprocess(data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Cleans raw values, coercing types and handling missing/null fields cleanly.
        Handles both new schema (device_id, avg_nh3_ppm, h2s, penalties) and legacy schema (deviceId, ammonia_ppm).
        API stores: deviceId, temperature, humidity, nh3, h2s, penalty_*, raw_whi, throughput, occupancy_inside, _received_at
        """
        cleaned = data.copy()

        # Normalize device_id field — new schema uses device_id, legacy uses deviceId
        if "device_id" in cleaned and cleaned["device_id"] is not None:
            cleaned["deviceId"] = str(cleaned["device_id"]).strip()
        elif "deviceId" in cleaned and cleaned["deviceId"] is not None:
            cleaned["device_id"] = str(cleaned["deviceId"]).strip()

        # Map API field names to internal field names
        if "nh3" in cleaned and "ammonia_ppm" not in cleaned:
            cleaned["ammonia_ppm"] = cleaned.pop("nh3")
        if "h2s" in cleaned and "co2_ppm" not in cleaned:
            cleaned["co2_ppm"] = cleaned.pop("h2s")
        if "avg_humidity_percent" in cleaned and "humidity" not in cleaned:
            cleaned["humidity"] = cleaned.pop("avg_humidity_percent")
        if "avg_temperature_c" in cleaned and "temperature" not in cleaned:
            cleaned["temperature"] = cleaned.pop("avg_temperature_c")
        if "avg_nh3_ppm" in cleaned and "ammonia_ppm" not in cleaned:
            cleaned["ammonia_ppm"] = cleaned.pop("avg_nh3_ppm")
        if "avg_h2s_ppm" in cleaned and "co2_ppm" not in cleaned:
            cleaned["co2_ppm"] = cleaned.pop("avg_h2s_ppm")
        if "occupancy_inside" in cleaned and "occupancy_count" not in cleaned:
            cleaned["occupancy_count"] = int(float(cleaned.pop("occupancy_inside")))

        # Ensure both device_id and deviceId are set
        if "device_id" not in cleaned:
            cleaned["device_id"] = cleaned.get("deviceId", "UNKNOWN")
        if "deviceId" not in cleaned:
            cleaned["deviceId"] = cleaned.get("device_id", "UNKNOWN")

        # Coerce numeric values, setting defaults/nulls as needed
        numeric_fields = [
            "temperature", "humidity", "pressure", "battery", "rssi",
            "ammonia_ppm", "co2_ppm", "occupancy_count",
            "soap_pct", "paper_pct", "sanitizer_pct", "cleanliness_score",
            "penalty_nh3", "penalty_h2s", "penalty_humidity", "penalty_temperature",
            "raw_whi", "throughput", "peak_nh3_ppm",
        ]

        for field in numeric_fields:
            if field in cleaned and cleaned[field] is not None:
                try:
                    cleaned[field] = float(cleaned[field])
                except (ValueError, TypeError):
                    logger.warning(f"Unable to coerce field '{field}' to float: {cleaned[field]}. Setting to None.")
                    cleaned[field] = None

        # Occupancy count should be integer
        if "occupancy_count" in cleaned and cleaned["occupancy_count"] is not None:
            cleaned["occupancy_count"] = int(cleaned["occupancy_count"])

        return cleaned

preprocessor = Preprocessor()
