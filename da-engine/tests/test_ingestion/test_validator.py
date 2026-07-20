from app.ingestion.validator import payload_validator

def test_valid_payload():
    raw = {
        "deviceId": "T1-L1-PPM-001",
        "temperature": 25.5,
        "humidity": 60.0,
        "battery": 3.7,
        "rssi": -60.0,
        "timestamp": "2026-07-08T10:35:00Z"
    }
    validated = payload_validator.validate_raw(raw)
    assert validated is not None
    assert validated.deviceId == "T1-L1-PPM-001"

def test_invalid_payload():
    # Missing required field temperature
    raw = {
        "deviceId": "T1-L1-PPM-001",
        "humidity": 60.0,
        "battery": 3.7,
        "rssi": -60.0,
        "timestamp": "2026-07-08T10:35:00Z"
    }
    validated = payload_validator.validate_raw(raw)
    assert validated is None
