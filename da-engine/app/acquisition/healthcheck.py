import httpx
from app.config.settings import settings
from app.acquisition.api_client import api_client

class NSCBIHealthCheck:
    async def check_api_status(self) -> bool:
        """
        Check if the NSCBI API is available.
        """
        if settings.NSCBI_API_BASE_URL.upper() == "MOCK":
            return True
        try:
            device_ids = settings.device_id_list
            if device_ids:
                # Try with first configured device ID
                await api_client.list_files(device_id=device_ids[0], limit=1)
            else:
                # Try without device_id (may fail with 422)
                await api_client.list_files(limit=1)
            return True
        except Exception:
            return False

health_check_client = NSCBIHealthCheck()
