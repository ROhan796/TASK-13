from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.config.settings import settings
from app.acquisition.polling import telemetry_poller
from loguru import logger

class PollingScheduler:
    def __init__(self):
        self.scheduler = AsyncIOScheduler()

    def start(self):
        logger.info("Initializing APScheduler for telemetry polling...")
        self.scheduler.add_job(
            telemetry_poller.poll_now,
            "interval",
            seconds=settings.POLLING_INTERVAL_SECONDS,
            id="telemetry_polling_job",
            replace_existing=True
        )
        self.scheduler.start()
        logger.info(f"APScheduler started. Telemetry polling registered at {settings.POLLING_INTERVAL_SECONDS}s interval.")

    def stop(self):
        logger.info("Stopping APScheduler...")
        self.scheduler.shutdown()
        logger.info("APScheduler stopped.")

polling_scheduler = PollingScheduler()
