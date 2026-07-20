#!/usr/bin/env python3
"""
AAI Smart Washroom — Continuous Data Feeder
Sends one reading per 30 seconds to MC001 to keep the portal live.
Run in a separate terminal while the stack is running.
"""

import asyncio
import httpx
import random
import os
import sys
from datetime import datetime, timezone

# Add parent directory to path so we can import from generate_and_upload
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generate_and_upload import (
    DEVICE_ID, HEADERS, UPLOAD_URL,
    generate_reading,
)

async def continuous_feed(interval_seconds: int = 30):
    print(f"[Feeder] Starting continuous feed for {DEVICE_ID}")
    print(f"[Feeder] Interval: {interval_seconds}s between readings")
    print(f"[Feeder] Press Ctrl+C to stop\n")

    seq = 400  # Start after initial batch (350 records)
    batch_num = 0

    async with httpx.AsyncClient(timeout=30.0) as client:
        while True:
            batch_num += 1
            now = datetime.now(timezone.utc)
            print(f"[Batch {batch_num}] {now.strftime('%H:%M:%S')} UTC")

            reading = generate_reading(now, seq)
            import dataclasses
            payload = dataclasses.asdict(reading)

            try:
                resp = await client.post(UPLOAD_URL, json=payload, headers=HEADERS)
                if resp.status_code == 201:
                    data = resp.json()
                    print(f"  {DEVICE_ID} -> {data.get('filename', '?')} OK")
                else:
                    print(f"  {DEVICE_ID} -> HTTP {resp.status_code}")
            except Exception as e:
                print(f"  {DEVICE_ID} -> ERROR: {e}")

            seq += 1
            await asyncio.sleep(interval_seconds)


if __name__ == "__main__":
    try:
        asyncio.run(continuous_feed(30))
    except KeyboardInterrupt:
        print("\n[Feeder] Stopped.")
