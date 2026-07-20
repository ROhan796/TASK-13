#!/usr/bin/env python3
"""
AAI Smart Washroom — Synthetic Data Generator & Uploader (Final Schema)
Device  : Intern-pico-01
API Key : 5yaPCbGsWz5OQIAf2hJXveOHiflumsAAVWn3xeceC2ul1cVWj1rBY88atnHKQ7iF
Pushes 350 realistic washroom sensor records in the FINAL JSON schema.
Uploads in batches of 25 with 60s cooldown between batches.
Saves progress to upload_progress.json — resumable if interrupted.

Final JSON schema (API-accepted field names):
{
  "deviceId": "Intern-pico-01",
  "temperature": 27.5,
  "humidity": 58.0,
  "timestamp": "2026-07-18T06:00:00Z",
  "nh3": 0.21,
  "h2s": 0.82,
  "penalty_nh3": 0,
  "penalty_h2s": 0,
  "penalty_humidity": 5,
  "penalty_temperature": 10,
  "raw_whi": 85,
  "throughput": 0,
  "occupancy_inside": 0,
  "_received_at": "2026-07-18T06:00:01.000000"
}
"""

import asyncio
import json
import random
import httpx
from datetime import datetime, timezone, timedelta
from pathlib import Path
from collections import Counter

# ── Credentials ───────────────────────────────────────────────────────────────
API_KEY   = "5yaPCbGsWz5OQIAf2hJXveOHiflumsAAVWn3xeceC2ul1cVWj1rBY88atnHKQ7iF"
DEVICE_ID = "Intern-pico-01"
BASE_URL  = "https://api.nscbiairport.com/api"
UPLOAD_URL = f"{BASE_URL}/upload-json"
FILES_URL  = f"{BASE_URL}/files"

HEADERS = {
    "Content-Type": "application/json",
    "X-API-KEY": API_KEY,
}

# ── Config ────────────────────────────────────────────────────────────────────
TOTAL_RECORDS      = 350
RATE_LIMIT_PER_MIN = 50
DELAY_BETWEEN      = 60.0 / RATE_LIMIT_PER_MIN

BATCH_SIZE     = 25
BATCH_COOLDOWN = 60  # seconds between batches

PROGRESS_FILE = Path("scripts/upload_progress.json")


# ── WHI Penalty Calculation ──────────────────────────────────────────────────
def compute_penalties(avg_temp: float, avg_hum: float, avg_nh3: float, avg_h2s: float) -> dict:
    """
    Compute penalty values based on sensor readings.
    Each penalty is a deduction from raw_whi (100 base).
    """
    # Temperature penalty: > 28C ideal, penalty ramps up
    if avg_temp > 28:
        penalty_temp = min(int((avg_temp - 28) * 2), 30)
    elif avg_temp < 18:
        penalty_temp = min(int((18 - avg_temp) * 2), 30)
    else:
        penalty_temp = 0

    # Humidity penalty: > 60% ideal, penalty ramps up
    if avg_hum > 60:
        penalty_hum = min(int((avg_hum - 60) * 0.5), 30)
    else:
        penalty_hum = 0

    # NH3 (ammonia) penalty: > 5 ppm is bad
    penalty_nh3 = min(int(avg_nh3 * 2), 40) if avg_nh3 > 5 else 0

    # H2S penalty: > 1 ppm is bad
    penalty_h2s = min(int(avg_h2s * 10), 30) if avg_h2s > 1 else 0

    return {
        "penalty_temperature": penalty_temp,
        "penalty_humidity": penalty_hum,
        "penalty_nh3": penalty_nh3,
        "penalty_h2s": penalty_h2s,
    }


def compute_raw_whi(avg_temp: float, avg_hum: float, avg_nh3: float, avg_h2s: float) -> int:
    """
    Compute raw WHI from sensor readings.
    Base 100, minus penalties. Clamped to 0-100.
    """
    penalties = compute_penalties(avg_temp, avg_hum, avg_nh3, avg_h2s)
    total_penalty = sum(penalties.values())
    return max(0, min(100, 100 - total_penalty))


# ── Scenario Timeline ─────────────────────────────────────────────────────────
def get_scenario(hour: int, minute: int) -> dict:
    """
    Returns sensor values based on time of day.
    Produces realistic WHI variation across the full day.
    Uses API-accepted field names (temperature, humidity, nh3, h2s).
    """
    # 00:00–05:00 Overnight — very quiet, excellent conditions
    if 0 <= hour < 5:
        temperature = round(random.uniform(22.0, 25.0), 1)
        humidity = round(random.uniform(45.0, 55.0), 1)
        nh3 = round(random.uniform(0.01, 0.15), 2)
        h2s = round(random.uniform(0.01, 0.10), 2)
        occ = random.randint(0, 3)
        scenario = "overnight_excellent"
    # 05:00–07:00 Early morning — first flights, rising occupancy
    elif 5 <= hour < 7:
        temperature = round(random.uniform(24.0, 27.0), 1)
        humidity = round(random.uniform(50.0, 62.0), 1)
        nh3 = round(random.uniform(0.10, 0.50), 2)
        h2s = round(random.uniform(0.05, 0.25), 2)
        occ = random.randint(2, 10)
        scenario = "early_morning_good"
    # 07:00–09:30 Morning rush — heavy traffic, conditions degrading
    elif 7 <= hour < 9 or (hour == 9 and minute < 30):
        temperature = round(random.uniform(26.0, 30.0), 1)
        humidity = round(random.uniform(58.0, 75.0), 1)
        nh3 = round(random.uniform(0.40, 1.20), 2)
        h2s = round(random.uniform(0.20, 0.80), 2)
        occ = random.randint(15, 35)
        scenario = "morning_rush_moderate"
    # 09:30–11:00 Post-rush cleaning — recovering
    elif (hour == 9 and minute >= 30) or hour == 10:
        temperature = round(random.uniform(24.0, 27.0), 1)
        humidity = round(random.uniform(52.0, 65.0), 1)
        nh3 = round(random.uniform(0.15, 0.45), 2)
        h2s = round(random.uniform(0.08, 0.30), 2)
        occ = random.randint(5, 18)
        scenario = "post_rush_recovering"
    # 11:00–13:00 Midday — steady traffic, moderate
    elif 11 <= hour < 13:
        temperature = round(random.uniform(25.0, 29.0), 1)
        humidity = round(random.uniform(55.0, 70.0), 1)
        nh3 = round(random.uniform(0.30, 0.90), 2)
        h2s = round(random.uniform(0.15, 0.60), 2)
        occ = random.randint(10, 28)
        scenario = "midday_moderate"
    # 13:00–15:00 CRITICAL INCIDENT WINDOW — 3+ consecutive critical readings
    elif 13 <= hour < 15:
        temperature = round(random.uniform(29.0, 34.0), 1)
        humidity = round(random.uniform(72.0, 90.0), 1)
        nh3 = round(random.uniform(1.50, 5.00), 2)
        h2s = round(random.uniform(0.80, 2.50), 2)
        occ = random.randint(35, 50)
        scenario = "afternoon_CRITICAL"
    # 15:00–16:30 Emergency cleaning — sharp recovery
    elif 15 <= hour < 16 or (hour == 16 and minute < 30):
        temperature = round(random.uniform(24.0, 27.0), 1)
        humidity = round(random.uniform(50.0, 63.0), 1)
        nh3 = round(random.uniform(0.12, 0.40), 2)
        h2s = round(random.uniform(0.06, 0.25), 2)
        occ = random.randint(5, 15)
        scenario = "post_incident_recovery"
    # 16:30–19:00 Afternoon peak — busy but maintained
    elif (hour == 16 and minute >= 30) or (17 <= hour < 19):
        temperature = round(random.uniform(25.0, 29.0), 1)
        humidity = round(random.uniform(55.0, 72.0), 1)
        nh3 = round(random.uniform(0.25, 0.80), 2)
        h2s = round(random.uniform(0.12, 0.50), 2)
        occ = random.randint(12, 30)
        scenario = "afternoon_peak_moderate"
    # 19:00–21:00 Evening — winding down
    elif 19 <= hour < 21:
        temperature = round(random.uniform(23.0, 27.0), 1)
        humidity = round(random.uniform(48.0, 62.0), 1)
        nh3 = round(random.uniform(0.10, 0.40), 2)
        h2s = round(random.uniform(0.05, 0.22), 2)
        occ = random.randint(5, 18)
        scenario = "evening_good"
    # 21:00–00:00 Late night cleaning — excellent
    else:
        temperature = round(random.uniform(22.0, 25.0), 1)
        humidity = round(random.uniform(42.0, 55.0), 1)
        nh3 = round(random.uniform(0.01, 0.12), 2)
        h2s = round(random.uniform(0.01, 0.08), 2)
        occ = random.randint(0, 5)
        scenario = "late_night_excellent"

    # Compute penalties and raw_whi
    penalties = compute_penalties(temperature, humidity, nh3, h2s)
    raw_whi = compute_raw_whi(temperature, humidity, nh3, h2s)

    return {
        "temperature": temperature,
        "humidity": humidity,
        "nh3": nh3,
        "h2s": h2s,
        "occupancy_inside": occ,
        "raw_whi": raw_whi,
        **penalties,
        "throughput": 0,
        "scenario": scenario,
    }


def build_all_records() -> list[dict]:
    """
    Build 350 records spread across a full 24-hour window (yesterday).
    One reading every ~4 minutes. All timestamps in correct API format.
    Uses the FINAL JSON schema with API-accepted field names.
    """
    records = []
    base_time = datetime.now(timezone.utc).replace(
        hour=0, minute=0, second=0, microsecond=0
    ) - timedelta(days=1)
    interval_minutes = (24 * 60) / TOTAL_RECORDS

    for i in range(TOTAL_RECORDS):
        ts = base_time + timedelta(minutes=i * interval_minutes)
        hour = ts.hour
        minute = ts.minute
        scenario = get_scenario(hour, minute)

        received_at = datetime.now(timezone.utc) - timedelta(seconds=random.randint(0, 30))

        record = {
            "deviceId": DEVICE_ID,
            "temperature": scenario["temperature"],
            "humidity": scenario["humidity"],
            "timestamp": ts.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "nh3": scenario["nh3"],
            "h2s": scenario["h2s"],
            "penalty_nh3": scenario["penalty_nh3"],
            "penalty_h2s": scenario["penalty_h2s"],
            "penalty_humidity": scenario["penalty_humidity"],
            "penalty_temperature": scenario["penalty_temperature"],
            "raw_whi": scenario["raw_whi"],
            "throughput": scenario["throughput"],
            "occupancy_inside": scenario["occupancy_inside"],
            "_received_at": received_at.strftime("%Y-%m-%dT%H:%M:%S.%f"),
        }
        records.append(record)

    return records


def load_progress() -> set:
    if PROGRESS_FILE.exists():
        try:
            with open(PROGRESS_FILE) as f:
                data = json.load(f)
                done = set(data.get("uploaded_timestamps", []))
                daily_hit = data.get("daily_limit_hit", False)
                if daily_hit:
                    print(f"[Resume] Daily limit was hit previously — {len(done)} uploaded, resuming rest.")
                else:
                    print(f"[Resume] Found progress file — {len(done)} already uploaded, skipping them.")
                return done
        except Exception:
            pass
    return set()


def save_progress(uploaded_timestamps: list, results: dict, daily_limit_hit: bool = False):
    PROGRESS_FILE.parent.mkdir(exist_ok=True)
    with open(PROGRESS_FILE, "w") as f:
        json.dump({
            "uploaded_timestamps": uploaded_timestamps,
            "success_count": results["success"],
            "failed_count": results["failed"],
            "daily_limit_hit": daily_limit_hit,
            "last_updated": datetime.now(timezone.utc).isoformat(),
        }, f, indent=2)


async def upload_all(records: list[dict]) -> dict:
    already_done = load_progress()
    results = {"success": len(already_done), "failed": 0, "filenames": [], "errors": []}
    uploaded_timestamps = list(already_done)
    total = len(records)
    pending = [r for r in records if r["timestamp"] not in already_done]

    print(f"\n[Upload] {len(already_done)} already done, {len(pending)} remaining to upload")
    if not pending:
        print("[Upload] All records already uploaded! Nothing to do.")
        return results

    batches = []
    for batch_start in range(0, len(pending), BATCH_SIZE):
        batches.append(pending[batch_start:batch_start + BATCH_SIZE])

    num_batches = len(batches)
    print(f"[Upload] {num_batches} batches of up to {BATCH_SIZE} records each")
    print(f"[Upload] ~{num_batches * BATCH_COOLDOWN / 60:.1f} min estimated with cooldowns\n")

    async with httpx.AsyncClient(timeout=30.0) as client:
        for batch_idx, batch in enumerate(batches):
            batch_start_num = results["success"] + results["failed"] + 1
            batch_end_num = batch_start_num + len(batch) - 1
            print(f"  -- Batch {batch_idx + 1}/{num_batches} (records {batch_start_num}-{batch_end_num}) --")

            for idx, record in enumerate(batch):
                global_num = results["success"] + results["failed"] + 1
                attempt_label = f"[{global_num}/{total}]"
                try:
                    resp = await client.post(UPLOAD_URL, json=record, headers=HEADERS)

                    if resp.status_code == 201:
                        data = resp.json()
                        results["success"] += 1
                        results["filenames"].append(data.get("filename", ""))
                        uploaded_timestamps.append(record["timestamp"])

                        if results["success"] % 25 == 0 or results["success"] == 1 or idx == len(batch) - 1:
                            print(f"    {attempt_label} OK {data.get('filename')}  scenario={record.get('scenario', 'N/A')}  raw_whi={record.get('raw_whi')}")

                    elif resp.status_code == 429:
                        print(f"    {attempt_label} Rate limited (429) — waiting 65s...")
                        await asyncio.sleep(65)
                        resp2 = await client.post(UPLOAD_URL, json=record, headers=HEADERS)
                        if resp2.status_code == 201:
                            data2 = resp2.json()
                            results["success"] += 1
                            results["filenames"].append(data2.get("filename", ""))
                            uploaded_timestamps.append(record["timestamp"])
                            print(f"    {attempt_label} OK Retry succeeded: {data2.get('filename')}")
                        else:
                            results["failed"] += 1
                            results["errors"].append(f"{attempt_label} retry {resp2.status_code}: {resp2.text[:80]}")
                            print(f"    {attempt_label} FAIL retry: {resp2.status_code}")

                    elif resp.status_code == 403:
                        msg = resp.json().get("message", "") if resp.text else ""
                        if "Daily" in msg or "daily" in msg:
                            print(f"\n    {attempt_label} DAILY LIMIT HIT — {msg}")
                            print(f"    Progress saved. Re-run to resume when limit resets.")
                            save_progress(uploaded_timestamps, results, daily_limit_hit=True)
                            return results
                        else:
                            print(f"\n    {attempt_label} 403 FORBIDDEN — {msg}")
                            print(f"    STOPPING — check API key or permissions.")
                            save_progress(uploaded_timestamps, results, daily_limit_hit=True)
                            return results

                    elif resp.status_code == 422:
                        print(f"    {attempt_label} 422 Validation error — check field formats!")
                        print(f"    Response: {resp.text[:200]}")
                        results["failed"] += 1
                        results["errors"].append(f"{attempt_label} 422: {resp.text[:80]}")

                    else:
                        results["failed"] += 1
                        results["errors"].append(f"{attempt_label} {resp.status_code}: {resp.text[:80]}")
                        print(f"    {attempt_label} HTTP {resp.status_code}")

                except Exception as e:
                    results["failed"] += 1
                    results["errors"].append(f"{attempt_label} Exception: {str(e)}")
                    print(f"    {attempt_label} ERROR: {e}")

                if idx < len(batch) - 1:
                    await asyncio.sleep(DELAY_BETWEEN)

            save_progress(uploaded_timestamps, results)
            print(f"  Batch {batch_idx + 1} done. {results['success']} OK, {results['failed']} failed so far.\n")

            if batch_idx < num_batches - 1:
                print(f"  Cooldown: {BATCH_COOLDOWN}s before next batch...\n")
                await asyncio.sleep(BATCH_COOLDOWN)

    save_progress(uploaded_timestamps, results)
    return results


async def verify_uploads() -> list:
    print("\n[Verify] Calling GET /api/files to confirm uploads are readable...")
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.get(FILES_URL, headers={"X-API-KEY": API_KEY}, params={"limit": 500})
        if resp.status_code != 200:
            msg = resp.json().get("message", resp.text[:200]) if resp.text else ""
            print(f"[Verify] GET /api/files returned {resp.status_code}: {msg}")
            return []

        data = resp.json()
        files = data if isinstance(data, list) else data.get("files", data.get("data", []))
        print(f"[Verify] Total files retrievable: {len(files)}")

        for f in files[:5]:
            fname = f.get("filename", f.get("name", str(f)))
            print(f"  -> {fname}")
        if len(files) > 5:
            print(f"  ... and {len(files) - 5} more")

        return files


async def download_sample_file(filename: str):
    print(f"\n[Sample Download] GET /api/files/{filename}")
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.get(f"{FILES_URL}/{filename}", headers={"X-API-KEY": API_KEY})
        if resp.status_code == 200:
            data = resp.json()
            print(f"[Sample] File content:")
            print(json.dumps(data, indent=2)[:800])
        else:
            print(f"[Sample] Download failed: {resp.status_code} {resp.text[:100]}")


async def main():
    print("=" * 65)
    print("AAI Smart Washroom — Data Generator & Uploader (Final Schema)")
    print("=" * 65)
    print(f"Device  : {DEVICE_ID}")
    print(f"Target  : {TOTAL_RECORDS} records")
    print(f"Rate    : {RATE_LIMIT_PER_MIN} req/min ({DELAY_BETWEEN:.2f}s between calls)")
    print(f"Batches : {BATCH_SIZE} records per batch, {BATCH_COOLDOWN}s cooldown")

    progress_file_exists = PROGRESS_FILE.exists()
    already_count = 0
    if progress_file_exists:
        try:
            with open(PROGRESS_FILE) as f:
                data = json.load(f)
                already_count = len(data.get("uploaded_timestamps", []))
        except Exception:
            pass

    remaining = TOTAL_RECORDS - already_count
    num_batches = (remaining + BATCH_SIZE - 1) // BATCH_SIZE if remaining > 0 else 0
    est_min = (remaining * DELAY_BETWEEN + max(0, num_batches - 1) * BATCH_COOLDOWN) / 60
    print(f"Already  : {already_count} uploaded")
    print(f"Est time : ~{est_min:.1f} min remaining ({num_batches} batches)")
    print("=" * 65)

    print("\n[Step 1] Generating records...")
    records = build_all_records()
    print(f"  Built {len(records)} records spanning yesterday 00:00-23:59 UTC")

    scenarios = Counter(r.get("scenario", "unknown") for r in records)
    for scenario, count in scenarios.most_common():
        print(f"  {scenario:35s}: {count} readings")

    # Show sample record
    print(f"\n  Sample record (FINAL SCHEMA):")
    sample = records[len(records) // 2].copy()  # Pick a middle record
    sample.pop("scenario", None)
    print(f"  {json.dumps(sample, indent=4)}")

    print(f"\n[Step 2] Uploading to {UPLOAD_URL} ...")
    results = await upload_all(records)

    print(f"\n[Upload Complete]")
    print(f"  Successful : {results['success']} / {TOTAL_RECORDS}")
    print(f"  Failed     : {results['failed']}")
    if results["errors"]:
        print(f"  First errors:")
        for e in results["errors"][:3]:
            print(f"    {e}")

    if results["success"] == 0:
        print("\n[ABORT] No records uploaded. Fix errors above before continuing.")
        return

    await asyncio.sleep(2)
    files = await verify_uploads()

    if results["filenames"]:
        sample = results["filenames"][0]
        await download_sample_file(sample)
    elif files:
        fname = files[0].get("filename", files[0].get("name", ""))
        if fname:
            await download_sample_file(fname)

    print("\n" + "=" * 65)
    print("PIPELINE SUMMARY")
    print("=" * 65)
    print(f"  Uploaded  : {results['success']} records to NSCBI API")
    print(f"  Readable  : {len(files)} files via GET /api/files")
    print(f"  Device    : {DEVICE_ID}")
    print(f"  Schema    : Final (deviceId, temperature, humidity, nh3, h2s, penalties, raw_whi)")
    print()
    print("Scenario breakdown for DA Engine analytics:")
    print("  overnight_excellent     -> raw_whi ~90-100  NORMAL")
    print("  early_morning_good      -> raw_whi ~75-95   NORMAL")
    print("  morning_rush_moderate   -> raw_whi ~40-65   WARNING")
    print("  post_rush_recovering    -> raw_whi ~70-90   NORMAL")
    print("  midday_moderate         -> raw_whi ~50-75   WARNING/NORMAL")
    print("  afternoon_CRITICAL      -> raw_whi ~5-30    CRITICAL <- debouncer fires here")
    print("  post_incident_recovery  -> raw_whi ~70-90   NORMAL")
    print("  afternoon_peak_moderate -> raw_whi ~45-70   WARNING/NORMAL")
    print("  evening_good            -> raw_whi ~65-85   NORMAL")
    print("  late_night_excellent    -> raw_whi ~90-100  NORMAL")
    print()
    print("Next steps:")
    print("  1. DA Engine will auto-poll and process all files within 30 seconds")
    print("  2. curl http://localhost:8001/api/summary")
    print("  3. Open http://localhost:3000 — sign in as AP-001")
    print("=" * 65)


if __name__ == "__main__":
    asyncio.run(main())
