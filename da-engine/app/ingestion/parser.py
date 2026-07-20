import json
from typing import Dict, Any, Union, List, Optional
from loguru import logger
import orjson

class PayloadParser:
    @staticmethod
    def parse(raw_content: Union[str, bytes]) -> Optional[Union[Dict[str, Any], List[Dict[str, Any]]]]:
        """
        Parses raw string/bytes JSON into Python dict/list.
        Handles malformed files gracefully.
        """
        try:
            if isinstance(raw_content, bytes):
                return orjson.loads(raw_content)
            return orjson.loads(raw_content.encode("utf-8"))
        except orjson.JSONDecodeError as ode:
            logger.warning(f"orjson parsing failed: {ode}. Trying fallback standard json parser.")
            try:
                return json.loads(raw_content)
            except Exception as e:
                logger.error(f"Malformed JSON payload: {e}")
                return None
        except Exception as e:
            logger.error(f"Unexpected error in JSON parsing: {e}")
            return None

payload_parser = PayloadParser()
