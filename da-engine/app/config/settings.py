from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional, List

class Settings(BaseSettings):
    NSCBI_API_BASE_URL: str = "https://api.nscbiairport.com/api"
    NSCBI_API_KEY: str = "your_api_key_here"
    NSCBI_DEVICE_IDS: str = ""  # Comma-separated device IDs, e.g. "T1-L1-PPM-001,T2-L2-PPF-002"
    POLLING_INTERVAL_SECONDS: int = 30
    DA_ENGINE_HOST: str = "0.0.0.0"
    DA_ENGINE_PORT: int = 8001
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    DEFAULT_WASHROOM_CAPACITY: int = 10
    CACHE_TTL_SECONDS: int = 60
    WHI_HISTORY_BUFFER_SIZE: int = 100

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    @property
    def device_id_list(self) -> List[str]:
        """Parse comma-separated device IDs into a list."""
        if not self.NSCBI_DEVICE_IDS:
            return []
        return [d.strip() for d in self.NSCBI_DEVICE_IDS.split(",") if d.strip()]

settings = Settings()
