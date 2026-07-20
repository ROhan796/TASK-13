from datetime import datetime, timezone

START_TIME = datetime.now(timezone.utc)

def get_uptime_seconds() -> int:
    return int((datetime.now(timezone.utc) - START_TIME).total_seconds())
