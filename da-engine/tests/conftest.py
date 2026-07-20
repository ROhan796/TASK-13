import pytest
from app.config.settings import settings

@pytest.fixture(scope="session", autouse=True)
def setup_test_env():
    # Force mock API settings during tests
    settings.NSCBI_API_BASE_URL = "MOCK"
    settings.ENVIRONMENT = "development"
