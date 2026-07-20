import asyncio
from typing import Optional, Set
from loguru import logger
from datetime import datetime, timezone

from app.config.settings import settings
from app.acquisition.api_client import api_client
from app.acquisition.downloader import downloader

class TelemetryPoller:
    def __init__(self):
        self.seen_files: Set[str] = set()
        self.last_poll_time: Optional[datetime] = None
        self.last_poll_status: bool = False
        self.total_processed_count: int = 0
        self.running = False
        self._task = None

    async def start(self):
        if self.running:
            return
        self.running = True
        self._task = asyncio.create_task(self._loop())
        logger.info("Telemetry acquisition poller background worker started.")

    async def stop(self):
        if not self.running:
            return
        self.running = False
        if self._task:
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
        await api_client.close()
        logger.info("Telemetry acquisition poller stopped.")

    async def _loop(self):
        # Allow the API router to start up
        await asyncio.sleep(1.0)
        while self.running:
            try:
                await self.poll_now()
            except Exception as e:
                logger.error(f"Error in poll loop: {e}")
            await asyncio.sleep(settings.POLLING_INTERVAL_SECONDS)

    async def poll_now(self):
        logger.info("Polling NSCBI API for new telemetry files...")
        try:
            files = await api_client.list_files()
            
            self.last_poll_status = True
            self.last_poll_time = datetime.now(timezone.utc)
            
            new_files = [f for f in files if f not in self.seen_files]
            if not new_files:
                logger.info("No new files to process.")
                return
            
            logger.info(f"Found {len(new_files)} new files to process.")
            
            # Import dynamically to avoid circular references during initialization
            from app.services.analytics_service import analytics_service

            for filename in new_files:
                try:
                    payloads = await downloader.download(filename)
                    if payloads:
                        logger.info(f"Ingesting {len(payloads)} payloads from {filename}")
                        await analytics_service.process_raw_payloads(payloads)
                        self.total_processed_count += len(payloads)
                    self.seen_files.add(filename)
                except Exception as ex:
                    logger.error(f"Failed to process file {filename}: {ex}")
                    
        except Exception as e:
            self.last_poll_status = False
            logger.warning(f"NSCBI API unavailable or polling failed: {e}. Active caches will serve stale data.")

telemetry_poller = TelemetryPoller()
