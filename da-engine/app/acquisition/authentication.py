from typing import Dict
from app.config.settings import settings

class APIKeyAuthenticator:
    def __init__(self):
        self._api_key = settings.NSCBI_API_KEY

    def inject_auth_header(self, headers: Dict[str, str]) -> Dict[str, str]:
        """
        Injects the X-API-KEY header.
        """
        headers["X-API-KEY"] = self._api_key
        return headers

    def rotate_key(self, new_key: str):
        """
        Allows runtime key rotation.
        """
        self._api_key = new_key

authenticator = APIKeyAuthenticator()
