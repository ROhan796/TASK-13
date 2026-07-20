from typing import Dict, Any, Optional
from loguru import logger
from pydantic import ValidationError
from app.models.sensor import RawSensorPayload

class PayloadValidator:
    @staticmethod
    def validate_raw(raw: Dict[str, Any]) -> Optional[RawSensorPayload]:
        """
        Validates raw payload dict using RawSensorPayload model.
        Returns validated Pydantic model or None if validation fails.
        """
        try:
            return RawSensorPayload(**raw)
        except ValidationError as ve:
            logger.error(f"Payload validation failed for device {raw.get('deviceId', 'UNKNOWN')}: {ve}")
            return None
        except Exception as e:
            logger.error(f"Unexpected validation error: {e}")
            return None

payload_validator = PayloadValidator()
