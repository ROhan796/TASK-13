from typing import Tuple

def parse_device_id(device_id: str) -> Tuple[str, str, str]:
    """
    Parses a device ID to extract (terminal_id, floor_level, unit_type).
    E.g. T1-L1-PPM-001 -> ("T1", "L1", "PPM")
    """
    parts = device_id.split("-")
    terminal_id = parts[0] if len(parts) > 0 else "UNKNOWN"
    floor_level = parts[1] if len(parts) > 1 else "L1"
    unit_type = parts[2] if len(parts) > 2 else "PPM"
    return terminal_id, floor_level, unit_type
