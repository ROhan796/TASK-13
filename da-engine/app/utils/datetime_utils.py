from datetime import datetime, timezone

def parse_iso8601(ts_str: str) -> datetime:
    """
    Parses an ISO 8601 string to a UTC-aware datetime.
    """
    if ts_str.endswith("Z"):
        ts_str = ts_str[:-1] + "+00:00"
    dt = datetime.fromisoformat(ts_str)
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt.astimezone(timezone.utc)
