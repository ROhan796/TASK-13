from app.analytics.alerts.rules import alert_rules

def test_alert_rules():
    assert alert_rules.is_ammonia_breach(55.0) is True
    assert alert_rules.is_ammonia_breach(45.0) is False
    assert alert_rules.is_supply_breach(15.0) is True
    assert alert_rules.is_supply_breach(25.0) is False
