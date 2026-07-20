from typing import List, Dict, Any
from app.acquisition.api_client import api_client

class FileDownloader:
    async def download(self, filename: str) -> List[Dict[str, Any]]:
        """
        Retrieves the JSON telemetry data inside a specific filename.
        """
        return await api_client.download_file(filename)

downloader = FileDownloader()
