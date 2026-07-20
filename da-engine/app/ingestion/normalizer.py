from typing import Dict, Any, Optional
from datetime import datetime, timezone
from loguru import logger

from app.models.telemetry import NormalizedTelemetry
from app.ingestion.validator import payload_validator
from app.ingestion.schema_mapper import schema_mapper

class TelemetryNormalizer:
    @staticmethod
    def normalize(raw: Dict[str, Any]) -> Optional[NormalizedTelemetry]:
        """
        Takes raw dictionary payload, validates, fills defaults, normalizes UTC timestamp.
        """
        payload = payload_validator.validate_raw(raw)
        if not payload:
            return None

        # Fill defaults and map schema
        mapped_data = schema_mapper.map_and_fill_defaults(payload)
        
        # Parse timestamp to UTC datetime
        try:
            ts_str = payload.timestamp
            if ts_str.endswith("Z"):
                ts_str = ts_str[:-1] + "+00:00"
            recorded_at = datetime.fromisoformat(ts_str)
            # Ensure timezone is UTC
            if recorded_at.tzinfo is None:
                recorded_at = recorded_at.replace(tzinfo=timezone.utc)
            else:
                recorded_at = recorded_at.astimezone(timezone.utc)
        except Exception as e:
            logger.error(f"Failed to parse timestamp {payload.timestamp}: {e}")
            recorded_at = datetime.now(timezone.utc)

        return NormalizedTelemetry(
            recorded_at=recorded_at,
            **mapped_data
        )

telemetry_normalizer = TelemetryNormalizer()
