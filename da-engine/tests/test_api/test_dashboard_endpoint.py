from fastapi.testclient import TestClient
from app.main import app
from app.storage.cache import cache_store
from app.models.airport import AirportSummary

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_dashboard_summary_missing():
    # Clear summary to check 503 response
    cache_store.airport_summary = None
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 503

def test_dashboard_summary_present():
    cache_store.set_airport_summary(
        AirportSummary(
            avg_whi=88.5,
            total_washrooms=1,
            online_devices=1,
            active_incidents=0,
            terminals=[]
        )
    )
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 200
    assert response.json()["avg_whi"] == 88.5
