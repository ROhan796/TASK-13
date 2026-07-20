import pytest
from app.acquisition.api_client import api_client

@pytest.mark.asyncio
async def test_mock_api_client_files():
    # When api_url is set to MOCK (as config defaults to)
    files = await api_client.list_files()
    assert len(files) > 0
    assert "mock_batch_1.json" in files

@pytest.mark.asyncio
async def test_mock_api_client_download():
    content = await api_client.download_file("mock_batch_1.json")
    assert len(content) > 0
    assert "deviceId" in content[0]
