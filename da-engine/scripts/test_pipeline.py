import sys
sys.path.insert(0, r"C:\INTERNSHIP_TASK\TASK16\Fullstack_Unification\da-engine")

from app.ingestion.normalizer import telemetry_normalizer
from app.processing.preprocessing import preprocessor
from app.analytics.whi.calculator import whi_calculator

raw = {
    "deviceId": "Intern-pico-01",
    "temperature": 23,
    "humidity": 53.6,
    "timestamp": "2026-07-17T23:55:53Z",
    "nh3": 0.09,
    "h2s": 0.02,
    "penalty_nh3": 0,
    "penalty_h2s": 0,
    "penalty_humidity": 0,
    "penalty_temperature": 0,
    "raw_whi": 100,
    "throughput": 0,
    "occupancy_inside": 5
}

print("Step 1: Preprocess...")
cleaned = preprocessor.preprocess(raw)
print(f"  device_id={cleaned.get('device_id')}, ammonia_ppm={cleaned.get('ammonia_ppm')}")

print("Step 2: Normalize...")
telemetry = telemetry_normalizer.normalize(cleaned)
if telemetry:
    print(f"  OK: device_id={telemetry.device_id}, ammonia={telemetry.ammonia_ppm}")
else:
    print("  FAIL: normalize returned None")

print("Step 3: WHI...")
whi = whi_calculator.compute_whi(telemetry)
print(f"  WHI = {whi}")
